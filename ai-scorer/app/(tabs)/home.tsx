import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#00b679", "#009e60"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Image
            source={{ uri: "https://i.imgur.com/4YQZ6uM.png" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome, Jade!</Text>
          </View>
        </View>
      </LinearGradient>

      {/* RECENT ACTIVITY */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Here’s your recent activity</Text>

        <View style={styles.statsRow}>
          <StatCard value="3" label="Total Classes" />
          <StatCard value="148" label="Total Students" />
        </View>

        <View style={styles.statsRow}>
          <StatCard value="124" label="Completed Records" />
          <StatCard value="24" label="Missing Records" />
        </View>
      </View>

      {/* CLASS LIST */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Class List</Text>

        <View style={styles.classGrid}>

          {/* CLASS CARD 1 */}
          <ClassCard
            name="BSCS-4B"
            section="GEM14-M"
            color="#BB73E0"
            onPress={() =>
              router.push({
                pathname: "/(tabs)/classes/classinformation",
                params: {
                  name: "BSCS-4B",
                  section: "GEM14-M",
                  color: "#BB73E0",
                  academicYear: "2025-2026",
                },
              })
            }
          />

          {/* CLASS CARD 2 */}
          <ClassCard
            name="BSIT-4A"
            section="GEM14-M"
            color="#EE89B0"
            onPress={() =>
              router.push({
                pathname: "/(tabs)/classes/classinformation",
                params: {
                  name: "BSIT-4A",
                  section: "GEM14-M",
                  color: "#EE89B0",
                  academicYear: "2025-2026",
                },
              })
            }
          />

          {/* CLASS CARD 3 */}
          <ClassCard
            name="BSECE-3A"
            section="GEM14-M"
            color="#AEBAF8"
            onPress={() =>
              router.push({
                pathname: "/(tabs)/classes/classinformation",
                params: {
                  name: "BSECE-3A",
                  section: "GEM14-M",
                  color: "#AEBAF8",
                  academicYear: "2025-2026",
                },
              })
            }
          />

          {/* ADD CLASS CARD */}
          <AddClassCard />
        </View>
      </View>
    </ScrollView>
  );
}

/* ===========================
   STAT CARD COMPONENT
=========================== */
function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

/* ===========================
   CLASS CARD COMPONENT
=========================== */
function ClassCard({
  name,
  section,
  color,
  onPress,
}: {
  name: string;
  section: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={[styles.classCard, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={styles.className}>{name}</Text>
      <Text style={styles.classSection}>{section}</Text>
    </TouchableOpacity>
  );
}

/* ===========================
   ADD CLASS COMPONENT
=========================== */
function AddClassCard() {
  return (
    <TouchableOpacity style={[styles.classCard, styles.addClass]}>
      <Ionicons name="add-circle-outline" size={25} color="#009e60" />
      <Text style={{ color: "#009e60", fontWeight: "600" }}>Add Class</Text>
    </TouchableOpacity>
  );
}

/* ===========================
   STYLES
=========================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7fb",
  },

  header: {
    padding: 20,
  },

  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  welcomeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },

  section: {
    padding: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 5,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#009e60",
  },

  statLabel: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },

  classGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  classCard: {
    width: "47%",
    borderRadius: 12,
    padding: 15,
    marginVertical: 6,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  className: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
  },

  classSection: {
    color: "#fff",
    fontSize: 15,
    marginTop: 2,
  },

  addClass: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#009e60",
    justifyContent: "center",
    alignItems: "center",
  },
});
