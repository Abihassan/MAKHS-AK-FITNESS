import React from "react";
import { View, Text, StyleSheet } from "react-native";

const BeginnerScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Beginner Workouts</Text>
  </View>
);
export default BeginnerScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F7FB",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
  },
});
