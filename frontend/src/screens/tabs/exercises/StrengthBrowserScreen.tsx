import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getStrengthExercises,
  normalize,
} from "../../../data/exerciseData";

const titleCase = (value: string) =>
  value
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export default function StrengthBrowserScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { category, equipment, target } = route.params ?? {};

  const strength = useMemo(() => getStrengthExercises(), []);

  const filtered = useMemo(() => {
    return strength.filter((exercise) => {
      if (category && normalize(exercise.category) !== normalize(category)) {
        return false;
      }
      if (equipment && normalize(exercise.equipment) !== normalize(equipment)) {
        return false;
      }
      if (target && normalize(exercise.target) !== normalize(target)) {
        return false;
      }
      return true;
    });
  }, [strength, category, equipment, target]);

  const values = useMemo(() => {
    if (!category) {
      return Array.from(new Set(filtered.map((e) => e.category))).sort();
    }
    if (!equipment) {
      return Array.from(new Set(filtered.map((e) => e.equipment))).sort();
    }
    if (!target) {
      return Array.from(new Set(filtered.map((e) => e.target))).sort();
    }
    return [];
  }, [filtered, category, equipment, target]);

  const level = !category
    ? "body-part"
    : !equipment
      ? "equipment"
      : !target
        ? "target"
        : "exercise";

  const title = target
    ? titleCase(target)
    : equipment
      ? titleCase(equipment)
      : category
        ? titleCase(category)
        : "Strength";

  if (level === "exercise") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{filtered.length} exercises</Text>

        <FlatList
          data={filtered}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.exerciseCard}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("ExerciseDetail", {
                  exerciseId: item.id,
                  exercise: item.name,
                  equipment: item.equipment,
                  muscle: item.target,
                })
              }
            >
              <Text style={styles.exerciseName}>{item.name}</Text>
              <Text style={styles.exerciseMeta}>
                {item.equipment} · {item.target}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>
        {level === "body-part"
          ? "Select body part"
          : level === "equipment"
            ? "Select equipment"
            : "Select target muscle"}
      </Text>

      <FlatList
        data={values}
        keyExtractor={(item) => item}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const count = filtered.filter((exercise) => {
            if (level === "body-part") {
              return normalize(exercise.category) === normalize(item);
            }
            if (level === "equipment") {
              return normalize(exercise.equipment) === normalize(item);
            }
            return normalize(exercise.target) === normalize(item);
          }).length;

          const nextParams = {
            category,
            equipment,
            target,
            ...(level === "body-part" ? { category: item } : {}),
            ...(level === "equipment" ? { equipment: item } : {}),
            ...(level === "target" ? { target: item } : {}),
          };

          return (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => navigation.navigate("StrengthBrowser", nextParams)}
            >
              <Text style={styles.cardTitle}>{titleCase(item)}</Text>
              <Text style={styles.cardCount}>{count} exercises</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 18,
  },
  list: {
    paddingBottom: 40,
  },
  row: {
    gap: 14,
  },
  card: {
    flex: 1,
    minHeight: 110,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    justifyContent: "center",
    marginBottom: 14,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  cardCount: {
    marginTop: 8,
    fontSize: 13,
    color: "#64748B",
  },
  exerciseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    elevation: 1,
  },
  exerciseName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },
  exerciseMeta: {
    marginTop: 6,
    fontSize: 13,
    color: "#64748B",
  },
});
