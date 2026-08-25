import type {
  ImageSourcePropType,
} from "react-native";

import type {
  Exercise,
} from "./exerciseTypes";

/*
 * ============================================================
 * LOCAL EXERCISE MEDIA
 * ============================================================
 *
 * IMPORTANT:
 *
 * React Native / Metro cannot dynamically do:
 *
 * require(`../../assets/images/images/${filename}`)
 *
 * Therefore the asset paths have to be statically known.
 *
 * The maps below are where the generated local assets belong.
 * ============================================================
 */

const IMAGE_ASSETS: Record<
  string,
  ImageSourcePropType
> = {
  /*
   * Example:
   *
   * "images/0001-2gPfomN.jpg":
   *   require("../../assets/images/images/0001-2gPfomN.jpg"),
   */
};

const GIF_ASSETS: Record<
  string,
  ImageSourcePropType
> = {
  /*
   * Example:
   *
   * "videos/0001-2gPfomN.gif":
   *   require("../../assets/videos/0001-2gPfomN.gif"),
   */
};

/*
 * ============================================================
 * PATH NORMALIZATION
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
    .replace(/^\.?\//, "")
    .trim();
}

/*
 * ============================================================
 * GET IMAGE
 * ============================================================
 */

export function getExerciseImage(
  exercise: Exercise,
): ImageSourcePropType | null {
  const path =
    normalizeMediaPath(
      exercise.image,
    );

  if (!path) {
    return null;
  }

  return IMAGE_ASSETS[path] ?? null;
}

/*
 * ============================================================
 * GET GIF
 * ============================================================
 */

export function getExerciseGif(
  exercise: Exercise,
): ImageSourcePropType | null {
  const path =
    normalizeMediaPath(
      exercise.gif_url,
    );

  if (!path) {
    return null;
  }

  return GIF_ASSETS[path] ?? null;
}
