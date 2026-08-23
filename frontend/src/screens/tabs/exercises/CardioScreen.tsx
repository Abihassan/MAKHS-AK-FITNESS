import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CardioScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.replace("DatasetExerciseBrowser", {
      dataset: "cardio",
    });
  }, [navigation]);

  return <View />;
}