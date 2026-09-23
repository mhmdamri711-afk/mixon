-- Migration to create the ratings table for MIXON
CREATE TABLE IF NOT EXISTS ratings (
  userId TEXT PRIMARY KEY,
  rating INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL
);
