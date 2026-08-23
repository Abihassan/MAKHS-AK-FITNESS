import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

/* =========================================================
   CHEST EXERCISE DATABASE
   ========================================================= */

const CHEST_EXERCISES: {
  [equipment: string]: {
    [muscle: string]: string[];
  };
} = {
  /* ===================== BARBELL ===================== */

  Barbell: {
    Pectorals: [
      "Barbell Bench Press",
      "Barbell Decline Bench Press",
      "Barbell Decline Pullover",
      "Barbell Decline Wide-Grip Press",
      "Barbell Front Raise and Pullover",
      "Barbell Guillotine Bench Press",
      "Barbell Incline Bench Press",
      "Barbell Reverse Grip Decline Bench Press",
      "Barbell Reverse Grip Incline Bench Press",
      "Barbell Wide Bench Press",
      "Barbell Wide Reverse Grip Bench Press",
      "Floor Fly (with Barbell)",
    ],

    "Serratus Anterior": [
      "Barbell Incline Shoulder Raise",
    ],
  },

  /* ===================== CABLE ===================== */

  Cable: {
    Pectorals: [
      "Cable Bench Press",
      "Cable Cross-Over Variation",
      "Cable Decline Fly",
      "Cable Decline One Arm Press",
      "Cable Decline Press",
      "Cable Incline Bench Press",
      "Cable Incline Fly",
      "Cable Incline Fly (on Stability Ball)",
      "Cable Low Fly",
      "Cable Lying Fly",
      "Cable Middle Fly",
      "Cable One Arm Decline Chest Fly",
      "Cable One Arm Fly on Exercise Ball",
      "Cable One Arm Incline Fly on Exercise Ball",
      "Cable One Arm Incline Press",
      "Cable One Arm Incline Press on Exercise Ball",
      "Cable One Arm Lateral Bent-Over",
      "Cable One Arm Press on Exercise Ball",
      "Cable Press on Exercise Ball",
      "Cable Seated Chest Press",
      "Cable Standing Fly",
      "Cable Standing Up Straight Crossovers",
      "Cable Upper Chest Crossovers",
    ],
  },

  /* ===================== DUMBBELL ===================== */

  Dumbbell: {
    Pectorals: [
      "Deep Push Up",
      "Dumbbell Around Pullover",
      "Dumbbell Bench Press",
      "Dumbbell Decline Bench Press",
      "Dumbbell Decline Fly",
      "Dumbbell Decline Hammer Press",
      "Dumbbell Decline One Arm Fly",
      "Dumbbell Decline Twist Fly",
      "Dumbbell Fly",
      "Dumbbell Fly on Exercise Ball",
      "Dumbbell Incline Alternate Press",
      "Dumbbell Incline Bench Press",
      "Dumbbell Incline Breeding",
      "Dumbbell Incline Fly",
      "Dumbbell Incline Fly on Exercise Ball",
      "Dumbbell Incline Hammer Press",
      "Dumbbell Incline One Arm Fly",
      "Dumbbell Incline One Arm Fly on Exercise Ball",
      "Dumbbell Incline One Arm Press",
      "Dumbbell Incline One Arm Press on Exercise Ball",
      "Dumbbell Incline Palm-In Press",
      "Dumbbell Incline Press on Exercise Ball",
      "Dumbbell Incline Twisted Flyes",
      "Dumbbell Lying Hammer Press",
      "Dumbbell Lying One Arm Press",
      "Dumbbell Lying One Arm Press v. 2",
      "Dumbbell Lying Pullover on Exercise Ball",
      "Dumbbell One Arm Bench Fly",
      "Dumbbell One Arm Chest Fly on Exercise Ball",
      "Dumbbell One Arm Decline Chest Press",
      "Dumbbell One Arm Fly on Exercise Ball",
      "Dumbbell One Arm Incline Chest Press",
      "Dumbbell One Arm Press on Exercise Ball",
      "Dumbbell One Arm Pullover on Exercise Ball",
      "Dumbbell One Arm Reverse Grip Press",
      "Dumbbell One Leg Fly on Exercise Ball",
      "Dumbbell Press on Exercise Ball",
      "Dumbbell Pullover",
      "Dumbbell Pullover Hip Extension on Exercise Ball",
      "Dumbbell Pullover on Exercise Ball",
      "Dumbbell Reverse Bench Press",
      "Dumbbell Straight Arm Pullover",
      "Hyght Dumbbell Fly",
    ],

    "Serratus Anterior": [
      "Dumbbell Incline Shoulder Raise",
    ],
  },

  /* ===================== KETTLEBELL ===================== */

  Kettlebell: {
    Pectorals: [
      "Kettlebell Alternating Press on Floor",
      "Kettlebell Extended Range One Arm Press on Floor",
      "Kettlebell One Arm Floor Press",
      "Kettlebell Plyo Push-Up",
    ],
  },

  /* ===================== LEVERAGE MACHINE ===================== */

  "Leverage Machine": {
    Pectorals: [
      "Assisted Chest Dip (Kneeling)",
      "Assisted Wide-Grip Chest Dip (Kneeling)",
      "Lever Chest Press",
      "Lever Chest Press",
      "Lever Decline Chest Press",
      "Lever Incline Chest Press",
      "Lever Incline Chest Press v. 2",
      "Lever Seated Fly",
      "Lever Standing Chest Press",
      "Machine Inner Chest Press",
    ],
  },

  /* ===================== SMITH MACHINE ===================== */

  "Smith Machine": {
    Pectorals: [
      "Smith Bench Press",
      "Smith Decline Bench Press",
      "Smith Decline Reverse-Grip Press",
      "Smith Incline Bench Press",
      "Smith Incline Reverse-Grip Press",
      "Smith Machine Reverse Decline Close Grip Bench Press",
      "Smith Reverse-Grip Press",
      "Smith Wide Grip Bench Press",
      "Smith Wide Grip Decline Bench Press",
    ],

    "Serratus Anterior": [
      "Smith Incline Shoulder Raises",
    ],
  },

  /* ===================== WEIGHTED ===================== */

  Weighted: {
    Pectorals: [
      "Weighted Drop Push Up",
      "Weighted Straight Bar Dip",
      "Weighted Svend Press",
    ],
  },
};

