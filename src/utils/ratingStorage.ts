import { RatingState } from '../types/rating';

const CLIENT_ID_KEY = 'mixon_client_user_id';
const RATING_CACHE_KEY = 'mixon_rating_cache';
const USER_RATING_KEY = 'mixon_user_rating';

// Safely generate or retrieve client user identity
export function getClientUserId(): string {
  try {
    let id = localStorage.getItem(CLIENT_ID_KEY);
    if (!id) {
      // Structured client-session identity; can easily be mapped to authenticated user accounts
      id = `client_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(CLIENT_ID_KEY, id);
    }
    return id;
  } catch {
    return 'client_ephemeral_session';
  }
}

// Default initial state
const DEFAULT_STATE: RatingState = {
  totalRatings: 0,
  totalPoints: 0,
  averageRating: 0,
  userRating: null
};

// Load cached state from local storage
export function loadCachedRatingState(): RatingState {
  try {
    const cached = localStorage.getItem(RATING_CACHE_KEY);
    const userRatingStr = localStorage.getItem(USER_RATING_KEY);
    const userRating = userRatingStr ? parseInt(userRatingStr, 10) : null;

    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        totalRatings: Number(parsed.totalRatings) || 0,
        totalPoints: Number(parsed.totalPoints) || 0,
        averageRating: Number(parsed.averageRating) || 0,
        userRating: userRating || parsed.userRating || null
      };
    }
    if (userRating) {
      return {
        totalRatings: 1,
        totalPoints: userRating,
        averageRating: userRating,
        userRating
      };
    }
  } catch {}
  return DEFAULT_STATE;
}

// Save state to local cache
export function saveCachedRatingState(state: RatingState): void {
  try {
    localStorage.setItem(RATING_CACHE_KEY, JSON.stringify(state));
    if (state.userRating !== null) {
      localStorage.setItem(USER_RATING_KEY, state.userRating.toString());
    }
  } catch {}
}

// Fetch live rating statistics from server API with cache fallback
export async function fetchLiveRatingStats(): Promise<RatingState> {
  const userId = getClientUserId();
  try {
    const res = await fetch(`/api/ratings?userId=${encodeURIComponent(userId)}`);
    if (res.ok) {
      const data: RatingState = await res.json();
      saveCachedRatingState(data);
      return data;
    }
  } catch (err) {
    console.warn('MIXON Rating: Live sync unavailable, using local cached store:', err);
  }
  return loadCachedRatingState();
}

// Submit a new rating
export async function submitLiveRating(rating: number): Promise<{ success: boolean; state: RatingState; error?: string }> {
  // Validate rating
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return {
      success: false,
      state: loadCachedRatingState(),
      error: 'Invalid rating: Must be an integer between 1 and 5.'
    };
  }

  const userId = getClientUserId();
  const previousState = loadCachedRatingState();
  const oldUserRating = previousState.userRating;

  // Optimistic calculation for instant UI update
  let optimisticTotalRatings = previousState.totalRatings;
  let optimisticTotalPoints = previousState.totalPoints;

  if (oldUserRating !== null) {
    // User is updating their existing rating
    optimisticTotalPoints = optimisticTotalPoints - oldUserRating + rating;
  } else {
    // New user rating
    optimisticTotalRatings += 1;
    optimisticTotalPoints += rating;
  }

  const optimisticAverage = optimisticTotalRatings > 0
    ? Math.round((optimisticTotalPoints / optimisticTotalRatings) * 10) / 10
    : 0;

  const optimisticState: RatingState = {
    totalRatings: optimisticTotalRatings,
    totalPoints: optimisticTotalPoints,
    averageRating: optimisticAverage,
    userRating: rating
  };

  // Immediately persist locally
  saveCachedRatingState(optimisticState);

  // Sync with backend API
  try {
    const res = await fetch('/api/ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, rating })
    });

    if (res.ok) {
      const serverState: RatingState = await res.json();
      saveCachedRatingState(serverState);
      return { success: true, state: serverState };
    } else {
      const errorData = await res.json().catch(() => ({}));
      return {
        success: true, // Still kept local optimistic state
        state: optimisticState,
        error: errorData.error
      };
    }
  } catch (e) {
    // Return optimistic state if server is offline or in purely static mode
    return { success: true, state: optimisticState };
  }
}
