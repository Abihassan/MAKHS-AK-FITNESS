import React, {
  useCallback,
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

import type {
  Exercise,
} from "../../../data/exerciseTypes";

import {
  getFavoriteExercises,
  removeFavorite,
} from "../../../data/favoriteExercises";

import {
  getExerciseGif,
  getExerciseImage,
} from "../../../data/exerciseMedia";

import {
  titleCase,
} from "../../../data/exerciseData";


export default function FavoritesScreen() {
  const navigation =
    useNavigation<any>();

  const [
    favorites,
    setFavorites,
  ] = useState<Exercise[]>([]);


  /* ==========================================================
     LOAD FAVORITES
     ========================================================== */

  const loadFavorites =
    useCallback(() => {
      setFavorites(
        getFavoriteExercises(),
      );
    }, []);


  /* ==========================================================
     REFRESH WHEN SCREEN OPENS
     ========================================================== */

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites]),
  );


  /* ==========================================================
     REMOVE FAVORITE
     ========================================================== */

  const handleRemoveFavorite = (
    exerciseId:
      | string
      | number,
  ) => {
    removeFavorite(
      exerciseId,
    );

    setFavorites(
      getFavoriteExercises(),
    );
  };


  /* ==========================================================
     EMPTY STATE
     ========================================================== */

  if (favorites.length === 0) {
    return (
      <View
        style={
          styles.emptyContainer
        }
      >
        <Text
          style={
            styles.emptyIcon
          }
        >
          ☆
        </Text>

        <Text
          style={
            styles.emptyTitle
          }
        >
          No Favorite Exercises
        </Text>

        <Text
          style={
            styles.emptyText
          }
        >
          Tap the star on an exercise
          to add it to your favorites.
        </Text>
      </View>
    );
  }


  /* ==========================================================
     FAVORITES LIST
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
        Favorite Exercises
      </Text>

      <Text
        style={styles.subtitle}
      >
        {favorites.length}{" "}
        {favorites.length === 1
          ? "exercise"
          : "exercises"}
      </Text>


      {/* ======================================================
          LIST
      ====================================================== */}

      <FlatList<Exercise>
        data={favorites}

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

          const localGif =
            getExerciseGif(
              item,
            );

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
                  MEDIA
              ============================================== */}

              {localGif ? (
                <Image
                  source={
                    localGif
                  }
                  style={
                    styles.exerciseImage
                  }
                  resizeMode="contain"
                />
              ) : localImage ? (
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

                activeOpacity={0.8}

                onPress={() =>
                  handleRemoveFavorite(
                    item.id,
                  )
                }
              >
                <Text
                  style={
                    styles.favoriteIcon
                  }
                >
                  ★
                </Text>
              </TouchableOpacity>


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
     CARD
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
     FAVORITE BUTTON
  ========================================================== */

  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,

    width: 44,
    height: 44,

    borderRadius: 22,

    backgroundColor:
      "rgba(255,255,255,0.95)",

    alignItems: "center",
    justifyContent: "center",

    elevation: 3,
  },

  favoriteIcon: {
    fontSize: 25,
    color: "#F59E0B",
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
     META
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


  /* ==========================================================
     EMPTY STATE
  ========================================================== */

  emptyContainer: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
  },

  emptyIcon: {
    fontSize: 70,
    color: "#CBD5E1",
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 10,
  },

  emptyText: {
    fontSize: 15,
    lineHeight: 23,
    color: "#64748B",
    textAlign: "center",
  },

});
