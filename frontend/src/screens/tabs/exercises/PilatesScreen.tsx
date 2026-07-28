import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PilatesScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Pilates</Text>
  </View>
);
export default PilatesScreen;


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
