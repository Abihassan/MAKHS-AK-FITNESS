import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useRoute } from "@react-navigation/native";

export default function ExerciseDetailScreen() {
  const route = useRoute<any>();

  const {
    equipment,
    muscle,
    exercise,
  } = route.params;

  /* =======================================================
     STATES
     ======================================================= */

  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [rest, setRest] = useState(60);
  const [timeLeft, setTimeLeft] = useState(rest);
  const [running, setRunning] = useState(false);

  /* =======================================================
     ANIMATION
     ======================================================= */

  const fadeAnim = useRef(
    new Animated.Value(0)
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  /* =======================================================
     TIMER
     ======================================================= */

  useEffect(() => {
    if (!running) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setRunning(false);
          return rest;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, rest]);

  /* =======================================================
     SCREEN
     ======================================================= */

  return (
    <Animated.ScrollView
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ===================================================
          EXERCISE TITLE
          =================================================== */}

      <Text style={styles.title}>
        {exercise}
      </Text>

      {/* ===================================================
          EQUIPMENT + MUSCLE
          =================================================== */}

      <View style={styles.categoryBox}>
        <View style={styles.categoryItem}>
          <Text style={styles.categoryLabel}>
            Equipment
          </Text>

          <Text style={styles.categoryValue}>
            {equipment}
          </Text>
        </View>

        <View style={styles.categoryItem}>
          <Text style={styles.categoryLabel}>
            Target
          </Text>

          <Text style={styles.categoryValue}>
            {muscle}
          </Text>
        </View>
      </View>

      {/* ===================================================
          EXERCISE IMAGE
          =================================================== */}

      <Image
        source={require("../../../../../assets/strength/chest.png")}
        style={styles.exerciseImage}
        resizeMode="contain"
      />

      {/* ===================================================
          SETS & REPS
          =================================================== */}

      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>
            Sets
          </Text>

          <Text style={styles.value}>
            {sets}
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>
            Reps
          </Text>

          <Text style={styles.value}>
            {reps}
          </Text>
        </View>
      </View>

      {/* ===================================================
          REST TIMER
          =================================================== */}

      <View style={styles.timerBox}>
        <Text style={styles.timerText}>
          {timeLeft}s
        </Text>

        <TouchableOpacity
          style={styles.timerButton}
          onPress={() => {
            setTimeLeft(rest);
            setRunning(true);
          }}
        >
          <Text style={styles.timerBtnText}>
            {running
              ? "Running..."
              : "Start Rest"}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingTop: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 16,
    color: "#111827",
  },

  categoryBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#F3F4F6",
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 20,
  },

  categoryItem: {
    alignItems: "center",
    flex: 1,
  },

  categoryLabel: {
    fontSize: 13,
    color: "#64748B",
    marginBottom: 5,
  },

  categoryValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
  },

  exerciseImage: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginBottom: 24,
    backgroundColor: "#F3F4F6",
  },

  infoBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },

  infoItem: {
    alignItems: "center",
  },

  label: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 6,
  },

  value: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },

  timerBox: {
    alignItems: "center",
    paddingBottom: 40,
  },

  timerText: {
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 12,
    color: "#111827",
  },

  timerButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 14,
  },

  timerBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
