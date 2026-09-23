import fs from 'fs';
import path from 'path';
import { RatingEngine, validateRating } from '../src/server/ratingService';

let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, failureDetails?: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ✗ FAIL: ${testName}`);
    if (failureDetails) console.error(`    Detail: ${failureDetails}`);
    failedTests++;
  }
}

console.log('====================================================');
console.log('  MIXON RATING SYSTEM VERIFICATION SUITE');
console.log('====================================================\n');

const TEST_FILE = path.join(process.cwd(), 'ratings-test-temp.json');

// Clean up any existing temp file
if (fs.existsSync(TEST_FILE)) {
  fs.unlinkSync(TEST_FILE);
}

const engine = new RatingEngine(TEST_FILE);
engine.clearAll();

// -----------------------------------------------------------
// 1. Default state with zero ratings
// -----------------------------------------------------------
const defaultStats = engine.getStats('new_user_1');
assert(
  defaultStats.totalRatings === 0 &&
  defaultStats.totalPoints === 0 &&
  defaultStats.averageRating === 0 &&
  defaultStats.userRating === null,
  '1. Default state with zero ratings (0 ratings, 0 pts, 0.0 avg, null user rating)'
);

// -----------------------------------------------------------
// 2. Selecting 1 star
// -----------------------------------------------------------
engine.clearAll();
const res1Star = engine.submitRating('user_one', 1);
assert(
  res1Star.success === true &&
  res1Star.state?.totalRatings === 1 &&
  res1Star.state?.totalPoints === 1 &&
  res1Star.state?.averageRating === 1.0 &&
  res1Star.state?.userRating === 1,
  '2. Selecting 1 star produces 1 rating, 1 total point, 1.0 average, userRating = 1'
);

// -----------------------------------------------------------
// 3. Selecting 3 stars
// -----------------------------------------------------------
engine.clearAll();
const res3Star = engine.submitRating('user_three', 3);
assert(
  res3Star.success === true &&
  res3Star.state?.totalRatings === 1 &&
  res3Star.state?.totalPoints === 3 &&
  res3Star.state?.averageRating === 3.0 &&
  res3Star.state?.userRating === 3,
  '3. Selecting 3 stars produces 1 rating, 3 total points, 3.0 average, userRating = 3'
);

// -----------------------------------------------------------
// 4. Selecting 5 stars
// -----------------------------------------------------------
engine.clearAll();
const res5Star = engine.submitRating('user_five', 5);
assert(
  res5Star.success === true &&
  res5Star.state?.totalRatings === 1 &&
  res5Star.state?.totalPoints === 5 &&
  res5Star.state?.averageRating === 5.0 &&
  res5Star.state?.userRating === 5,
  '4. Selecting 5 stars produces 1 rating, 5 total points, 5.0 average, userRating = 5'
);

// -----------------------------------------------------------
// 5. totalRatings calculation
// -----------------------------------------------------------
engine.clearAll();
engine.submitRating('user_a', 5);
engine.submitRating('user_b', 4);
engine.submitRating('user_c', 3);
const stats3Users = engine.getStats();
assert(
  stats3Users.totalRatings === 3,
  `5. totalRatings calculation: 3 distinct users submit ratings -> totalRatings = 3 (Actual: ${stats3Users.totalRatings})`
);

// -----------------------------------------------------------
// 6. totalPoints calculation
// -----------------------------------------------------------
assert(
  stats3Users.totalPoints === 12,
  `6. totalPoints calculation: 5 + 4 + 3 = 12 total points (Actual: ${stats3Users.totalPoints})`
);

// -----------------------------------------------------------
// 7. average calculation
// -----------------------------------------------------------
assert(
  stats3Users.averageRating === 4.0,
  `7a. average calculation: 12 / 3 = 4.0 (Actual: ${stats3Users.averageRating})`
);

// Test rounded to one decimal place
engine.submitRating('user_d', 5); // totalPoints = 17, totalRatings = 4 -> 17 / 4 = 4.25 -> 4.3 rounded
const stats4Users = engine.getStats();
assert(
  stats4Users.averageRating === 4.3,
  `7b. average calculation rounded to 1 decimal place: 17 / 4 = 4.25 -> 4.3 (Actual: ${stats4Users.averageRating})`
);

// -----------------------------------------------------------
// 8. Multiple users
// -----------------------------------------------------------
const userAStats = engine.getStats('user_a');
const userBStats = engine.getStats('user_b');
const userCStats = engine.getStats('user_c');
const userDStats = engine.getStats('user_d');
assert(
  userAStats.userRating === 5 &&
  userBStats.userRating === 4 &&
  userCStats.userRating === 3 &&
  userDStats.userRating === 5,
  '8. Multiple users: each user correctly retrieves their individual selected rating'
);

// -----------------------------------------------------------
// 9. Updating an existing user's rating
// -----------------------------------------------------------
// user_c previously submitted 3. Now user_c updates to 5.
// Previous: totalRatings = 4, totalPoints = 17 (5 + 4 + 3 + 5)
// After update: totalRatings should still be 4, totalPoints = 17 - 3 + 5 = 19
// averageRating = 19 / 4 = 4.75 -> 4.8
const updateResult = engine.submitRating('user_c', 5);
assert(
  updateResult.success === true &&
  updateResult.state?.totalRatings === 4 &&
  updateResult.state?.totalPoints === 19 &&
  updateResult.state?.averageRating === 4.8 &&
  updateResult.state?.userRating === 5,
  `9. Updating existing user rating: points adjust (17 -> 19), totalRatings remains 4, avg is 4.8 (Actual: ${updateResult.state?.averageRating})`
);

// -----------------------------------------------------------
// 10. Preventing duplicate ratings
// -----------------------------------------------------------
// Clicking star multiple times by the same user
const prevTotalRatings = engine.getStats().totalRatings;
const prevTotalPoints = engine.getStats().totalPoints;
engine.submitRating('user_c', 5);
engine.submitRating('user_c', 5);
engine.submitRating('user_c', 5);
const afterDuplicateClicks = engine.getStats();
assert(
  afterDuplicateClicks.totalRatings === prevTotalRatings &&
  afterDuplicateClicks.totalPoints === prevTotalPoints,
  `10. Preventing duplicate ratings: repeated clicks by same user preserve totalRatings (${afterDuplicateClicks.totalRatings}) and totalPoints (${afterDuplicateClicks.totalPoints})`
);

// -----------------------------------------------------------
// 11. Invalid rating rejection
// -----------------------------------------------------------
const v0 = validateRating(0);
const vNeg = validateRating(-1);
const vDecimal = validateRating(4.5);
const vAbove5 = validateRating(6);
const v100 = validateRating(100);
const vString = validateRating('5');
const vNull = validateRating(null);
const vUndefined = validateRating(undefined);
const vNaN = validateRating(NaN);
const vInf = validateRating(Infinity);

const engineRejection = engine.submitRating('hacker_user', 6);
const engineRejectionDec = engine.submitRating('hacker_user', 3.7);

assert(
  !v0.valid &&
  !vNeg.valid &&
  !vDecimal.valid &&
  !vAbove5.valid &&
  !v100.valid &&
  !vString.valid &&
  !vNull.valid &&
  !vUndefined.valid &&
  !vNaN.valid &&
  !vInf.valid &&
  !engineRejection.success &&
  !engineRejectionDec.success,
  '11. Invalid rating rejection: 0, negative values, decimals, values > 5, strings, and non-numbers are rejected'
);

// -----------------------------------------------------------
// 12. Persistence after reload
// -----------------------------------------------------------
// Instantiate a fresh RatingEngine loading from the same file on disk
const reloadedEngine = new RatingEngine(TEST_FILE);
const reloadedStats = reloadedEngine.getStats('user_c');
assert(
  reloadedStats.totalRatings === 4 &&
  reloadedStats.totalPoints === 19 &&
  reloadedStats.averageRating === 4.8 &&
  reloadedStats.userRating === 5,
  '12. Persistence after reload: fresh engine instance restored totalRatings (4), totalPoints (19), average (4.8), and user rating (5)'
);

// Clean up temp test file
if (fs.existsSync(TEST_FILE)) {
  fs.unlinkSync(TEST_FILE);
}

console.log('\n====================================================');
console.log(`TOTAL TESTS: ${passedTests + failedTests} | PASSED: ${passedTests} | FAILED: ${failedTests} | SKIPPED: 0`);
console.log('====================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
