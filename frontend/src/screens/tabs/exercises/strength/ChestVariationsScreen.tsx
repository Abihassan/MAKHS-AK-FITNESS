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

/* =========================================================
   CHEST EQUIPMENT
   ========================================================= */

const CHEST_EQUIPMENT = [
  {
    id: "1",
    title: "Barbell",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "2",
    title: "Cable",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "3",
    title: "Dumbbell",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "4",
    title: "Kettlebell",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "5",
    title: "Leverage Machine",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "6",
    title: "Smith Machine",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "7",
    title: "Weighted",
    image: require("../../../../../assets/strength/chest.png"),
  },
];

/* =========================================================
   SCREEN
   ========================================================= */

export default function ChestVariationScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chest</Text>

      <FlatList
        data={CHEST_EQUIPMENT}
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
              navigation.navigate("ChestExercises", {
                equipment: item.title,
              });
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
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    color: "#0F172A",
  },
});
