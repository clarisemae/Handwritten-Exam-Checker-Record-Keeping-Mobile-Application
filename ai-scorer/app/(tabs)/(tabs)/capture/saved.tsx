// app/(tabs)/capture/saved.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SavedScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={["#00b679", "#009e60"]} style={styles.header}>
        <Text style={styles.headerTitle}>AI scorer</Text>
      </LinearGradient>

      {/* CENTER CONTENT */}
      <View style={styles.body}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>

        <Text style={styles.mainText}>Score Saved{"\n"}Successfully!</Text>
      </View>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomWrapper}>
        <TouchableOpacity
  style={styles.backBtn}
  onPress={() =>
    router.push({
      pathname: "/(tabs)/classes/quiz-score",
    })
  }
>
  <Text style={styles.backText}>Go back to students score</Text>
</TouchableOpacity>

      </View>
    </View>
  );
}

const GREEN = "#00b679";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingTop: 45,
    paddingBottom: 15,
    paddingHorizontal: 18,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  mainText: {
    textAlign: "center",
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800",
    color: "#000",
  },

  bottomWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  backBtn: {
    backgroundColor: "#CCFFE1",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },

  backText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 14,
  },
});
