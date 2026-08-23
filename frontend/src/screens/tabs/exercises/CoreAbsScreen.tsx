import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CoreAbsScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.replace("DatasetExerciseBrowser", {
      dataset: "coreAbs",
    });
  }, [navigation]);

  return <View />;
}