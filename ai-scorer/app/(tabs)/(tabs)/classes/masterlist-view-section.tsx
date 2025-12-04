// app/(tabs)/classes/masterlist.tsx
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from "react-native";

// normalize expo-router params (string | string[] | undefined -> string)
const P = (v: string | string[] | undefined, fb = "") =>
  Array.isArray(v) ? v[0] : v ?? fb;

type Row = {
  id: string;
  name: string;
  studentId: string;
};

const INITIAL: Row[] = [
  { id: "1", name: "Buenaflor, Sean Kurt", studentId: "TUPM-22-2222" },
  { id: "2", name: "Capuz, Prince Aaron", studentId: "TUPM-22-2223" },
  { id: "3", name: "Domingo, Princess Jade", studentId: "TUPM-22-2224" },
  { id: "4", name: "Elle, Clarise Mae", studentId: "TUPM-22-2225" },
  { id: "5", name: "Perez, Maria Angela Mae", studentId: "TUPM-22-2226" },
  { id: "6", name: "Toganon, Francesca", studentId: "TUPM-22-2227" },
];

type SortKey = "NAME_ASC" | "NAME_DESC" | "ID_ASC" | "ID_DESC";

const SORT_OPTIONS: { label: string; value: SortKey }[] = [
  { label: "Name A-Z", value: "NAME_ASC" },
  { label: "Name Z-A", value: "NAME_DESC" },
  { label: "Student ID Ascending", value: "ID_ASC" },
  { label: "Student ID Descending", value: "ID_DESC" },
];

