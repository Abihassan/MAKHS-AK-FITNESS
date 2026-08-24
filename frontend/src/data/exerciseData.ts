import exercisesJson from "../../data/exercises.json";
import { Exercise } from "./exerciseTypes";

/**
 * ============================================================
 * COMPLETE LOCAL EXERCISE DATASET
 * ============================================================
 *
 * Source:
 *     frontend/data/exercises.json
 *
 * This file acts as the data-access layer for the app.
 *
 * The React Native screens should use the functions in this
 * file instead of directly reading exercises.json.
 */

/**
 * Complete exercise dataset.
 */
export const EXERCISES: Exercise[] =
  exercisesJson as Exercise[];

/**
 * ============================================================
 * NORMALIZATION
 * ============================================================
 */

/**
 * Normalize a value for safe comparisons.
 *
 * Example:
 *
 * "  Back  " -> "back"
 * "BODY WEIGHT" -> "body weight"
 */
export function normalize(
  value: string | null | undefined,
): string {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

/**
 * ============================================================
 * ALL EXERCISES
 * ============================================================
 */

/**
 * Get all exercises from the local dataset.
 */
export function getAllExercises(): Exercise[] {
  return EXERCISES;
}

/**
 * ============================================================
 * FIND EXERCISE
 * ============================================================
 */

/**
 * Find one exercise by ID.
 */
export function getExerciseById(
  id: string | number,
): Exercise | undefined {
  const searchId = String(id);

  return EXERCISES.find(
    (exercise: Exercise) =>
      String(exercise.id) === searchId,
  );
}

/**
 * ============================================================
 * CATEGORY
 * ============================================================
 */

/**
 * Get exercises by dataset category.
 *
 * Examples:
 *
 * back
 * chest
 * lower arms
 * lower legs
 * neck
 * shoulders
 * upper arms
 * upper legs
 * waist
 * cardio
 */
export function getExercisesByCategory(
  category: string,
): Exercise[] {
  return EXERCISES.filter(
    (exercise: Exercise) =>
      normalize(exercise.category) ===
      normalize(category),
  );
}

/**
 * ============================================================
 * EQUIPMENT
 * ============================================================
 */

/**
 * Get exercises by equipment.
 */
export function getExercisesByEquipment(
  equipment: string,
): Exercise[] {
  return EXERCISES.filter(
    (exercise: Exercise) =>
      normalize(exercise.equipment) ===
      normalize(equipment),
  );
}

/**
 * ============================================================
 * TARGET MUSCLE
 * ============================================================
 */

/**
 * Get exercises by target muscle.
 */
export function getExercisesByTarget(
  target: string,
): Exercise[] {
  return EXERCISES.filter(
    (exercise: Exercise) =>
      normalize(exercise.target) ===
      normalize(target),
  );
}

/**
 * ============================================================
 * STRENGTH
 * ============================================================
 */

/**
 * Get all strength exercises.
 *
 * The dataset does not contain a literal "strength"
 * category.
 *
 * Strength is represented through these body-part
 * categories.
 */
export function getStrengthExercises(
  category?: string,
  equipment?: string,
): Exercise[] {
  const strengthCategories = [
    "back",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist",
  ];

  return EXERCISES.filter(
    (exercise: Exercise) => {
      /**
       * First make sure this is a strength/body-part
       * exercise and not cardio.
       */
      const isStrength =
        strengthCategories.includes(
          normalize(exercise.category),
        );

      if (!isStrength) {
        return false;
      }

      /**
       * Optional category filter.
       */
      const matchesCategory =
        !category ||
        normalize(exercise.category) ===
          normalize(category);

      /**
       * Optional equipment filter.
       */
      const matchesEquipment =
        !equipment ||
        normalize(exercise.equipment) ===
          normalize(equipment);

      return (
        matchesCategory &&
        matchesEquipment
      );
    },
  );
}

/**
 * ============================================================
 * CARDIO
 * ============================================================
 */

/**
 * Get all cardio exercises.
 */
export function getCardioExercises(): Exercise[] {
  return getExercisesByCategory("cardio");
}

/**
 * ============================================================
 * CORE / ABS
 * ============================================================
 */

/**
 * Get Core / Abs exercises.
 *
 * The dataset uses:
 *
 * category = waist
 *
 * and/or:
 *
 * target = abs
 */
export function getCoreAbsExercises(): Exercise[] {
  return EXERCISES.filter(
    (exercise: Exercise) =>
      normalize(exercise.category) === "waist" ||
      normalize(exercise.target) === "abs",
  );
}

/**
 * ============================================================
 * NO EQUIPMENT
 * ============================================================
 */

/**
 * Get exercises that require no equipment.
 *
 * In the dataset these are represented as:
 *
 * equipment = body weight
 */
export function getNoEquipmentExercises(): Exercise[] {
  return EXERCISES.filter(
    (exercise: Exercise) =>
      normalize(exercise.equipment) ===
      "body weight",
  );
}

/**
 * ============================================================
 * UNIQUE VALUES
 * ============================================================
 */

/**
 * Get unique values from a simple string array.
 *
 * Example:
 *
 * uniqueValues([
 *   "back",
 *   "chest",
 *   "back",
 * ]);
 *
 * Result:
 *
 * [
 *   "back",
 *   "chest",
 * ]
 *
 *
 * OR
 *
 * Get unique values directly from exercises.
 *
 * Example:
 *
 * uniqueValues(
 *   getStrengthExercises(),
 *   "category",
 * );
 *
 * Result:
 *
 * [
 *   "back",
 *   "chest",
 *   "shoulders",
 *   ...
 * ]
 */
export function uniqueValues(
  values: Array<
    string | null | undefined
  > | Exercise[],
  field?: keyof Exercise,
): string[] {
  /**
   * ----------------------------------------------------------
   * CASE 1
   *
   * uniqueValues(["back", "chest", "back"])
   * ----------------------------------------------------------
   */
  if (!field) {
    return Array.from(
      new Set(
        (values as Array<
          string | null | undefined
        >)
          .filter(
            (
              value,
            ): value is string =>
              typeof value === "string" &&
              value.trim().length > 0,
          )
          .map((value) =>
            value.trim(),
          ),
      ),
    ).sort((a, b) =>
      a.localeCompare(b),
    );
  }

  /**
   * ----------------------------------------------------------
   * CASE 2
   *
   * uniqueValues(exercises, "category")
   * ----------------------------------------------------------
   */
  return Array.from(
    new Set(
      (values as Exercise[])
        .map(
          (exercise: Exercise) =>
            exercise[field],
        )
        .filter(
          (
            value,
          ): value is string =>
            typeof value === "string" &&
            value.trim().length > 0,
        )
        .map((value) =>
          value.trim(),
        ),
    ),
  ).sort((a, b) =>
    a.localeCompare(b),
  );
}

/**
 * ============================================================
 * UNIQUE CATEGORIES
 * ============================================================
 */

/**
 * Get every unique category in the dataset.
 */
export function getCategories(): string[] {
  return uniqueValues(
    EXERCISES,
    "category",
  );
}

/**
 * ============================================================
 * UNIQUE EQUIPMENT
 * ============================================================
 */

/**
 * Get every unique equipment value in the dataset.
 */
export function getEquipment(): string[] {
  return uniqueValues(
    EXERCISES,
    "equipment",
  );
}

/**
 * ============================================================
 * UNIQUE TARGET MUSCLES
 * ============================================================
 */

/**
 * Get every unique target muscle in the dataset.
 */
export function getTargets(): string[] {
  return uniqueValues(
    EXERCISES,
    "target",
  );
}