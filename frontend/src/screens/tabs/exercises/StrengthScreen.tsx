import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

/* ---------- DATA ---------- */
const STRENGTH_MUSCLES = [
  {
    id: "1",
    title: "Chest",
    image: require("../../../../assets/strength/chest.png"),
  },
  {
    id: "2",
    title: "Back",
    image: require("../../../../assets/strength/back.png"),
  },
  {
    id: "3",
    title: "Shoulders",
    image: require("../../../../assets/strength/shoulder.png"),
  },
  {
    id: "4",
    title: "Legs",
    image: require("../../../../assets/strength/leg.png"),
  },
  {
    id: "5",
    title: "Biceps",
    image: require("../../../../assets/strength/biceps.png"),
  },
  {
    id: "6",
    title: "Triceps",
    image: require("../../../../assets/strength/triceps.png"),
  },
];

/* ---------- SCREEN MAPPING ---------- */
const muscleScreens: { [key: string]: string } = {
  Chest: "ChestVariations",
  Back: "backVariations",
  Shoulders: "shouldersVariations",
  Legs: "legsVariations",
  Biceps: "bicepsVariations",
  Triceps: "tricepsVariations",
};

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
              const screen = muscleScreens[item.title];

              if (screen) {
                navigation.navigate(screen);
              }
            }}
          >
            <Image
              source={item.image}
              style={styles.cardImage}
            />

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

  cardImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },

  cardText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },
});
