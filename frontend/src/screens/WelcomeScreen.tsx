import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>

      {/* Illustration */}
      <View style={styles.imageWrapper}>
        <Image
          source={require("../../assets/images/welcome1.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>
        Welcome to your{"\n"}all-in-one fitness app
      </Text>

      {/* Action Section */}
      <View style={styles.actionContainer}>

        {/* Google Login Text */}
        <Text style={styles.loginText}>
          Login to MAKSH with Google
        </Text>

        {/* Google Button */}
        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require("../../assets/images/google.png")}
            style={styles.googleIcon}
            resizeMode="contain"
          />
          <Text style={styles.googleButtonText}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        {/* Explore Without Account */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Explore")}
        >
          <Text style={styles.secondaryText}>
            Explore Without Account
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  imageWrapper: {
    width: 280,
    height: 280,
    marginTop: 80,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#000000",
    marginTop: 24,
    lineHeight: 44,
  },

  actionContainer: {
    width: "100%",
    marginTop: 140,
    alignItems: "center",
  },

  loginText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
    fontWeight: "500",
  },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 56,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    justifyContent: "center",
    marginBottom: 20,

    // Shadow (iOS + Android)
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },

  googleButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  secondaryText: {
    fontSize: 16,
    color: "#3B82F6",
    fontWeight: "600",
  },
});

export default WelcomeScreen;
