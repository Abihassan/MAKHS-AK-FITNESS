import React, { useMemo } from "react";

import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import {
  getCoreAbsExercises,
  titleCase,
} from "../../../data/exerciseData";

import type { Exercise } from "../../../data/exerciseTypes";

import {
  getExerciseImage,
} from "../../../data/exerciseMedia";

export default function CoreAbsScreen() {
  const navigation = useNavigation<any>();

  const exercises = useMemo<Exercise[]>(
    () => {
      return getCoreAbsExercises();
    },
    [],
  );

  return (
    <View style={styles.container}>
      {/* =====================================================
          HEADER
      ===================================================== */}

      <Text style={styles.title}>
        Core / Abs
      </Text>

      <Text style={styles.subtitle}>
        {exercises.length} exercises
      </Text>

      {/* =====================================================
          EXERCISE LIST
      ===================================================== */}

      <FlatList<Exercise>
        data={exercises}
        keyExtractor={(item: Exercise) =>
          String(item.id)
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          /*
           * Resolve the dataset image path to the
           * real local JPG inside:
           *
           * assets/images/images/
           */
          const localImage =
            getExerciseImage(item);

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
              {/* =================================================
                  LOCAL EXERCISE IMAGE
              ================================================= */}

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

              {/* =================================================
                  EXERCISE INFORMATION
              ================================================= */}

              <View
                style={styles.exerciseInfo}
              >
                <Text
                  style={
                    styles.exerciseName
                  }
                >
                  {titleCase(item.name)}
                </Text>

                {/* =============================================
                    META
                ============================================= */}

                <View
                  style={styles.metaRow}
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
    marginTop: 10,
    gap: 8,
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
