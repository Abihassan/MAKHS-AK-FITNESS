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
const CHEST_VARIATIONS = [
  {
    id: "1",
    title: "Upper Chest",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "2",
    title: "Middle Chest",
    image: require("../../../../../assets/strength/chest.png"),
  },
  {
    id: "3",
    title: "Lower Chest",
    image: require("../../../../../assets/strength/chest.png"),
  },
];

export default function bicepsVariationsScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biceps</Text>

      {/* GRID (SAME AS ALL OTHER SCREENS) */}
      <FlatList
        data={CHEST_VARIATIONS}
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
              navigation.navigate("bicepsExercises", {
                variation: item.title,
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
