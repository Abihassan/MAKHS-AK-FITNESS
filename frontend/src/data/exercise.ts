// Backward-compatible export for existing screens.
// The source of truth is now the real local data/exercises.json file.
export {
  EXERCISES,
  getAllExercises,
  getExerciseById,
  getExercisesByCategory,
  getExercisesByEquipment,
  getExercisesByTarget,
  getStrengthExercises,
  getNoEquipmentExercises,
  getCardioExercises,
  getCoreAbsExercises,
  uniqueValues,
} from "./exerciseData";

export type { Exercise } from "./exerciseTypes";
