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
  const { variation, type } = route.params;

  /* ---------- STATES ---------- */
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);
  const [rest, setRest] = useState(60);
  const [timeLeft, setTimeLeft] = useState(rest);
  const [running, setRunning] = useState(false);

  /* ---------- ANIMATION ---------- */
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  /* ---------- TIMER ---------- */
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

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>
        {variation} – {type}
      </Text>

      {/* 🖼 Exercise Image */}
      <Image
        source={require("../../../../../assets/strength/chest.png")}
        style={styles.exerciseImage}
        resizeMode="contain"
      />

      {/* 📊 SETS & REPS */}
      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Sets</Text>
          <Text style={styles.value}>{sets}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Reps</Text>
          <Text style={styles.value}>{reps}</Text>
        </View>
      </View>

      {/* ⏱ REST TIMER */}
      <View style={styles.timerBox}>
        <Text style={styles.timerText}>{timeLeft}s</Text>

        <TouchableOpacity
          style={styles.timerButton}
          onPress={() => {
            setTimeLeft(rest);
            setRunning(true);
          }}
        >
          <Text style={styles.timerBtnText}>
            {running ? "Running..." : "Start Rest"}
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
}

/* ---------- STYLES ---------- */
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
