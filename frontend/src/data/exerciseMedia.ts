import type {
  ImageSourcePropType,
} from "react-native";

import type {
  Exercise,
} from "./exerciseTypes";

import {
  EXERCISE_IMAGES,
  EXERCISE_GIFS,
} from "./exerciseAssets";


/**
 * ============================================================
 * NORMALIZE MEDIA PATH
 * ============================================================
 */

function normalizeMediaPath(
  value:
    | string
    | null
    | undefined,
): string {
  if (!value) {
    return "";
  }

  return value
    .replace(/\\/g, "/")
    .trim();
}


/**
 * ============================================================
 * GET IMAGE
 * ============================================================
 *
 * Dataset example:
 *
 * image:
 * images/0001-2gPfomN.jpg
 *
 * We extract:
 *
 * 0001-2gPfomN.jpg
 *
 * and find it in the generated asset map.
 */

export function getExerciseImage(
  exercise: Exercise,
): ImageSourcePropType | null {
  const path = normalizeMediaPath(
    exercise.image,
  );

  if (!path) {
    return null;
  }

  const filename =
    path.split("/").pop() ?? "";

  return (
    EXERCISE_IMAGES[filename] ??
    null
  );
}


/**
 * ============================================================
 * GET GIF
 * ============================================================
 *
 * Dataset example:
 *
 * gif_url:
 * videos/0001-2gPfomN.gif
 *
 * We extract:
 *
 * 0001-2gPfomN.gif
 *
 * and find it in the generated asset map.
 */

export function getExerciseGif(
  exercise: Exercise,
): ImageSourcePropType | null {
  const path = normalizeMediaPath(
    exercise.gif_url,
  );

  if (!path) {
    return null;
  }

  const filename =
    path.split("/").pop() ?? "";

  return (
    EXERCISE_GIFS[filename] ??
    null
  );
}


/**
 * ============================================================
 * GET IMAGE FILENAME
 * ============================================================
 */

export function getExerciseImageFilename(
  exercise: Exercise,
): string | null {
  const path = normalizeMediaPath(
    exercise.image,
  );

  if (!path) {
    return null;
  }

  return (
    path.split("/").pop() ?? null
  );
}


/**
 * ============================================================
 * GET GIF FILENAME
 * ============================================================
 */

export function getExerciseGifFilename(
  exercise: Exercise,
): string | null {
  const path = normalizeMediaPath(
    exercise.gif_url,
  );

  if (!path) {
    return null;
  }

  return (
    path.split("/").pop() ?? null
  );
}
