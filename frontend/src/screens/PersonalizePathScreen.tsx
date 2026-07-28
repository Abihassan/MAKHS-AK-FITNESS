import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

// ✅ Proper Ionicons name type
type IoniconName = ComponentProps<typeof Ionicons>["name"];

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
  icon?: IoniconName;
};

const OptionButton = ({
  label,
  selected,
  onPress,
  icon,
}: OptionButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.option, selected && styles.optionSelected]}
      onPress={onPress}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={18}
          color={selected ? "#fff" : "#3B82F6"}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const PersonalizePathScreen = () => {
  const navigation = useNavigation<any>();

  const [fitnessLevel, setFitnessLevel] = useState("Beginner");
  const [place, setPlace] = useState("Home");
  const [goal, setGoal] = useState("Get stronger");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personalize Your Path</Text>

      {/* Fitness Level */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Fitness level:</Text>

        <OptionButton
          label="Beginner"
          icon="walk"
          selected={fitnessLevel === "Beginner"}
          onPress={() => setFitnessLevel("Beginner")}
        />
        <OptionButton
          label="Intermediate"
          icon="bicycle"
          selected={fitnessLevel === "Intermediate"}
          onPress={() => setFitnessLevel("Intermediate")}
        />
        <OptionButton
          label="Advanced"
          icon="fitness"
          selected={fitnessLevel === "Advanced"}
          onPress={() => setFitnessLevel("Advanced")}
        />
      </View>

      {/* Workout Place */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Workout place:</Text>

        <OptionButton
          label="Home"
          icon="home"
          selected={place === "Home"}
          onPress={() => setPlace("Home")}
        />
        <OptionButton
          label="Gym"
          icon="barbell"
          selected={place === "Gym"}
          onPress={() => setPlace("Gym")}
        />
        <OptionButton
          label="Both"
          icon="fitness"
          selected={place === "Both"}
          onPress={() => setPlace("Both")}
        />
      </View>

      {/* Goal */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Goal (health-focused):</Text>

        <OptionButton
          label="Get stronger"
          icon="barbell"
          selected={goal === "Get stronger"}
          onPress={() => setGoal("Get stronger")}
        />
        <OptionButton
          label="Improve fitness"
          icon="heart"
          selected={goal === "Improve fitness"}
          onPress={() => setGoal("Improve fitness")}
        />
        <OptionButton
          label="Stay active"
          icon="walk"
          selected={goal === "Stay active"}
          onPress={() => setGoal("Stay active")}
        />
      </View>

      {/* Continue */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => {
          console.log({ fitnessLevel, place, goal });
          navigation.replace("Dashboard");
        }}
      >
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default PersonalizePathScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#F3F4F6",
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#E5EDFF",
  },
  optionSelected: {
    backgroundColor: "#3B82F6",
  },
  optionText: {
    fontSize: 16,
    color: "#1F2937",
    fontWeight: "500",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "700",
  },
  continueButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  continueText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
