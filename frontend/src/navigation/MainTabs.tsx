import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/tabs/HomeScreen";
import MissionsScreen from "../screens/tabs/MissionsScreen";
import ProgressScreen from "../screens/tabs/ProgressScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import ExerciseStack from "./ExerciseStack";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          height: 64,
          paddingBottom: 10,
          paddingTop: 6,
        },
        tabBarIcon: ({ color }) => {
          let iconName: any = "ellipse-outline";

          if (route.name === "Home") iconName = "home-outline";
          if (route.name === "Exercises") iconName = "barbell-outline";
          if (route.name === "Missions") iconName = "trophy-outline";
          if (route.name === "Progress") iconName = "stats-chart-outline";
          if (route.name === "Profile") iconName = "person-outline";

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Exercises" component={ExerciseStack} />
      <Tab.Screen name="Missions" component={MissionsScreen} />
      <Tab.Screen name="Progress" component={ProgressScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
