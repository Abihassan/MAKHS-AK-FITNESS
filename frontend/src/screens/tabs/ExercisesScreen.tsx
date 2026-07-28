import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/* ---------------- TYPES ---------------- */

type ExerciseItem = {
  id: string;
  title: string;
  image: any;
  route: string;
};

/* ---------------- DATA ---------------- */

const DATA: ExerciseItem[] = [
  { id: "1", title: "Strength", image: require("../../../assets/icons/strength.png"), route: "Strength" },
  { id: "2", title: "Cardio", image: require("../../../assets/icons/cardio.png"), route: "Cardio" },
  { id: "3", title: "HIIT", image: require("../../../assets/icons/hiit.png"), route: "HIIT" },
  { id: "4", title: "Calisthenics", image: require("../../../assets/icons/calisthenics.png"), route: "Calisthenics" },
  { id: "5", title: "Mobility", image: require("../../../assets/icons/mobility.png"), route: "Mobility" },
  { id: "6", title: "Favorites", image: require("../../../assets/icons/favorites.png"), route: "Favorites" },
  { id: "7", title: "Core / Abs", image: require("../../../assets/icons/coreAbs.png"), route: "CoreAbs" },
  { id: "8", title: "Yoga", image: require("../../../assets/icons/yoga.png"), route: "Yoga" },
  { id: "9", title: "Pilates", image: require("../../../assets/icons/pilates.png"), route: "Pilates" },
  { id: "10", title: "Stretching", image: require("../../../assets/icons/stretching.png"), route: "Stretching" },
  { id: "11", title: "Warm-Up", image: require("../../../assets/icons/warmUp.png"), route: "WarmUp" },
  { id: "12", title: "Cool-Down", image: require("../../../assets/icons/coolDown.png"), route: "CoolDown" },
  { id: "13", title: "Balance", image: require("../../../assets/icons/balance.png"), route: "Balance" },
  { id: "14", title: "Beginner", image: require("../../../assets/icons/beginner.png"), route: "Beginner" },
  { id: "15", title: "No Equipment", image: require("../../../assets/icons/noEquipment.png"), route: "NoEquipment" },
  { id: "16", title: "Time Based", image: require("../../../assets/icons/timeBased.png"), route: "TimeBased" },
  { id: "17", title: "Rehabilitation", image: require("../../../assets/icons/rehab.png"), route: "Rehab" },
  { id: "18", title: "Challenges", image: require("../../../assets/icons/challenges.png"), route: "Challenges" },
];

/* ---------------- SCREEN ---------------- */

export default function ExercisesScreen() {
  const [search, setSearch] = useState("");
  const navigation = useNavigation<any>();

  const filteredData = DATA.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercises</Text>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color="#64748B" />
        <TextInput
          placeholder="Search workouts"
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Grid */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => navigation.navigate(item.route)}
          >
            <Image source={item.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

/* ---------------- STYLES ---------------- */

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
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 46,
    marginBottom: 20,
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: "#64748B",
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
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
