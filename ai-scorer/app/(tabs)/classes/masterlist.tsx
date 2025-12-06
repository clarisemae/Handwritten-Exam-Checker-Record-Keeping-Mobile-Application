// app/(tabs)/classes/masterlist.tsx
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Masterlist() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.header, {paddingTop: insets.top + 20}]}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.className}>BSCS-4B</Text>
          <Text style={styles.sectionName}>GEM14-M</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Class Masterlist</Text>

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="cloud-upload-outline" size={20} color="#000" style={{ marginRight: 6 }} />
          <Text style={styles.uploadText}>Upload a masterlist</Text>
        </TouchableOpacity>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.uploadedLabel}>Uploaded Masterlist</Text>
          <TouchableOpacity
            style={styles.fileCard}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/classes/masterlist-view-section",
                params: {
                  name: "BSCS-4B",        // or from state/props
                  section: "GEM14-M",
                  color: "#BB73E0",
                },
              })
            }
          >
            <Text style={styles.fileName}>BSCS-4B.csv</Text>
            <Ionicons name="chevron-forward" size={18} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Upload Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={20} color="#2E7D32" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Upload a file</Text>
            <Ionicons name="cloud-upload-outline" size={36} color="#000" style={{ marginVertical: 10 }} />
            <Text style={styles.modalText}>Choose a file to upload!</Text>

            <TouchableOpacity style={styles.modalUploadBtn}>
              <Text style={styles.modalUploadText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: "#fff" },
  
  header: {
    backgroundColor: "#BB73E0", // same as class section color
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 17,
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 10,
  },
  headerTextContainer: {
    flexDirection: "column",
  },
  className: {
    color: "#fff",
    fontSize: 14,
    opacity: 0.8,
  },
  sectionName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: "#01B468",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 16,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    elevation: 2,
  },
  uploadText: {
    fontSize: 15,
    color: "#000",
  },
  uploadedLabel: {
    fontSize: 15,
    color: "#000",
    fontWeight: "500",
    marginBottom: 8,
  },
  fileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    elevation: 2,
  },
  fileName: {
    fontSize: 15,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2E7D32",
  },
  modalText: {
    fontSize: 14,
    color: "#000",
    marginVertical: 8,
  },
  modalUploadBtn: {
    backgroundColor: "#2E7D32",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 8,
  },
  modalUploadText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});
