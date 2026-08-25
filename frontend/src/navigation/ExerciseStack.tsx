import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* MAIN SCREENS */
import ExercisesScreen from "../screens/tabs/ExercisesScreen";
import StrengthScreen from "../screens/tabs/exercises/StrengthScreen";
import CardioScreen from "../screens/tabs/exercises/CardioScreen";
import HIITScreen from "../screens/tabs/exercises/HIITScreen";
import CalisthenicsScreen from "../screens/tabs/exercises/CalisthenicsScreen";
import MobilityScreen from "../screens/tabs/exercises/MobilityScreen";
import FavoritesScreen from "../screens/tabs/exercises/FavoritesScreen";
import CoreAbsScreen from "../screens/tabs/exercises/CoreAbsScreen";
import YogaScreen from "../screens/tabs/exercises/YogaScreen";
import PilatesScreen from "../screens/tabs/exercises/PilatesScreen";
import StretchingScreen from "../screens/tabs/exercises/StretchingScreen";
import WarmUpScreen from "../screens/tabs/exercises/WarmUpScreen";
import CoolDownScreen from "../screens/tabs/exercises/CoolDownScreen";
import BalanceScreen from "../screens/tabs/exercises/BalanceScreen";
import BeginnerScreen from "../screens/tabs/exercises/BeginnerScreen";
import NoEquipmentScreen from "../screens/tabs/exercises/NoEquipmentScreen";
import TimeBasedScreen from "../screens/tabs/exercises/TimeBasedScreen";
import RehabScreen from "../screens/tabs/exercises/RehabScreen";
import ChallengesScreen from "../screens/tabs/exercises/ChallengesScreen";

/* 🔥 STRENGTH FLOW SCREENS */
import ExerciseDetailScreen from "../screens/tabs/exercises/strength/ExerciseDetailScreen";
import StrengthBrowserScreen from "../screens/tabs/exercises/StrengthBrowserScreen";
import DatasetExerciseBrowserScreen from "../screens/tabs/exercises/DatasetExerciseBrowserScreen";

const Stack = createNativeStackNavigator();

/* CUSTOM BACK BUTTON */
const BackButton = ({ navigation }: any) => (
  <TouchableOpacity
    style={{ flexDirection: "row", alignItems: "center" }}
    onPress={() => navigation.goBack()}
  >
    <Ionicons name="chevron-back" size={24} color="#000" />
    <Text style={{ fontSize: 17, fontWeight: "500" }}>Back</Text>
  </TouchableOpacity>
);

export default function ExerciseStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => <BackButton navigation={navigation} />,
        headerTitle: "",
        headerShadowVisible: false,
        headerBackVisible: false,
        headerStyle: {
          backgroundColor: "#FFFFFF",
          elevation: 0,
        },
        contentStyle: { backgroundColor: "#FFFFFF" },
      })}
    >
      {/* MAIN GRID */}
      <Stack.Screen
        name="ExercisesGrid"
        component={ExercisesScreen}
        options={{ headerShown: false }}
      />

      {/* CATEGORIES */}
      <Stack.Screen name="Strength" component={StrengthScreen} />
      <Stack.Screen name="StrengthBrowser" component={StrengthBrowserScreen} />
      <Stack.Screen name="DatasetExerciseBrowser" component={DatasetExerciseBrowserScreen} />
      <Stack.Screen name="Cardio" component={CardioScreen} />
      <Stack.Screen name="HIIT" component={HIITScreen} />
      <Stack.Screen name="Calisthenics" component={CalisthenicsScreen} />
      <Stack.Screen name="Mobility" component={MobilityScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
      <Stack.Screen name="CoreAbs" component={CoreAbsScreen} />
      <Stack.Screen name="Yoga" component={YogaScreen} />
      <Stack.Screen name="Pilates" component={PilatesScreen} />
      <Stack.Screen name="Stretching" component={StretchingScreen} />
      <Stack.Screen name="WarmUp" component={WarmUpScreen} />
      <Stack.Screen name="CoolDown" component={CoolDownScreen} />
      <Stack.Screen name="Balance" component={BalanceScreen} />
      <Stack.Screen name="Beginner" component={BeginnerScreen} />
      <Stack.Screen name="NoEquipment" component={NoEquipmentScreen} />
      <Stack.Screen name="TimeBased" component={TimeBasedScreen} />
      <Stack.Screen name="Rehab" component={RehabScreen} />
      <Stack.Screen name="Challenges" component={ChallengesScreen} />

      
      <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />


    </Stack.Navigator>
  );
}
