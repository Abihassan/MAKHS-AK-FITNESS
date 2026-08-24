import React, { useMemo } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  getCardioExercises,
  getCoreAbsExercises,
  getNoEquipmentExercises,
  normalize,
} from "../../../data/exerciseData";

import { Exercise } from "../../../data/exerciseTypes";

type DatasetKey =
  | "cardio"
  | "coreAbs"
  | "noEquipment";

type DatasetRouteParams = {
  dataset: DatasetKey;
  equipment?: string;
  target?: string;
};

const titleCase = (value: string): string => {
  return value
    .split(" ")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() +
        part.slice(1),
    )
    .join(" ");
};

/**
 * Convert the relative dataset image path:
 *
 * images/0001-2gPfomN.jpg
 *
 * into the local React Native asset.
 *
 * IMPORTANT:
 * The final require() must be statically known to
 * Metro, so the supported dataset files are mapped
 * explicitly here.
 */
const imageAssets: Record<
  string,
  ReturnType<typeof require>
> = {};

/*
 * We populate the image mapping from the imported
 * dataset below.
 *
 * Metro cannot dynamically require:
 *
 * require(pathFromJson)
 *
 * Therefore the actual asset mapping needs to be
 * generated from your asset folder.
 */

function getExercises(
  dataset: DatasetKey,
): Exercise[] {
  switch (dataset) {
    case "cardio":
      return getCardioExercises();

    case "coreAbs":
      return getCoreAbsExercises();

    case "noEquipment":
      return getNoEquipmentExercises();

    default:
      return [];
  }
}

export default function DatasetExerciseBrowserScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const params =
    route.params as DatasetRouteParams | undefined;

  const dataset = params?.dataset;
  const equipment = params?.equipment;
  const target = params?.target;

  if (!dataset) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Exercise Dataset
        </Text>

        <Text style={styles.errorText}>
          No dataset was provided.
        </Text>
      </View>
    );
  }

  const exercises = useMemo(
    () => getExercises(dataset),
    [dataset],
  );

  const filteredExercises = useMemo(() => {
    return exercises.filter((exercise) => {
      if (
        equipment &&
        normalize(exercise.equipment) !==
          normalize(equipment)
      ) {
        return false;
      }

      if (
        target &&
        normalize(exercise.target) !==
          normalize(target)
      ) {
        return false;
      }

      return true;
    });
  }, [
    exercises,
    equipment,
    target,
  ]);

  const equipmentList = useMemo(() => {
    return Array.from(
      new Set(
        exercises
          .map(
            (exercise) =>
              exercise.equipment,
          )
          .filter(Boolean),
      ),
    ).sort();
  }, [exercises]);

  const targetList = useMemo(() => {
    if (!equipment) {
      return [];
    }

    return Array.from(
      new Set(
        filteredExercises
          .map(
            (exercise) =>
              exercise.target,
          )
          .filter(Boolean),
      ),
    ).sort();
  }, [
    equipment,
    filteredExercises,
  ]);

  const datasetTitle =
    dataset === "cardio"
      ? "Cardio"
      : dataset === "coreAbs"
        ? "Core / Abs"
        : "No Equipment";

  /*
   * =====================================================
   * EXERCISE LIST
   * =====================================================
   */
  if (equipment && target) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {titleCase(target)}
        </Text>

        <Text style={styles.subtitle}>
          {filteredExercises.length} exercises
        </Text>

        <FlatList
          key="exercise-list"
          data={filteredExercises}
          keyExtractor={(item) =>
            String(item.id)
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.exerciseCard}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(
                  "ExerciseDetail",
                  {
                    exerciseId: item.id,
                  },
                )
              }
            >
              {/* Exercise image */}
              <View style={styles.imageContainer}>
                {imageAssets[item.id] ? (
                  <Image
                    source={
                      imageAssets[item.id]
                    }
                    style={styles.exerciseImage}
                    resizeMode="contain"
                  />
                ) : (
                  <View
                    style={styles.imagePlaceholder}
                  >
                    <Text
                      style={
                        styles.placeholderText
                      }
                    >
                      Exercise
                    </Text>
                  </View>
                )}
              </View>

              {/* Exercise name */}
              <Text style={styles.exerciseName}>
                {titleCase(item.name)}
              </Text>

              {/* Dataset information */}
              <Text style={styles.exerciseMeta}>
                {titleCase(item.equipment)}
                {" • "}
                {titleCase(item.target)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  /*
   * =====================================================
   * EQUIPMENT → TARGET
   * =====================================================
   */
  if (equipment) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {titleCase(equipment)}
        </Text>

        <Text style={styles.subtitle}>
          Select target muscle
        </Text>

        <FlatList
          key="target-list"
          data={targetList}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const count =
              filteredExercises.filter(
                (exercise) =>
                  normalize(
                    exercise.target,
                  ) === normalize(item),
              ).length;

            return (
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate(
                    "DatasetExerciseBrowser",
                    {
                      dataset,
                      equipment,
                      target: item,
                    },
                  )
                }
              >
                <Text
                  style={styles.cardTitle}
                >
                  {titleCase(item)}
                </Text>

                <Text
                  style={styles.cardCount}
                >
                  {count} exercises
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }

  /*
   * =====================================================
   * DATASET → EQUIPMENT
   * =====================================================
   */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {datasetTitle}
      </Text>

      <Text style={styles.subtitle}>
        Select equipment
      </Text>

      <FlatList
        key="equipment-list"
        data={equipmentList}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const count = exercises.filter(
            (exercise) =>
              normalize(
                exercise.equipment,
              ) === normalize(item),
          ).length;

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate(
                  "DatasetExerciseBrowser",
                  {
                    dataset,
                    equipment: item,
                  },
                )
              }
            >
              <Text
                style={styles.cardTitle}
              >
                {titleCase(item)}
              </Text>

              <Text
                style={styles.cardCount}
              >
                {count} exercises
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 18,
  },

  errorText: {
    fontSize: 16,
    color: "#DC2626",
    marginTop: 10,
  },

  list: {
    paddingBottom: 40,
  },

  row: {
    gap: 14,
  },

  card: {
    flex: 1,
    minHeight: 110,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    justifyContent: "center",
    marginBottom: 14,
    elevation: 2,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  cardCount: {
    marginTop: 8,
    fontSize: 13,
    color: "#64748B",
  },

  exerciseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },

  imageContainer: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    backgroundColor: "#F1F5F9",
    overflow: "hidden",
    marginBottom: 12,
  },

  exerciseImage: {
    width: "100%",
    height: "100%",
  },

  imagePlaceholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  placeholderText: {
    color: "#94A3B8",
    fontSize: 14,
  },

  exerciseName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  exerciseMeta: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
  },
});