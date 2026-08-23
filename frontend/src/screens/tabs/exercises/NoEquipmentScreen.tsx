import React, { useEffect } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function NoEquipmentScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    navigation.replace("DatasetExerciseBrowser", {
      dataset: "noEquipment",
    });
  }, [navigation]);

  return <View />;
}