import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CoreAbsScreen() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Core / Abs
      </Text>

      <Text style={styles.subtitle}>
        Browse the exercises from the dataset.
      </Text>

      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate(
            "DatasetExerciseBrowser",
            {
              dataset: "coreAbs",
            },
          )
        }
      >
        <Text style={styles.buttonText}>
          Browse Core / Abs Exercises
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: "#64748B",
    marginBottom: 24,
  },

  button: {
    backgroundColor: "#0F172A",
    borderRadius: 16,
    paddingVertical: 17,
    paddingHorizontal: 20,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});