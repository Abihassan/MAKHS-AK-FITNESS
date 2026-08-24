import exercisesJson from "../../data/exercises.json";
import { Exercise } from "./exerciseTypes";

const exercises = exercisesJson as Exercise[];

/**
 * Normalize text for comparisons.
 */
export function normalize(value: string | undefined | null): string {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

/**
 * Return the complete exercise dataset.
 */
export function getAllExercises(): Exercise[] {
  return exercises;
}

/**
 * Find one exercise using its dataset ID.
 */
export function getExerciseById(
  id: string | number,
): Exercise | undefined {
  const searchId = String(id);

  return exercises.find(
    (exercise) => String(exercise.id) === searchId,
  );
}

/**
 * Get exercises by category.
 */
export function getExercisesByCategory(
  category: string,
): Exercise[] {
  return exercises.filter(
    (exercise) =>
      normalize(exercise.category) ===
      normalize(category),
  );
}

/**
 * Get exercises by equipment.
 */
export function getExercisesByEquipment(
  equipment: string,
): Exercise[] {
  return exercises.filter(
    (exercise) =>
      normalize(exercise.equipment) ===
      normalize(equipment),
  );
}

/**
 * Get exercises by target muscle.
 */
export function getExercisesByTarget(
  target: string,
): Exercise[] {
  return exercises.filter(
    (exercise) =>
      normalize(exercise.target) ===
      normalize(target),
  );
}

/**
 * Cardio dataset.
 */
export function getCardioExercises(): Exercise[] {
  return getExercisesByCategory("cardio");
}

/**
 * Core / Abs dataset.
 *
 * The source dataset uses "waist" as the category
 * for the exercises that we are presenting as Core / Abs.
 */
export function getCoreAbsExercises(): Exercise[] {
  return getExercisesByCategory("waist");
}

/**
 * No-equipment exercises.
 *
 * The dataset does not have a "no equipment" category.
 * We derive this from the equipment field.
 */
export function getNoEquipmentExercises(): Exercise[] {
  return exercises.filter(
    (exercise) =>
      normalize(exercise.equipment) ===
      "body weight",
  );
}