// app/(tabs)/capture/result.tsx
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // read params safely:
  const getParam = (p: any, fb: string) =>
    Array.isArray(p) ? p[0] : p || fb;

  const score = getParam(params.score, "27");
  const total = getParam(params.total, "30");
  const mcScore = getParam(params.mcScore, "9");
  const mcTotal = getParam(params.mcTotal, "10");
  const essayScore = getParam(params.essayScore, "18");
  const essayTotal = getParam(params.essayTotal, "20");
  const urisParam = getParam(params.uris, "");

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient colors={["#00b679", "#009e60"]} style={styles.header}>
        <Text style={styles.headerTitle}>AI scorer</Text>
      </LinearGradient>

      {/* MAIN CONTENT (centered) */}
      <View style={styles.centerContent}>
        <View style={styles.checkCircle}>
          <Ionicons name="checkmark" size={40} color="#fff" />
        </View>

        <Text style={styles.title}>Test Paper Analyzed</Text>
        <Text style={styles.scoreText}>
          Score: <Text style={styles.scoreBold}>{score}</Text> / {total}
        </Text>

        {/* Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Breakdown:</Text>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Multiple Choice</Text>
            <Text style={styles.breakdownValue}>{mcScore} / {mcTotal}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Essay</Text>
            <Text style={styles.breakdownValue}>{essayScore} / {essayTotal}</Text>
          </View>
        </View>
      </View>

      {/* BOTTOM BUTTON */}
      <View style={styles.bottomArea}>
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() =>
            router.push({
              pathname: "/capture/saved",
              params: { uris: urisParam, score, total },
            })
          }
        >
          <Text style={styles.saveText}>Save score</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const GREEN = "#00b679";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

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

  /* CENTER CONTENT */
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  checkCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: GREEN,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },

  scoreText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 24,
    textAlign: "center",
  },
  scoreBold: { fontWeight: "900", color: "#000" },

  breakdownCard: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e4e4e4",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  breakdownTitle: {
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  breakdownLabel: { color: "#000" },
  breakdownValue: { fontWeight: "700", color: "#222" },

  /* BOTTOM BUTTON */
  bottomArea: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  saveBtn: {
    backgroundColor: "#CCFFE1",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",

    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  saveText: {
    color: "#000",
    fontWeight: "800",
    fontSize: 15,
  },
});
