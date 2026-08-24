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
} from "../../../data/exerciseData";

import { Exercise } from "../../../data/exerciseTypes";

const titleCase = (value: string): string => {
  return value
    .split(" ")
    .map(
      (part) =>
        part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join(" ");
};

/*
 * ============================================================
 * LOCAL DATASET IMAGE
 * ============================================================
 *
 * The JSON contains:
 *
 * image: "images/0372-jivWf8n.jpg"
 *
 * The actual file is inside:
 *
 * assets/images/images/
 *
 * React Native cannot dynamically require arbitrary
 * filenames, so the safest offline approach is to use
 * the local asset path only when it is available through
 * the dataset mapping.
 */

const IMAGE_MAP: Record<string, any> = {
  // Add generated mappings here if needed.
  //
  // Example:
  //
  // "images/0372-jivWf8n.jpg":
  //   require("../../../../assets/images/images/0372-jivWf8n.jpg"),
};

const getLocalImage = (
  imagePath?: string,
): any | undefined => {
  if (!imagePath) {
    return undefined;
  }

  return IMAGE_MAP[imagePath];
};

export default function StrengthBrowserScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const {
    category,
    equipment,
    target,
  } = route.params ?? {};

  const strength = useMemo(
    () => getStrengthExercises(),
    [],
  );

  const filtered = useMemo(() => {
    return strength.filter(
      (exercise: Exercise) => {
        if (
          category &&
          normalize(exercise.category) !==
            normalize(category)
        ) {
          return false;
        }

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
      },
    );
  }, [
    strength,
    category,
    equipment,
    target,
  ]);

  /*
   * ==========================================================
   * LEVEL
   * ==========================================================
   */

  const values = useMemo(() => {
    if (!category) {
      return Array.from(
        new Set(
          filtered.map(
            (exercise: Exercise) =>
              exercise.category,
          ),
        ),
      ).sort();
    }

    if (!equipment) {
      return Array.from(
        new Set(
          filtered.map(
            (exercise: Exercise) =>
              exercise.equipment,
          ),
        ),
      ).sort();
    }

    if (!target) {
      return Array.from(
        new Set(
          filtered.map(
            (exercise: Exercise) =>
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

  const level = !category
    ? "body-part"
    : !equipment
      ? "equipment"
      : !target
        ? "target"
        : "exercise";

  const title = target
    ? titleCase(target)
    : equipment
      ? titleCase(equipment)
      : category
        ? titleCase(category)
        : "Strength";

  /*
   * ==========================================================
   * EXERCISE LIST
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
          keyExtractor={(item: Exercise) =>
            String(item.id)
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({
            item,
          }: {
            item: Exercise;
          }) => {
            const localImage =
              getLocalImage(item.image);

            return (
              <TouchableOpacity
                style={styles.exerciseCard}
                activeOpacity={0.85}
                onPress={() =>
                  navigation.navigate(
                    "ExerciseDetail",
                    {
                      exerciseId: item.id,
                    },
                  )
                }
              >
                {localImage ? (
                  <Image
                    source={localImage}
                    style={styles.exerciseImage}
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
                  style={styles.exerciseInfo}
                >
                  <Text
                    style={styles.exerciseName}
                    numberOfLines={2}
                  >
                    {titleCase(item.name)}
                  </Text>

                  <View
                    style={styles.metaRow}
                  >
                    <View
                      style={styles.metaBadge}
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
                      style={styles.metaBadge}
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
   */

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {level === "body-part"
          ? "Select body part"
          : level === "equipment"
            ? "Select equipment"
            : "Select target muscle"}
      </Text>

      <FlatList<string>
        data={values}
        keyExtractor={(item: string) =>
          item
        }
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({
          item,
        }: {
          item: string;
        }) => {
          const count =
            filtered.filter(
              (exercise: Exercise) => {
                if (
                  level ===
                  "body-part"
                ) {
                  return (
                    normalize(
                      exercise.category,
                    ) ===
                    normalize(item)
                  );
                }

                if (
                  level ===
                  "equipment"
                ) {
                  return (
                    normalize(
                      exercise.equipment,
                    ) ===
                    normalize(item)
                  );
                }

                return (
                  normalize(
                    exercise.target,
                  ) ===
                  normalize(item)
                );
              },
            ).length;

          const nextParams = {
            category,
            equipment,
            target,

            ...(level ===
            "body-part"
              ? {
                  category: item,
                }
              : {}),

            ...(level ===
            "equipment"
              ? {
                  equipment: item,
                }
              : {}),

            ...(level ===
            "target"
              ? {
                  target: item,
                }
              : {}),
          };

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
    height: 180,
    backgroundColor: "#F1F5F9",
  },

  imagePlaceholder: {
    width: "100%",
    height: 180,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  imagePlaceholderText: {
    fontSize: 52,
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