import { RatingState } from '../types/rating';

const CLIENT_ID_KEY = 'mixon_client_user_id';
const RATING_CACHE_KEY = 'mixon_rating_cache';
const USER_RATING_KEY = 'mixon_user_rating';

export function getClientUserId(): string {
  try {
    let id = localStorage.getItem(CLIENT_ID_KEY);

    if (!id) {
      id = `client_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem(CLIENT_ID_KEY, id);
    }

    return id;
  } catch {
    return 'client_ephemeral_session';
  }
}

const DEFAULT_STATE: RatingState = {
  totalRatings: 0,
  totalPoints: 0,
  averageRating: 0,
  userRating: null
};

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
        userRating:
          userRating !== null && Number.isInteger(userRating)
            ? userRating
            : parsed.userRating ?? null
      };
    }

    if (userRating !== null && Number.isInteger(userRating)) {
      return {
        totalRatings: 0,
        totalPoints: 0,
        averageRating: 0,
        userRating
      };
    }
  } catch {}

  return DEFAULT_STATE;
}

export function saveCachedRatingState(state: RatingState): void {
  try {
    localStorage.setItem(RATING_CACHE_KEY, JSON.stringify(state));

    if (state.userRating !== null) {
      localStorage.setItem(USER_RATING_KEY, state.userRating.toString());
    }
  } catch {}
}

export async function fetchLiveRatingStats(): Promise<RatingState> {
  const userId = getClientUserId();

  try {
    const cacheBuster = Date.now();

    const res = await fetch(
      `/api/ratings?userId=${encodeURIComponent(userId)}&_=${cacheBuster}`,
      {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      }
    );

    if (res.ok) {
      const data: any = await res.json();

      if (
        data &&
        typeof data.totalRatings === 'number' &&
        typeof data.totalPoints === 'number' &&
        typeof data.averageRating === 'number'
      ) {
        const validatedData: RatingState = {
          totalRatings: data.totalRatings,
          totalPoints: data.totalPoints,
          averageRating: data.averageRating,
          userRating:
            typeof data.userRating === 'number'
              ? data.userRating
              : null
        };

        saveCachedRatingState(validatedData);
        return validatedData;
      }

      console.warn(
        'MIXON Rating: API response is not a valid RatingState:',
        data
      );
    }
  } catch (err) {
    console.warn(
      'MIXON Rating: Live sync unavailable, using local cached store:',
      err
    );
  }

  return loadCachedRatingState();
}

export async function submitLiveRating(
  rating: number
): Promise<{
  success: boolean;
  state: RatingState;
  error?: string;
}> {
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

  let optimisticTotalRatings = previousState.totalRatings;
  let optimisticTotalPoints = previousState.totalPoints;

  if (oldUserRating !== null) {
    optimisticTotalPoints =
      optimisticTotalPoints - oldUserRating + rating;
  } else {
    optimisticTotalRatings += 1;
    optimisticTotalPoints += rating;
  }

  const optimisticAverage =
    optimisticTotalRatings > 0
      ? Math.round(
          (optimisticTotalPoints / optimisticTotalRatings) * 10
        ) / 10
      : 0;

  const optimisticState: RatingState = {
    totalRatings: optimisticTotalRatings,
    totalPoints: optimisticTotalPoints,
    averageRating: optimisticAverage,
    userRating: rating
  };

  saveCachedRatingState(optimisticState);

  try {
    const res = await fetch('/api/ratings', {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        userId,
        rating
      })
    });

    if (res.ok) {
      const serverState: any = await res.json();

      if (
        serverState &&
        typeof serverState.totalRatings === 'number' &&
        typeof serverState.totalPoints === 'number' &&
        typeof serverState.averageRating === 'number'
      ) {
        const validatedState: RatingState = {
          totalRatings: serverState.totalRatings,
          totalPoints: serverState.totalPoints,
          averageRating: serverState.averageRating,
          userRating:
            typeof serverState.userRating === 'number'
              ? serverState.userRating
              : rating
        };

        saveCachedRatingState(validatedState);

        return {
          success: true,
          state: validatedState
        };
      }
    }

    return {
      success: true,
      state: optimisticState
    };
  } catch {
    return {
      success: true,
      state: optimisticState
    };
  }
}
