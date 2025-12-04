import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ClassInformationScreen() {
  const router = useRouter();
    const { name, section, color, academicYear } = useLocalSearchParams();
    const headerColor =
    (Array.isArray(color) ? color[0] : color) || "#01B468";
  const displayName = name || "N/A";
  const displaySection = section || "N/A";
  const displayYear = academicYear || "2025 - 2026";

  return (
    <View style={styles.container}>
      {/* Colored Header */}
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Class Information Header */}
        <View style={styles.infoHeader}>
          <Text style={styles.infoTitle}>Class Information</Text>
            <TouchableOpacity
            onPress={() =>
                router.push({
                pathname: "/(tabs)/classes/editclass",
                params: {
                    name: displayName,
                    section: displaySection,
                    color: headerColor,
                    academicYear: displayYear,
                },
                })
            }
            >
            <Ionicons name="create-outline" size={20} color="#00b679" />
            </TouchableOpacity>
        </View>

        {/* Class Details */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Class Name:</Text>
            <Text style={styles.value}>{displayName}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Section:</Text>
            <Text style={styles.value}>{displaySection}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Academic Year:</Text>
            <Text style={styles.value}>{displayYear}</Text>
          </View>
        </View>

        {/* Navigation Cards */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(tabs)/classes/masterlist")}
        >
          <View style={styles.cardLeft}>
            <Ionicons name="document-text-outline" size={20} color="#00b679" />
            <Text style={styles.cardText}>Masterlist</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/(tabs)/classes/activities")}
        >
          <View style={styles.cardLeft}>
            <Ionicons name="clipboard-outline" size={20} color="#00b679" />
            <Text style={styles.cardText}>Class Activities</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        {/* Summary Section */}
        <Text style={styles.summaryTitle}>Summary</Text>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>45</Text>
            <Text style={styles.summaryLabel}>No. of Students</Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>3</Text>
            <Text style={styles.summaryLabel}>No. of Activities</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },

  backBtn: {
    marginLeft: -10,
  },

  header: {
    padding: 25,
  },

  content: {
    padding: 20,
  },

  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#00b679",
    
  },

  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  label: {
    fontSize: 14,
    color: "#555",
    fontWeight: "500",
  },
  value: {
    fontSize: 14,
    color: "#222",
    fontWeight: "700",
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },

  summaryTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    alignItems: "center",
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#00b679",
  },
  summaryLabel: {
    fontSize: 13,
    color: "#555",
    marginTop: 5,
  },
});