/* =========================================================
   SCREEN
   ========================================================= */

export default function ChestExercisesScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const { equipment, muscle } = route.params;

  /* =======================================================
     MUSCLE SELECTION
     ======================================================= */

  if (!muscle) {
    const muscles = Object.keys(
      CHEST_EXERCISES[equipment] || {}
    );

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{equipment}</Text>

        <Text style={styles.subtitle}>
          Select Target Muscle
        </Text>

        <FlatList
          key="muscle-grid"
          data={muscles}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => {
                navigation.navigate("ChestExercises", {
                  equipment,
                  muscle: item,
                });
              }}
            >
              <Image
                source={require("../../../../../assets/strength/chest.png")}
                style={styles.cardImage}
              />

              <Text style={styles.cardText}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  /* =======================================================
     EXERCISE LIST
     ======================================================= */

  const exercises =
    CHEST_EXERCISES[equipment]?.[muscle] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{muscle}</Text>

      <Text style={styles.subtitle}>
        {equipment}
      </Text>

      <FlatList
        key="exercise-list"
        data={exercises}
        keyExtractor={(item, index) =>
          `${item}-${index}`
        }
        numColumns={1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.exerciseCard}
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate("ExerciseDetail", {
                equipment,
                muscle,
                exercise: item,
              });
            }}
          >
            <Image
              source={require("../../../../../assets/strength/chest.png")}
              style={styles.exerciseImage}
            />

            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>
                {item}
              </Text>

              <Text style={styles.exerciseTarget}>
                {muscle}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
  },

  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748B",
    marginTop: 4,
    marginBottom: 14,
  },

  row: {
    gap: 14,
  },

  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 26,
    alignItems: "center",
    marginBottom: 14,
    elevation: 3,
  },

  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  cardText: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },

  exerciseCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  exerciseImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  exerciseInfo: {
    flex: 1,
    marginLeft: 14,
  },

  exerciseName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  exerciseTarget: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 6,
  },
});
