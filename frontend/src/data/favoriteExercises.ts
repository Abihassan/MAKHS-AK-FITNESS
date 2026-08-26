import { Exercise } from "./exerciseTypes";

/**
 * ============================================================
 * FAVORITE EXERCISES
 * ============================================================
 *
 * This is a simple shared in-memory favorite store.
 *
 * The exercise ID is used as the unique identifier.
 *
 * Example:
 *
 * addFavorite(exercise)
 * removeFavorite(exercise.id)
 * isFavorite(exercise.id)
 * getFavoriteExercises()
 *
 * ============================================================
 */

let favoriteExercises: Exercise[] = [];


/**
 * ============================================================
 * GET FAVORITES
 * ============================================================
 */

export function getFavoriteExercises(): Exercise[] {
  return [...favoriteExercises];
}


/**
 * ============================================================
 * CHECK FAVORITE
 * ============================================================
 */

export function isFavorite(
  exerciseId:
    | string
    | number
    | null
    | undefined,
): boolean {
  if (
    exerciseId === undefined ||
    exerciseId === null
  ) {
    return false;
  }

  return favoriteExercises.some(
    (exercise: Exercise) =>
      String(exercise.id) ===
      String(exerciseId),
  );
}


/**
 * ============================================================
 * ADD FAVORITE
 * ============================================================
 */

export function addFavorite(
  exercise: Exercise,
): void {
  if (
    !exercise ||
    exercise.id === undefined ||
    exercise.id === null
  ) {
    return;
  }

  if (
    isFavorite(exercise.id)
  ) {
    return;
  }

  favoriteExercises = [
    ...favoriteExercises,
    exercise,
  ];
}


/**
 * ============================================================
 * REMOVE FAVORITE
 * ============================================================
 */

export function removeFavorite(
  exerciseId:
    | string
    | number
    | null
    | undefined,
): void {
  if (
    exerciseId === undefined ||
    exerciseId === null
  ) {
    return;
  }

  favoriteExercises =
    favoriteExercises.filter(
      (exercise: Exercise) =>
        String(exercise.id) !==
        String(exerciseId),
    );
}


/**
 * ============================================================
 * TOGGLE FAVORITE
 * ============================================================
 */

export function toggleFavorite(
  exercise: Exercise,
): boolean {
  if (
    isFavorite(exercise.id)
  ) {
    removeFavorite(
      exercise.id,
    );

    return false;
  }

  addFavorite(exercise);

  return true;
}


/**
 * ============================================================
 * CLEAR ALL FAVORITES
 * ============================================================
 */

export function clearFavorites(): void {
  favoriteExercises = [];
}
