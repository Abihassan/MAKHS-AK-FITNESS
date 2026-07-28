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

/* ---------- DATA ---------- */
const EXERCISE_TYPES = [
  {
    id: "1",
    title: "Barbell",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "2",
    title: "Dumbbell",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "3",
    title: "Machine",
    image: require("../../../../../assets/strength/chest.png"),
  },
];

export default function ChestExercisesScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { variation } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{variation}</Text>

      {/* GRID (SAME AS OTHER SCREENS) */}
      <FlatList
        data={EXERCISE_TYPES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("ExerciseDetail", {
                variation,
                type: item.title,
              })
            }
          >
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ---------- STYLES (LOCKED GRID SYSTEM) ---------- */
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

  /* SAME ROW SPACING */
  row: {
    gap: 14,
  },

  /* SAME CARD SIZE & POSITION */
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 26,
    alignItems: "center",
    marginBottom: 14,
    elevation: 3,
  },

  /* SAME IMAGE SIZE */
  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  /* SAME TEXT STYLE */
  cardText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },
});