export default function MasterlistScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const className = P(params.name, "BSCS-4B");
  const section = P(params.section, "GEM14-M");
  const headerColor = P(params.color, "#BB73E0");

  const [rows] = useState<Row[]>(INITIAL);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("NAME_ASC");
  const [sortPickerOpen, setSortPickerOpen] = useState(false);
  const [sortPickerY, setSortPickerY] = useState(0);

  // export UI
  const [exportOpen, setExportOpen] = useState(false);
  const [exportDone, setExportDone] = useState<null | ".CSV" | ".PDF" | ".XLSX">(null);

  // filter + sort list shown in the table
  const visibleRows = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = rows.filter((r) => {
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.studentId.toLowerCase().includes(q)
      );
    });

    // IMPORTANT: always sort a copy, never mutate state
    list = [...list];

    switch (sortKey) {
      case "NAME_ASC":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "NAME_DESC":
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "ID_ASC":
        list.sort((a, b) => a.studentId.localeCompare(b.studentId));
        break;
      case "ID_DESC":
        list.sort((a, b) => b.studentId.localeCompare(a.studentId));
        break;
    }

    return list;
  }, [rows, query, sortKey]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: headerColor }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerSmall}>{className}</Text>
          <Text style={styles.headerBig}>{section}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Class Masterlist</Text>

        {/* Search + Sort + Export row */}
        <View style={styles.topRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={16} color="#666" />
            <TextInput
              placeholder="Search for a name or student ID number"
              placeholderTextColor="#999"
              value={query}
              onChangeText={setQuery}
              style={styles.searchInput}
            />
          </View>

          {/* Sort button */}
          <TouchableOpacity
            style={styles.sortBtn}
            onPress={(e) => {
              setSortPickerY(e.nativeEvent.pageY);
              setSortPickerOpen(true);
            }}
          >
            <Ionicons name="funnel-outline" size={16} color="#333" />
            <Text style={styles.sortText}>Sort</Text>
            <Ionicons name="chevron-down" size={14} color="#333" />
          </TouchableOpacity>

          {/* Export button */}
          <TouchableOpacity
            style={styles.exportBtn}
            onPress={() => setExportOpen(true)}
          >
            <Text style={styles.exportText}>Export</Text>
          </TouchableOpacity>
        </View>

        {/* SORT PICKER POPUP */}
        <Modal
          visible={sortPickerOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setSortPickerOpen(false)}
        >
          <View style={styles.modalBackdrop}>
            <Pressable
              style={StyleSheet.absoluteFillObject}
              onPress={() => setSortPickerOpen(false)}
            />

            <View style={[styles.popup, { top: sortPickerY + 10 }]}>
              {SORT_OPTIONS.map(({ label, value }) => {
                const selected = value === sortKey;

                return (
                  <TouchableOpacity
                    key={value}
                    onPress={() => {
                      setSortKey(value);
                      setSortPickerOpen(false);
                    }}
                    style={[styles.popupItem, selected && styles.popupItemSelected]}
                  >
                    <Text
                      style={[
                        styles.popupItemText,
                        selected && styles.popupItemTextSelected,
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </Modal>

        {/* TABLE */}
        <View style={styles.table}>
          <View style={[styles.row, styles.headRow]}>
            <Text style={[styles.cellName, styles.headText]}>Name</Text>
            <Text style={[styles.cellId, styles.headText]}>Student ID</Text>
            <Text style={[styles.cellManage, styles.headText]}>Manage</Text>
          </View>

          {visibleRows.map((r, idx) => (
            <View
              key={r.id}
              style={[
                styles.row,
                idx === visibleRows.length - 1 && { borderBottomWidth: 0 },
              ]}
            >
              <Text style={styles.cellName} numberOfLines={1}>
                {r.name}
              </Text>
              <Text style={styles.cellId}>{r.studentId}</Text>

              <View style={[styles.cellManage, styles.iconsRow]}>
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons name="create-outline" size={18} color="#111" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Ionicons name="trash-outline" size={18} color="#111" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Export choose modal */}
      <Modal
        visible={exportOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setExportOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Export</Text>
              <TouchableOpacity onPress={() => setExportOpen(false)}>
                <Ionicons name="close" size={20} color="#01B468" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalBodyCenter}>
              Choose a file format to download{"\n"}the data!
            </Text>

            {[".CSV", ".PDF", ".XLSX"].map((fmt) => (
              <TouchableOpacity
                key={fmt}
                style={styles.optionBtn}
                onPress={() => {
                  setExportOpen(false);
                  setTimeout(
                    () => setExportDone(fmt as ".CSV" | ".PDF" | ".XLSX"),
                    180
                  );
                }}
              >
                <Text style={styles.optionText}>{fmt}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={[styles.modalBtnInline, styles.modalCancel]}
              onPress={() => setExportOpen(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Export success modal */}
      <Modal
        visible={exportDone !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setExportDone(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Export</Text>
              <View />
            </View>

            <View style={{ alignItems: "center", marginVertical: 10 }}>
              <View style={styles.checkCircle}>
                <Ionicons name="checkmark" size={34} color="#fff" />
              </View>
              <Text style={styles.modalBodyCenter}>
                You successfully exported {exportDone ?? ""}!
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.modalBtnInline, styles.modalSave]}
              onPress={() => setExportDone(null)}
            >
              <Text style={styles.modalSaveText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const R = 10;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: { marginRight: 10 },
  headerSmall: { color: "#fff", fontSize: 14, opacity: 0.85 },
  headerBig: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  content: { padding: 20 },

  pageTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#01B468",
    marginBottom: 16,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#fff",
    borderRadius: R,
    paddingHorizontal: 10,
    height: 38,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: { flex: 1, paddingVertical: 4, color: "#111" },

  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    height: 38,
    borderRadius: R,
    borderWidth: 1,
    borderColor: "#e3e3e3",
    backgroundColor: "#fff",
    gap: 4,
  },
  sortText: { fontSize: 12, fontWeight: "600", color: "#333" },

  exportBtn: {
    backgroundColor: "#01B468",
    paddingHorizontal: 14,
    height: 38,
    borderRadius: R,
    alignItems: "center",
    justifyContent: "center",
  },
  exportText: { color: "#fff", fontWeight: "800" },

  // sort popup
  modalBackdrop: {
    flex: 1,
  },

  popup: {
    position: "absolute",
    right: 16,
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOpacity: 0.20,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#eee",
  },

  popupItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },

  popupItemSelected: {
    backgroundColor: "#E6F7EF",
  },

  popupItemText: {
    fontSize: 14,
    color: "#333",
  },

  popupItemTextSelected: {
    fontWeight: "700",
    color: "#00b679",
  },


  // table
  table: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    minHeight: 44,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  headRow: { backgroundColor: "#F7F7F7" },
  headText: { fontWeight: "700", color: "#333" },

  cellName: { flex: 1.6, color: "#111" },
  cellId: { flex: 1, color: "#111" },
  cellManage: { width: 70 },

  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
  },

  // export modals
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalTitle: { fontSize: 18, fontWeight: "800", color: "#01B468" },
  modalBodyCenter: { textAlign: "center", color: "#333", marginTop: 10 },

  optionBtn: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
    marginTop: 8,
  },
  optionText: { textAlign: "center", fontWeight: "700", color: "#333" },

  modalBtnInline: {
    marginTop: 14,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  modalCancel: { backgroundColor: "#eee" },
  modalCancelText: { color: "#333", fontWeight: "800" },
  modalSave: { backgroundColor: "#18A15A" },
  modalSaveText: { color: "#fff", fontWeight: "800" },

  checkCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#18A15A",
    alignItems: "center",
    justifyContent: "center",
  },
});
