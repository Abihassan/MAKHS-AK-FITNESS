import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import PersonalizePathScreen from '../screens/PersonalizePathScreen';
import DashboardScreen from "../screens/DashboardScreen";
import MainTabs from "./MainTabs";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Explore" component={ExploreScreen} />
      <Stack.Screen name="PersonalizePath" component={PersonalizePathScreen}/>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="MainApp" component={MainTabs} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
