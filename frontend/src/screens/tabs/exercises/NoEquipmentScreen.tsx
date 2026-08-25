import React, {
  useMemo,
} from "react";

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
} from "@react-navigation/native";

import {
  getNoEquipmentExercises,
  titleCase,
} from "../../../data/exerciseData";

import type {
  Exercise,
} from "../../../data/exerciseTypes";

import {
  getExerciseImage,
} from "../../../data/exerciseMedia";


export default function NoEquipmentScreen() {
  const navigation =
    useNavigation<any>();


  /* ==========================================================
     EXERCISES
  ========================================================== */

  const exercises =
    useMemo<Exercise[]>(
      () =>
        getNoEquipmentExercises(),
      [],
    );


  return (
    <View
      style={styles.container}
    >

      {/* ======================================================
          TITLE
      ====================================================== */}

      <Text
        style={styles.title}
      >
        No Equipment
      </Text>

      <Text
        style={styles.subtitle}
      >
        {exercises.length} exercises
      </Text>


      {/* ======================================================
          EXERCISE LIST
      ====================================================== */}

      <FlatList<Exercise>
        data={exercises}

        keyExtractor={(
          item: Exercise,
        ) =>
          String(item.id)
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

          /* ==================================================
             LOCAL IMAGE
          ================================================== */

          const localImage =
            getExerciseImage(
              item,
            );


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

              {/* ==============================================
                  IMAGE
              ============================================== */}

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
                      styles.imagePlaceholderText
                    }
                  >
                    {item.name
                      .charAt(0)
                      .toUpperCase()}
                  </Text>
                </View>
              )}


              {/* ==============================================
                  INFORMATION
              ============================================== */}

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


                {/* ==========================================
                    BADGES
                ========================================== */}

                <View
                  style={
                    styles.metaRow
                  }
                >

                  {/* EQUIPMENT */}

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


                  {/* TARGET */}

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


                  {/* CATEGORY */}

                  {item.category ? (
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
                          item.category,
                        )}
                      </Text>
                    </View>
                  ) : null}

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


  /* ==========================================================
     HEADER
  ========================================================== */

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


  /* ==========================================================
     LIST
  ========================================================== */

  list: {
    paddingBottom: 40,
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


  /* ==========================================================
     IMAGE
  ========================================================== */

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


  /* ==========================================================
     INFORMATION
  ========================================================== */

  exerciseInfo: {
    padding: 16,
  },

  exerciseName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },


  /* ==========================================================
     BADGES
  ========================================================== */

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
