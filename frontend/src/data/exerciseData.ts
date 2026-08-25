import exercisesJson from "../../data/exercises.json";
import { Exercise } from "./exerciseTypes";

/**
 * ============================================================
 * COMPLETE LOCAL EXERCISE DATASET
 * ============================================================
 */

export const EXERCISES: Exercise[] =
  exercisesJson as Exercise[];


/**
 * ============================================================
 * NORMALIZATION
 * ============================================================
 */

export function normalize(
  value:
    | string
    | number
    | null
    | undefined,
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

export function getAllExercises(): Exercise[] {
  return EXERCISES;
}


/**
 * ============================================================
 * FIND EXERCISE BY ID
 * ============================================================
 *
 * IMPORTANT:
 *
 * Strength, Cardio, Core/Abs and No Equipment all come from
 * the same EXERCISES dataset.
 *
 * Therefore one lookup is enough.
 */

export function getExerciseById(
  id:
    | string
    | number
    | null
    | undefined,
): Exercise | undefined {
  if (
    id === undefined ||
    id === null
  ) {
    return undefined;
  }

  const searchId = normalize(id);

  if (!searchId) {
    return undefined;
  }

  return EXERCISES.find(
    (exercise: Exercise) =>
      normalize(exercise.id) ===
      searchId,
  );
}


/**
 * ============================================================
 * CATEGORY
 * ============================================================
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
 *
 * Strength exercises are identified using body-part
 * categories.
 */

const STRENGTH_CATEGORIES = [
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


/**
 * Get all strength exercises.
 *
 * Optional filters:
 *
 * category
 * equipment
 */

export function getStrengthExercises(
  category?: string,
  equipment?: string,
): Exercise[] {
  return EXERCISES.filter(
    (exercise: Exercise) => {
      const exerciseCategory =
        normalize(
          exercise.category,
        );

      /**
       * Make sure the exercise belongs to
       * the strength/body-part dataset.
       */
      if (
        !STRENGTH_CATEGORIES.includes(
          exerciseCategory,
        )
      ) {
        return false;
      }

      /**
       * Category filter.
       */
      if (
        category &&
        exerciseCategory !==
          normalize(category)
      ) {
        return false;
      }

      /**
       * Equipment filter.
       */
      if (
        equipment &&
        normalize(
          exercise.equipment,
        ) !== normalize(equipment)
      ) {
        return false;
      }

      return true;
    },
  );
}


/**
 * ============================================================
 * CARDIO
 * ============================================================
 */

export function getCardioExercises(): Exercise[] {
  return EXERCISES.filter(
    (exercise: Exercise) =>
      normalize(exercise.category) ===
      "cardio",
  );
}


/**
 * ============================================================
 * CORE / ABS
 * ============================================================
 *
 * Core/Abs is represented by:
 *
 * category = waist
 *
 * OR
 *
 * target = abs
 */

export function getCoreAbsExercises(): Exercise[] {
  return EXERCISES.filter(
    (exercise: Exercise) =>
      normalize(exercise.category) ===
        "waist" ||
      normalize(exercise.target) ===
        "abs",
  );
}


/**
 * ============================================================
 * NO EQUIPMENT
 * ============================================================
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

export function uniqueValues(
  values:
    | Array<
        string | null | undefined
      >
    | Exercise[],
  field?: keyof Exercise,
): string[] {
  /**
   * ----------------------------------------------------------
   * SIMPLE STRING ARRAY
   *
   * uniqueValues([
   *   "back",
   *   "chest",
   *   "back"
   * ])
   * ----------------------------------------------------------
   */

  if (!field) {
    return Array.from(
      new Set(
        (
          values as Array<
            string | null | undefined
          >
        )
          .filter(
            (
              value,
            ): value is string =>
              value !== null &&
              value !== undefined &&
              String(value).trim()
                .length > 0,
          )
          .map((value) =>
            String(value).trim(),
          ),
      ),
    ).sort((a, b) =>
      a.localeCompare(b),
    );
  }


  /**
   * ----------------------------------------------------------
   * EXERCISE FIELD
   *
   * uniqueValues(
   *   exercises,
   *   "category"
   * )
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
          ): value is string | number =>
            value !== null &&
            value !== undefined &&
            String(value).trim()
              .length > 0,
        )
        .map((value) =>
          String(value).trim(),
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

export function getTargets(): string[] {
  return uniqueValues(
    EXERCISES,
    "target",
  );
}
