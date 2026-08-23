import { Exercise } from "./exerciseTypes";

// Metro can bundle JSON locally without requiring a network request.
const rawExercises = require("../../data/exercises.json");
export const EXERCISES = rawExercises as Exercise[];

const clean = (value: unknown): string =>
  value == null ? "" : String(value).trim();

export const normalize = (value: unknown): string =>
  clean(value).toLowerCase();

export function getAllExercises(): Exercise[] {
  return EXERCISES;
}

export function getExerciseById(id: string | number): Exercise | undefined {
  const wanted = clean(id);
  return EXERCISES.find((exercise) => clean(exercise.id) === wanted);
}

export function getExercisesByCategory(category: string): Exercise[] {
  const wanted = normalize(category);
  return EXERCISES.filter(
    (exercise) => normalize(exercise.category) === wanted,
  );
}

export function getExercisesByEquipment(equipment: string): Exercise[] {
  const wanted = normalize(equipment);
  return EXERCISES.filter(
    (exercise) => normalize(exercise.equipment) === wanted,
  );
}

export function getExercisesByTarget(target: string): Exercise[] {
  const wanted = normalize(target);
  return EXERCISES.filter(
    (exercise) => normalize(exercise.target) === wanted,
  );
}

export function getStrengthExercises(): Exercise[] {
  const strengthEquipment = new Set([
    "barbell",
    "cable",
    "dumbbell",
    "kettlebell",
    "leverage machine",
    "olympic barbell",
    "smith machine",
    "trap bar",
    "weighted",
  ]);

  return EXERCISES.filter((exercise) => {
    const equipment = normalize(exercise.equipment);
    const category = normalize(exercise.category);
    const target = normalize(exercise.target);

    // These resistance-equipment exercises were identified as the dataset's
    // strength candidate set. Explicit cardio exercises are excluded.
    return (
      strengthEquipment.has(equipment) &&
      !(category === "cardio" && target === "cardiovascular system")
    );
  });
}

export function getNoEquipmentExercises(): Exercise[] {
  return EXERCISES.filter(
    (exercise) => normalize(exercise.equipment) === "body weight",
  );
}

export function getCardioExercises(): Exercise[] {
  return EXERCISES.filter(
    (exercise) => normalize(exercise.category) === "cardio",
  );
}

export function getCoreAbsExercises(): Exercise[] {
  return EXERCISES.filter((exercise) => {
    const target = normalize(exercise.target);
    return target === "abs" || target === "abdominals" || target === "obliques";
  });
}

export function uniqueValues(
  exercises: Exercise[],
  field: "category" | "equipment" | "target",
): string[] {
  return Array.from(
    new Set(
      exercises
        .map((exercise) => clean(exercise[field]))
        .filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b));
}
