import fs from 'fs';
import path from 'path';
import { RatingState, StoredRatingEntry } from '../types/rating';

const DATA_FILE = path.join(process.cwd(), 'ratings-data.json');

export function validateRating(rating: unknown): { valid: boolean; error?: string } {
  if (typeof rating !== 'number' || Number.isNaN(rating) || !Number.isFinite(rating)) {
    return { valid: false, error: 'Rating must be a valid number.' };
  }

  if (!Number.isInteger(rating)) {
    return { valid: false, error: 'Rating must be an integer between 1 and 5 (decimals are not permitted).' };
  }

  if (rating < 1 || rating > 5) {
    return { valid: false, error: 'Rating must be between 1 and 5.' };
  }

  return { valid: true };
}

export class RatingEngine {
  private ratings: Map<string, StoredRatingEntry> = new Map();
  private filePath: string;

  constructor(customFilePath?: string) {
    this.filePath = customFilePath || DATA_FILE;
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed: StoredRatingEntry[] = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.ratings.clear();
          for (const item of parsed) {
            if (item && item.userId && typeof item.rating === 'number') {
              this.ratings.set(item.userId, item);
            }
          }
        }
      }
    } catch (e) {
      console.warn('RatingEngine: Failed to load ratings from disk, starting in-memory store:', e);
    }
  }

  private saveToDisk(): void {
    try {
      const list = Array.from(this.ratings.values());
      fs.writeFileSync(this.filePath, JSON.stringify(list, null, 2), 'utf-8');
    } catch (e) {
      console.warn('RatingEngine: Failed to persist ratings to disk:', e);
    }
  }

  public getStats(userId?: string): RatingState {
    const list = Array.from(this.ratings.values());
    const totalRatings = list.length;
    const totalPoints = list.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRatings > 0 ? Math.round((totalPoints / totalRatings) * 10) / 10 : 0;
    const userRating = userId && this.ratings.has(userId) ? this.ratings.get(userId)!.rating : null;

    return {
      totalRatings,
      totalPoints,
      averageRating,
      userRating
    };
  }

  public submitRating(userId: string, ratingValue: unknown): { success: boolean; state?: RatingState; error?: string } {
    if (!userId || typeof userId !== 'string' || !userId.trim()) {
      return { success: false, error: 'Invalid or missing user identifier.' };
    }

    const validation = validateRating(ratingValue);
    if (!validation.valid) {
      return { success: false, error: validation.error };
    }

    const cleanRating = ratingValue as number;
    const cleanUserId = userId.trim();

    // Store or update rating (one rating per user)
    this.ratings.set(cleanUserId, {
      userId: cleanUserId,
      rating: cleanRating,
      updatedAt: Date.now()
    });

    this.saveToDisk();

    return {
      success: true,
      state: this.getStats(cleanUserId)
    };
  }

  public clearAll(): void {
    this.ratings.clear();
    try {
      if (fs.existsSync(this.filePath)) {
        fs.unlinkSync(this.filePath);
      }
    } catch {}
  }
}

export const globalRatingEngine = new RatingEngine();
