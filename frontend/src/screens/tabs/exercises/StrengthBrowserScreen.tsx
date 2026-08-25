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
  getStrengthExercises,
  normalize,
  titleCase,
} from "../../../data/exerciseData";

import type {
  Exercise,
} from "../../../data/exerciseTypes";

import {
  getExerciseImage,
} from "../../../data/exerciseMedia";


export default function StrengthBrowserScreen() {
  const navigation =
    useNavigation<any>();

  const route =
    useRoute<any>();

  const category =
    route.params?.category ?? "";

  const equipment =
    route.params?.equipment ?? "";

  const target =
    route.params?.target ?? "";


  /* ==========================================================
     FILTER EXERCISES
  ========================================================== */

  const exercises = useMemo<Exercise[]>(
    () => {
      return getStrengthExercises().filter(
        (exercise: Exercise) => {
          if (
            category &&
            normalize(
              exercise.category,
            ) !==
              normalize(category)
          ) {
            return false;
          }

          if (
            equipment &&
            normalize(
              exercise.equipment,
            ) !==
              normalize(equipment)
          ) {
            return false;
          }

          if (
            target &&
            normalize(
              exercise.target,
            ) !==
              normalize(target)
          ) {
            return false;
          }

          return true;
        },
      );
    },
    [
      category,
      equipment,
      target,
    ],
  );


  /* ==========================================================
     CURRENT LEVEL
  ========================================================== */

  const level =
    !category
      ? "category"
      : !equipment
        ? "equipment"
        : !target
          ? "target"
          : "exercise";


  /* ==========================================================
     VALUES FOR CURRENT LEVEL
  ========================================================== */

  const values = useMemo<string[]>(
    () => {
      let result: string[] = [];

      if (!category) {
        result = exercises
          .map(
            (exercise) =>
              exercise.category,
          )
          .filter(Boolean);
      } else if (!equipment) {
        result = exercises
          .map(
            (exercise) =>
              exercise.equipment,
          )
          .filter(Boolean);
      } else if (!target) {
        result = exercises
          .map(
            (exercise) =>
              exercise.target,
          )
          .filter(Boolean);
      }

      return Array.from(
        new Set(result),
      ).sort((a, b) =>
        a.localeCompare(b),
      );
    },
    [
      exercises,
      category,
      equipment,
      target,
    ],
  );


  /* ==========================================================
     SCREEN TITLE
  ========================================================== */

  const screenTitle =
    target
      ? titleCase(target)
      : equipment
        ? titleCase(equipment)
        : category
          ? titleCase(category)
          : "Strength Training";


  /* ==========================================================
     EXERCISE LIST
  ========================================================== */

  if (level === "exercise") {
    return (
      <View
        style={styles.container}
      >
        <Text
          style={styles.title}
        >
          {screenTitle}
        </Text>

        <Text
          style={styles.subtitle}
        >
          {exercises.length} exercises
        </Text>

        <FlatList<Exercise>
          data={exercises}
          keyExtractor={(
            item: Exercise,
          ) => String(item.id)}
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.listContent
          }
          renderItem={({
            item,
          }) => {
            const localImage =
              getExerciseImage(item);

            return (
              <TouchableOpacity
                style={
                  styles.exerciseCard
                }
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate(
                    "ExerciseDetail",
                    {
                      exerciseId:
                        item.id,
                    },
                  )
                }
              >
                {/* IMAGE */}

                {localImage ? (
                  <Image
                    source={localImage}
                    style={
                      styles.exerciseImage
                    }
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={
                      styles.imagePlaceholder
                    }
                  >
                    <Text
                      style={
                        styles.placeholderText
                      }
                    >
                      {item.name
                        .charAt(0)
                        .toUpperCase()}
                    </Text>
                  </View>
                )}

                {/* INFORMATION */}

                <View
                  style={
                    styles.exerciseInfo
                  }
                >
                  <Text
                    style={
                      styles.exerciseName
                    }
                  >
                    {titleCase(
                      item.name,
                    )}
                  </Text>

                  <View
                    style={
                      styles.metaRow
                    }
                  >
                    <View
                      style={
                        styles.metaBadge
                      }
                    >
                      <Text
                        style={
                          styles.metaBadgeText
                        }
                      >
                        {titleCase(
                          item.equipment ||
                            "Body Weight",
                        )}
                      </Text>
                    </View>

                    <View
                      style={
                        styles.metaBadge
                      }
                    >
                      <Text
                        style={
                          styles.metaBadgeText
                        }
                      >
                        {titleCase(
                          item.target ||
                            "Unknown",
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }


  /* ==========================================================
     CATEGORY / EQUIPMENT / TARGET GRID
  ========================================================== */

  return (
    <View
      style={styles.container}
    >
      <Text
        style={styles.title}
      >
        {screenTitle}
      </Text>

      <Text
        style={styles.subtitle}
      >
        {level === "category"
          ? "Select body part"
          : level === "equipment"
            ? "Select equipment"
            : "Select target muscle"}
      </Text>

      <FlatList<string>
        /*
         * IMPORTANT:
         *
         * FlatList does not allow changing
         * numColumns dynamically.
         *
         * The key forces a completely new
         * FlatList when the level changes.
         */
        key={`strength-grid-${level}`}
        data={values}
        numColumns={2}
        keyExtractor={(
          item: string,
        ) => item}
        columnWrapperStyle={
          styles.row
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.listContent
        }
        renderItem={({
          item,
        }) => {
          let count = 0;

          if (
            level === "category"
          ) {
            count =
              exercises.filter(
                (
                  exercise,
                ) =>
                  normalize(
                    exercise.category,
                  ) ===
                  normalize(item),
              ).length;
          }

          if (
            level === "equipment"
          ) {
            count =
              exercises.filter(
                (
                  exercise,
                ) =>
                  normalize(
                    exercise.equipment,
                  ) ===
                  normalize(item),
              ).length;
          }

          if (
            level === "target"
          ) {
            count =
              exercises.filter(
                (
                  exercise,
                ) =>
                  normalize(
                    exercise.target,
                  ) ===
                  normalize(item),
              ).length;
          }


          /* ================================================
             NEXT NAVIGATION PARAMS
          ================================================= */

          const nextParams: {
            category: string;
            equipment: string;
            target: string;
          } = {
            category,
            equipment,
            target,
          };


          if (
            level === "category"
          ) {
            nextParams.category =
              item;
            nextParams.equipment =
              "";
            nextParams.target =
              "";
          }


          if (
            level === "equipment"
          ) {
            nextParams.equipment =
              item;
            nextParams.target =
              "";
          }


          if (
            level === "target"
          ) {
            nextParams.target =
              item;
          }


          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate(
                  "StrengthBrowser",
                  nextParams,
                )
              }
            >
              <View
                style={
                  styles.cardIcon
                }
              >
                <Text
                  style={
                    styles.cardIconText
                  }
                >
                  {item
                    .charAt(0)
                    .toUpperCase()}
                </Text>
              </View>

              <Text
                style={
                  styles.cardTitle
                }
              >
                {titleCase(item)}
              </Text>

              <Text
                style={
                  styles.cardCount
                }
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


/* ============================================================
   STYLES
============================================================ */

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
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 18,
  },

  listContent: {
    paddingBottom: 40,
  },

  row: {
    gap: 14,
  },

  /* ==========================================================
     GRID CARD
  ========================================================== */

  card: {
    flex: 1,
    minHeight: 155,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
    elevation: 3,
  },

  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  cardIconText: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },

  cardCount: {
    marginTop: 6,
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },

  /* ==========================================================
     EXERCISE CARD
  ========================================================== */

  exerciseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginBottom: 14,
    overflow: "hidden",
    elevation: 2,
  },

  exerciseImage: {
    width: "100%",
    height: 190,
    backgroundColor: "#E2E8F0",
  },

  imagePlaceholder: {
    width: "100%",
    height: 190,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  placeholderText: {
    fontSize: 56,
    fontWeight: "800",
    color: "#64748B",
  },

  exerciseInfo: {
    padding: 16,
  },

  exerciseName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  metaBadge: {
    backgroundColor: "#F1F5F9",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  metaBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
});
