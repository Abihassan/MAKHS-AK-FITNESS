import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getStrengthExercises, uniqueValues } from "../../../data/exerciseData";

/* ---------- DATA FROM REAL LOCAL DATASET ---------- */
const STRENGTH_MUSCLES = uniqueValues(
  getStrengthExercises(),
  "category",
).map((category) => ({
  id: category,
  title: category,
}));

/* ---------- SCREEN MAPPING ---------- */
export default function StrengthScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Strength Training</Text>

      <FlatList
        data={STRENGTH_MUSCLES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => {
              navigation.navigate("StrengthBrowser", {
                category: item.title,
              });
            }}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>
                {item.title.charAt(0).toUpperCase()}
              </Text>
            </View>

            <Text style={styles.cardText}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

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
    marginBottom: 14,
    color: "#0F172A",
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

  cardIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  cardIconText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
  },

  cardText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },
});
