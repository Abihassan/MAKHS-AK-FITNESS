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

  /*
   * ==========================================================
   * FILTER EXERCISES
   * ==========================================================
   */

  const filtered =
    useMemo<Exercise[]>(() => {
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
    }, [
      category,
      equipment,
      target,
    ]);

  /*
   * ==========================================================
   * CURRENT LEVEL
   * ==========================================================
   */

  const level =
    !category
      ? "category"
      : !equipment
        ? "equipment"
        : !target
          ? "target"
          : "exercise";

  /*
   * ==========================================================
   * VALUES
   * ==========================================================
   */

  const values =
    useMemo<string[]>(() => {
      if (!category) {
        return Array.from(
          new Set(
            filtered.map(
              (exercise) =>
                exercise.category,
            ),
          ),
        ).sort();
      }

      if (!equipment) {
        return Array.from(
          new Set(
            filtered.map(
              (exercise) =>
                exercise.equipment,
            ),
          ),
        ).sort();
      }

      if (!target) {
        return Array.from(
          new Set(
            filtered.map(
              (exercise) =>
                exercise.target,
            ),
          ),
        ).sort();
      }

      return [];
    }, [
      filtered,
      category,
      equipment,
      target,
    ]);

  /*
   * ==========================================================
   * TITLE
   * ==========================================================
   */

  const title =
    target
      ? titleCase(target)
      : equipment
        ? titleCase(equipment)
        : category
          ? titleCase(category)
          : "Strength";

  /*
   * ==========================================================
   * EXERCISE LEVEL
   * ==========================================================
   */

  if (level === "exercise") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {filtered.length} exercises
        </Text>

        <FlatList<Exercise>
          data={filtered}
          keyExtractor={(
            item,
          ) => String(item.id)}
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.list
          }
          renderItem={({
            item,
          }) => {
            const image =
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
                {image ? (
                  <Image
                    source={image}
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
                        styles.imagePlaceholderText
                      }
                    >
                      {item.name
                        .charAt(0)
                        .toUpperCase()}
                    </Text>
                  </View>
                )}

                <View
                  style={
                    styles.exerciseInfo
                  }
                >
                  <Text
                    style={
                      styles.exerciseName
                    }
                    numberOfLines={2}
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
                            "No equipment",
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

  /*
   * ==========================================================
   * CATEGORY / EQUIPMENT / TARGET
   * ==========================================================
   *
   * IMPORTANT:
   *
   * key changes with the level.
   *
   * This prevents:
   *
   * "Changing numColumns on the fly is not supported."
   *
   */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {level === "category"
          ? "Select body part"
          : level === "equipment"
            ? "Select equipment"
            : "Select target muscle"}
      </Text>

      <FlatList<string>
        key={`strength-${level}`}
        data={values}
        numColumns={2}
        keyExtractor={(
          item,
        ) => item}
        columnWrapperStyle={
          styles.row
        }
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.list
        }
        renderItem={({
          item,
        }) => {
          let count = 0;

          if (
            level === "category"
          ) {
            count =
              filtered.filter(
                (exercise) =>
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
              filtered.filter(
                (exercise) =>
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
              filtered.filter(
                (exercise) =>
                  normalize(
                    exercise.target,
                  ) ===
                  normalize(item),
              ).length;
          }

          const nextParams = {
            category,
            equipment,
            target,
          };

          if (
            level === "category"
          ) {
            nextParams.category =
              item;
          }

          if (
            level === "equipment"
          ) {
            nextParams.equipment =
              item;
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

  imagePlaceholderText: {
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
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  metaBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
});
