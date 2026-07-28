import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* HEADER */}
      <Text style={styles.header}>Ready to train today?</Text>

      {/* QUICK START */}
      <TouchableOpacity
        style={styles.quickStart}
        onPress={() => navigation.replace("MainApp")}
      >
        <Text style={styles.quickStartText}>Quick Start</Text>
      </TouchableOpacity>

      {/* GRID */}
      <View style={styles.grid}>
        <View style={styles.card}>
          <Image
            source={require("../../assets/icons/icon1.png")}
            style={styles.iconImage}
          />
          <Text style={styles.cardText}>Strength{"\n"}Training</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../assets/icons/icon2.png")}
            style={styles.iconImage}
          />
          <Text style={styles.cardText}>Cardio</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../assets/icons/icon3.png")}
            style={styles.iconImage}
          />
          <Text style={styles.cardText}>HIIT</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require("../../assets/icons/icon4.png")}
            style={styles.iconImage}
          />
          <Text style={styles.cardText}>Calisthenics</Text>
        </View>

        <View style={styles.cardWide}>
          <Image
            source={require("../../assets/icons/icon5.png")}
            style={styles.iconImage}
          />
          <Text style={styles.cardText}>
            Mobility &{"\n"}Stretching
          </Text>
        </View>
      </View>

      {/* BOTTOM ACTIONS */}
      <View style={styles.bottomRow}>
        <TouchableOpacity style={styles.missionCard}>
          <Image
            source={require("../../assets/icons/icon6.png")}
            style={styles.bottomIconImage}
          />
          <Text style={styles.bottomText}>Mission Mode</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.freeCard}>
          <Text style={styles.bottomIcon}>🆓</Text>
          <Text style={styles.bottomText}>Free Workout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: "#F5F7FB",
  },

  header: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 20,
  },

  quickStart: {
    height: 56,
    backgroundColor: "#3B82F6",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 28,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },

  quickStartText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    height: 140,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  cardWide: {
    width: "100%",
    height: 140,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },

  /* SAME IMAGE SIZE — ONLY GAP FIXED */
  iconImage: {
    width: 120,
    height: 120,
    marginBottom: 8, // ✅ correct spacing between image & text
    resizeMode: "contain",
  },

  cardText: {
    marginTop: -26,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    lineHeight: 20,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 80,
  },

  missionCard: {
    width: "48%",
    height: 100,
    backgroundColor: "#6D28D9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  freeCard: {
    width: "48%",
    height: 100,
    backgroundColor: "#0284C7",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomIconImage: {
    width: 120,
    height: 120,
    marginBottom: 4,
    resizeMode: "contain",
  },

  bottomIcon: {
    fontSize: 26,
    marginBottom: 1,
  },

  bottomText: {
    marginTop: -30,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
});
