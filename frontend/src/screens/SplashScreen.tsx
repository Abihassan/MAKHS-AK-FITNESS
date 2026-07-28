import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const logo = require("../../assets/images/splash.png");

const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={["#0B1D36", "#0F2F5A", "#102A43"]} // blue gradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View style={styles.centerContent}>
        {/* LOGO */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        {/* APP NAME */}
        <Text style={styles.appName}>MAKHS</Text>

        {/* TAGLINE */}
        <Text style={styles.tagline}>Plan Smart. Train Hard.</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1D36",
    justifyContent: "center",
    alignItems: "center",
  },

  centerContent: {
    alignItems: "center",
    marginTop: -40, // ⬅ pulls content slightly up (important)
  },

  logo: {
    width: 600,   // ⬅ MUCH bigger
    height: 250,  // ⬅ MUCH bigger
    marginBottom: 21,
  },

  appName: {
    fontFamily: "Poppins-Italic",
    fontSize: 48,        // bigger, bold
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: 1,
    fontStyle: "italic",
  },

  tagline: {
    fontSize: 18,
    color: "#cbd5e1",
    marginTop: 12,
  },
});

export default SplashScreen;
