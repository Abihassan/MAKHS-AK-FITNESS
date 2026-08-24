import React, { useMemo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute } from "@react-navigation/native";

import {
  getExerciseById,
} from "../../../../data/exerciseData";

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

export default function ExerciseDetailScreen() {
  const route = useRoute<any>();

  const exerciseId =
    route.params?.exerciseId;

  const exercise = useMemo(
    () =>
      getExerciseById(
        exerciseId,
      ),
    [exerciseId],
  );

  if (!exercise) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>
          Exercise not found
        </Text>

        <Text style={styles.errorText}>
          No exercise was found for ID{" "}
          {String(exerciseId)}.
        </Text>
      </View>
    );
  }

  const englishInstructions =
    exercise.instructions?.en;

  const englishSteps =
    exercise.instruction_steps?.en;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={
        styles.content
      }
      showsVerticalScrollIndicator={false}
    >
      {/* =====================================================
          EXERCISE NAME
          ===================================================== */}

      <Text style={styles.title}>
        {titleCase(exercise.name)}
      </Text>

      {/* =====================================================
          GIF
          ===================================================== */}

      <View style={styles.gifContainer}>
        <View style={styles.gifPlaceholder}>
          <Text
            style={styles.gifPlaceholderText}
          >
            Exercise animation
          </Text>

          <Text
            style={
              styles.gifPlaceholderPath
            }
          >
            {exercise.gif_url ??
              "No GIF available"}
          </Text>
        </View>
      </View>

      {/* =====================================================
          BASIC INFORMATION
          ===================================================== */}

      <View style={styles.infoGrid}>
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>
            Equipment
          </Text>

          <Text style={styles.infoValue}>
            {titleCase(
              exercise.equipment,
            )}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>
            Target
          </Text>

          <Text style={styles.infoValue}>
            {titleCase(
              exercise.target,
            )}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>
            Category
          </Text>

          <Text style={styles.infoValue}>
            {titleCase(
              exercise.category,
            )}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>
            Body Part
          </Text>

          <Text style={styles.infoValue}>
            {titleCase(
              exercise.body_part,
            )}
          </Text>
        </View>
      </View>

      {/* =====================================================
          MUSCLE GROUP
          ===================================================== */}

      {exercise.muscle_group ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Muscle Group
          </Text>

          <Text style={styles.sectionText}>
            {titleCase(
              exercise.muscle_group,
            )}
          </Text>
        </View>
      ) : null}

      {/* =====================================================
          SECONDARY MUSCLES
          ===================================================== */}

      {exercise.secondary_muscles &&
      exercise.secondary_muscles.length >
        0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Secondary Muscles
          </Text>

          <View style={styles.chipContainer}>
            {exercise.secondary_muscles.map(
              (muscle, index) => (
                <View
                  key={`${muscle}-${index}`}
                  style={styles.chip}
                >
                  <Text
                    style={styles.chipText}
                  >
                    {titleCase(muscle)}
                  </Text>
                </View>
              ),
            )}
          </View>
        </View>
      ) : null}

      {/* =====================================================
          DESCRIPTION
          ===================================================== */}

      {englishInstructions ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Exercise Details
          </Text>

          <Text style={styles.description}>
            {englishInstructions}
          </Text>
        </View>
      ) : null}

      {/* =====================================================
          INSTRUCTIONS
          ===================================================== */}

      {englishSteps &&
      englishSteps.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            How To Perform
          </Text>

          {englishSteps.map(
            (step, index) => (
              <View
                key={`step-${index}`}
                style={styles.step}
              >
                <View style={styles.stepNumber}>
                  <Text
                    style={
                      styles.stepNumberText
                    }
                  >
                    {index + 1}
                  </Text>
                </View>

                <Text style={styles.stepText}>
                  {step}
                </Text>
              </View>
            ),
          )}
        </View>
      ) : null}

      {/* =====================================================
          ATTRIBUTION
          ===================================================== */}

      {exercise.attribution ? (
        <Text style={styles.attribution}>
          {exercise.attribution}
        </Text>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 18,
  },

  gifContainer: {
    width: "100%",
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
    elevation: 2,
  },

  gifPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  gifPlaceholderText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#334155",
  },

  gifPlaceholderPath: {
    marginTop: 8,
    fontSize: 12,
    color: "#94A3B8",
    textAlign: "center",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 8,
  },

  infoCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 6,
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
    marginTop: 14,
    elevation: 1,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 12,
  },

  sectionText: {
    fontSize: 16,
    color: "#334155",
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: "#334155",
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  chip: {
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
  },

  step: {
    flexDirection: "row",
    marginBottom: 14,
    alignItems: "flex-start",
  },

  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: "#334155",
    paddingTop: 3,
  },

  attribution: {
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 25,
  },

  errorContainer: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  errorTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#DC2626",
  },

  errorText: {
    marginTop: 8,
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
  },
});