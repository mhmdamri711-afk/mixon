export interface RatingState {
  totalRatings: number;
  totalPoints: number;
  averageRating: number;
  userRating: number | null;
}

export interface StoredRatingEntry {
  userId: string;
  rating: number;
  updatedAt: number;
}
