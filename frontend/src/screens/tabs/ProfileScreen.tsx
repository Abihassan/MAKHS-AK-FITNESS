import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  AccessibilityInfo,
  Animated,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const ANIMATION_SCALE = 1; // 0.5 = faster | 1 = normal | 1.5 = slower

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const translateY = useRef(new Animated.Value(30)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const [reduceMotion, setReduceMotion] = useState(false);

  /* 🔹 Detect system "Reduce Animations" */
  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion);
  }, []);

  /* 🔹 Entrance animation */
  useEffect(() => {
    if (reduceMotion) {
      opacity.setValue(1);
      translateY.setValue(0);
      return;
    }

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 350 * ANIMATION_SCALE,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350 * ANIMATION_SCALE,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [reduceMotion]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* HEADER */}
      <LinearGradient
        colors={["#1E40AF", "#2563EB"]}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>My Profile</Text>

        <TouchableOpacity
          style={styles.profileRow}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <View style={styles.avatar}>
            <Ionicons name="person" size={34} color="#1E40AF" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Jame Anderrs</Text>
            <Text style={styles.username}>@usergojourense</Text>
          </View>

          <Ionicons name="chevron-forward" size={22} color="#E5E7EB" />
        </TouchableOpacity>
      </LinearGradient>

      {/* CONTENT */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personalization</Text>

          <ProfileItem
            icon="person-outline"
            label="Edit level"
            onPress={() => navigation.navigate("EditLevel")}
          />
          <ProfileItem
            icon="location-outline"
            label="Edit place"
            onPress={() => navigation.navigate("EditPlace")}
          />
          <ProfileItem
            icon="flag-outline"
            label="Goal"
            onPress={() => navigation.navigate("Goal")}
            isLast
          />
        </View>

        <View style={styles.card}>
          <ProfileItem
            icon="settings-outline"
            label="Settings"
            onPress={() => navigation.navigate("Settings")}
          />
          <ProfileItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => Alert.alert("Help", "Help & Support clicked")}
          />
          <ProfileItem
            icon="shield-checkmark-outline"
            label="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
            isLast
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
};

export default ProfileScreen;

/* ---------------- ITEM ---------------- */

const ProfileItem = ({ icon, label, onPress, isLast = false }: any) => (
  <TouchableOpacity
    style={[styles.item, isLast && { borderBottomWidth: 0 }]}
    activeOpacity={0.75}
    onPress={onPress}
  >
    <View style={styles.itemLeft}>
      <View style={styles.iconBox}>
        <Ionicons name={icon} size={18} color="#2563EB" />
      </View>
      <Text style={styles.itemText}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
  </TouchableOpacity>
);

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  header: {
    paddingTop: 64,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 22,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  username: {
    fontSize: 13,
    color: "#E0E7FF",
    marginTop: 2,
  },

  content: {
    paddingHorizontal: 20,
    marginTop: -32,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 18,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    marginVertical: 10,
    marginLeft: 6,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },

  itemText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0F172A",
  },
});
