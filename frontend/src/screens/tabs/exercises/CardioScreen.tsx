import React, {
  useCallback,
  useMemo,
  useState,
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
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import {
  getCardioExercises,
  titleCase,
} from "../../../data/exerciseData";

import type {
  Exercise,
} from "../../../data/exerciseTypes";

import {
  getExerciseImage,
} from "../../../data/exerciseMedia";

import {
  isFavorite,
  toggleFavorite,
} from "../../../data/favoriteExercises";


export default function CardioScreen() {
  const navigation =
    useNavigation<any>();


  /* ==========================================================
     CARDIO EXERCISES
  ========================================================== */

  const exercises =
    useMemo<Exercise[]>(() => {
      return getCardioExercises();
    }, []);


  /* ==========================================================
     FAVORITE REFRESH STATE
  ========================================================== */

  const [
    favoriteVersion,
    setFavoriteVersion,
  ] = useState(0);


  /* ==========================================================
     REFRESH FAVORITES WHEN SCREEN FOCUSES
  ========================================================== */

  useFocusEffect(
    useCallback(() => {
      setFavoriteVersion(
        (value) => value + 1,
      );
    }, []),
  );


  /* ==========================================================
     TOGGLE FAVORITE
  ========================================================== */

  const handleToggleFavorite = (
    item: Exercise,
  ) => {
    toggleFavorite(item);

    setFavoriteVersion(
      (value) => value + 1,
    );
  };


  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <View
      style={styles.container}
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <Text
        style={styles.title}
      >
        Cardio
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
            getExerciseImage(item);


          /* ==================================================
             FAVORITE STATUS
          ================================================== */

          const favorite =
            isFavorite(item.id);


          /*
           * Changing favoriteVersion forces
           * this screen to render again so the
           * star updates immediately.
           */
          void favoriteVersion;


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
                  LOCAL EXERCISE IMAGE
              ============================================== */}

              {localImage ? (
                <Image
                  source={
                    localImage
                  }

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
                  FAVORITE STAR
              ============================================== */}

              <TouchableOpacity
                style={
                  styles.favoriteButton
                }

                activeOpacity={0.7}

                onPress={() =>
                  handleToggleFavorite(
                    item,
                  )
                }
              >
                <Text
                  style={[
                    styles.favoriteIcon,

                    favorite
                      ? styles.favoriteIconActive
                      : styles.favoriteIconInactive,
                  ]}
                >
                  {favorite
                    ? "★"
                    : "☆"}
                </Text>
              </TouchableOpacity>


              {/* ==============================================
                  EXERCISE INFORMATION
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


                {/* ============================================
                    META INFORMATION
                ============================================ */}

                <View
                  style={
                    styles.metaRow
                  }
                >

                  {/* ==========================================
                      EQUIPMENT
                  ========================================== */}

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


                  {/* ==========================================
                      TARGET
                  ========================================== */}

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

  /* ==========================================================
     CONTAINER
  ========================================================== */

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
     EXERCISE IMAGE
  ========================================================== */

  exerciseImage: {
    width: "100%",
    height: 190,
    backgroundColor: "#E2E8F0",
  },


  /* ==========================================================
     IMAGE PLACEHOLDER
  ========================================================== */

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
     FAVORITE STAR
     
     IMPORTANT:
     No circle
     No background
     No border
     No shadow
     No elevation
  ========================================================== */

  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
  },

  favoriteIcon: {
    fontSize: 30,
    fontWeight: "800",
  },

  favoriteIconInactive: {
    color: "#94A3B8",
  },

  favoriteIconActive: {
    color: "#F59E0B",
  },


  /* ==========================================================
     EXERCISE INFORMATION
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
     META ROW
  ========================================================== */

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 8,
  },


  /* ==========================================================
     META BADGE
  ========================================================== */

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
