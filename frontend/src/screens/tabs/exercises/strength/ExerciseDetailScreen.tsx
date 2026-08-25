import React, { useMemo } from "react";

import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useRoute,
} from "@react-navigation/native";

import {
  getExerciseById,
  titleCase,
} from "../../../../data/exerciseData";

import {
  getExerciseGif,
  getExerciseImage,
} from "../../../../data/exerciseMedia";


export default function ExerciseDetailScreen() {
  const route =
    useRoute<any>();

  const exerciseId =
    route.params?.exerciseId;

  const exercise =
    useMemo(() => {
      if (
        exerciseId === undefined ||
        exerciseId === null
      ) {
        return undefined;
      }

      return getExerciseById(
        exerciseId,
      );
    }, [exerciseId]);


  /* ==========================================================
     NOT FOUND
  ========================================================== */

  if (!exercise) {
    return (
      <View
        style={
          styles.errorContainer
        }
      >
        <Text
          style={
            styles.errorTitle
          }
        >
          Exercise not found
        </Text>

        <Text
          style={
            styles.errorText
          }
        >
          No exercise was found
          for ID{" "}
          {String(
            exerciseId ?? "",
          )}
          .
        </Text>
      </View>
    );
  }


  /* ==========================================================
     LOCAL MEDIA
  ========================================================== */

  const localGif =
    getExerciseGif(
      exercise,
    );

  const localImage =
    getExerciseImage(
      exercise,
    );


  /* ==========================================================
     INSTRUCTIONS
  ========================================================== */

  const englishInstructions =
    exercise.instructions?.en;

  const englishSteps =
    exercise.instruction_steps
      ?.en ?? [];


  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={
        false
      }
    >

      {/* ======================================================
          NAME
      ====================================================== */}

      <Text style={styles.title}>
        {titleCase(
          exercise.name,
        )}
      </Text>


      {/* ======================================================
          LOCAL GIF
      ====================================================== */}

      <View
        style={
          styles.mediaContainer
        }
      >
        {localGif ? (
          <Image
            source={localGif}
            style={styles.gif}
            resizeMode="contain"
          />
        ) : localImage ? (
          <Image
            source={localImage}
            style={styles.gif}
            resizeMode="contain"
          />
        ) : (
          <View
            style={
              styles.mediaPlaceholder
            }
          >
            <Text
              style={
                styles.placeholderTitle
              }
            >
              No animation available
            </Text>

            <Text
              style={
                styles.placeholderText
              }
            >
              Local media was not
              found for this exercise.
            </Text>
          </View>
        )}
      </View>


      {/* ======================================================
          BASIC INFORMATION
      ====================================================== */}

      <View
        style={styles.infoGrid}
      >
        <InfoCard
          label="Equipment"
          value={titleCase(
            exercise.equipment,
          )}
        />

        <InfoCard
          label="Target"
          value={titleCase(
            exercise.target,
          )}
        />

        <InfoCard
          label="Category"
          value={titleCase(
            exercise.category,
          )}
        />

        <InfoCard
          label="Body Part"
          value={titleCase(
            exercise.body_part,
          )}
        />
      </View>


      {/* ======================================================
          MUSCLE GROUP
      ====================================================== */}

      {exercise.muscle_group ? (
        <View
          style={styles.section}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Muscle Group
          </Text>

          <View
            style={
              styles.tagContainer
            }
          >
            <View
              style={styles.tag}
            >
              <Text
                style={
                  styles.tagText
                }
              >
                {titleCase(
                  exercise.muscle_group,
                )}
              </Text>
            </View>
          </View>
        </View>
      ) : null}


      {/* ======================================================
          SECONDARY MUSCLES
      ====================================================== */}

      {exercise.secondary_muscles &&
      exercise.secondary_muscles.length >
        0 ? (
        <View
          style={styles.section}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Secondary Muscles
          </Text>

          <View
            style={
              styles.tagContainer
            }
          >
            {exercise.secondary_muscles.map(
              (
                muscle: string,
                index: number,
              ) => (
                <View
                  key={`${muscle}-${index}`}
                  style={
                    styles.tag
                  }
                >
                  <Text
                    style={
                      styles.tagText
                    }
                  >
                    {titleCase(
                      muscle,
                    )}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>
      ) : null}


      {/* ======================================================
          INSTRUCTIONS
      ====================================================== */}

      {englishInstructions ? (
        <View
          style={styles.section}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            Instructions
          </Text>

          <Text
            style={
              styles.instructions
            }
          >
            {englishInstructions}
          </Text>
        </View>
      ) : null}


      {/* ======================================================
          STEPS
      ====================================================== */}

      {englishSteps.length > 0 ? (
        <View
          style={styles.section}
        >
          <Text
            style={
              styles.sectionTitle
            }
          >
            How To Perform
          </Text>

          {englishSteps.map(
            (
              step: string,
              index: number,
            ) => (
              <View
                key={`${index}-${step}`}
                style={
                  styles.stepRow
                }
              >
                <View
                  style={
                    styles.stepNumber
                  }
                >
                  <Text
                    style={
                      styles.stepNumberText
                    }
                  >
                    {index + 1}
                  </Text>
                </View>

                <Text
                  style={
                    styles.stepText
                  }
                >
                  {step}
                </Text>
              </View>
            ),
          )}
        </View>
      ) : null}


      {/* ======================================================
          ATTRIBUTION
      ====================================================== */}

      {exercise.attribution ? (
        <View
          style={
            styles.attributionBox
          }
        >
          <Text
            style={
              styles.attributionText
            }
          >
            {exercise.attribution}
          </Text>
        </View>
      ) : null}

      <View
        style={styles.bottomSpace}
      />

    </ScrollView>
  );
}


/* ============================================================
   INFO CARD
============================================================ */

type InfoCardProps = {
  label: string;
  value: string;
};

function InfoCard({
  label,
  value,
}: InfoCardProps) {
  return (
    <View
      style={styles.infoCard}
    >
      <Text
        style={styles.infoLabel}
      >
        {label}
      </Text>

      <Text
        style={styles.infoValue}
      >
        {value}
      </Text>
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
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 18,
  },

  mediaContainer: {
    width: "100%",
    height: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },

  gif: {
    width: "100%",
    height: "100%",
  },

  mediaPlaceholder: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E8F0",
    paddingHorizontal: 20,
  },

  placeholderTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#475569",
  },

  placeholderText: {
    marginTop: 7,
    fontSize: 13,
    color: "#64748B",
    textAlign: "center",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  infoCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
  },

  infoLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 7,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },

  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 14,
  },

  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  tag: {
    backgroundColor: "#EEF2FF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  tagText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3730A3",
  },

  instructions: {
    fontSize: 15,
    lineHeight: 24,
    color: "#475569",
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0F172A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 23,
    color: "#475569",
    paddingTop: 3,
  },

  attributionBox: {
    marginTop: 18,
    paddingHorizontal: 4,
  },

  attributionText: {
    fontSize: 11,
    lineHeight: 17,
    color: "#94A3B8",
    textAlign: "center",
  },

  bottomSpace: {
    height: 30,
  },

  errorContainer: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 10,
  },

  errorText: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
});
