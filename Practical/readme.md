// Topic: View, Text, Image, ScrollView, FlatList
import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

// ─────────────────────────────────────────────────
// SECTION 1: Data for FlatList
// ─────────────────────────────────────────────────
const COURSES = [
  { id: "1", name: "Cross Platform Development", credits: 12 },
  { id: "2", name: "Software Design & Architecture", credits: 12 },
  { id: "3", name: "Database Management Systems", credits: 12 },
  { id: "4", name: "Machine Learning", credits: 12 },
  { id: "5", name: "Cloud Computing", credits: 12 },
  { id: "6", name: "Artificial Intelligence", credits: 12 },
  { id: "7", name: "Web Fundamentals", credits: 12 },
  { id: "8", name: "Cryptography", credits: 12 },
];

// ─────────────────────────────────────────────────
// SECTION 2: FlatList Item Component
// Extracted as a separate component — best practice!
// ─────────────────────────────────────────────────
const CourseItem = ({ name, credits }: { name: string; credits: number }) => (
  <View style={styles.courseCard}>
    <View style={styles.courseInfo}>
      <Text style={styles.courseName}>{name}</Text>
      <Text style={styles.courseCredits}>Credits: {credits}</Text>
    </View>
  </View>
);

// ─────────────────────────────────────────────────
// SECTION 3: Main App Component
// ─────────────────────────────────────────────────
const CoreComponentsDemo = () => {
  return (
    // SafeAreaView avoids notch/status-bar overlap
    <SafeAreaView style={styles.safe}>
      {/* ScrollView: wraps sections that need to scroll */}
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── VIEW + TEXT ────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Profile</Text>
          {/* Nested Views for layout */}
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SC</Text>
            </View>
            <View>
              <Text style={styles.name}>Sangay choden</Text>
              {/* numberOfLines truncates long text with ellipsis */}
              <Text style={styles.bio} numberOfLines={2}>
                2nd Year B.E. Software Engineering student at CST, passionate
                about mobile development and cloud systems.
              </Text>
            </View>
          </View>
        </View>

        {/* ── IMAGE ──────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Image Component</Text>

          {/* Remote image using URI */}
          <Image
            source={{
              uri: "https://www.iquest.cz/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freact-native.aaac205f.png&w=1080&q=75",
            }}
            style={styles.remoteImage}
            resizeMode="contain"
          />
          <Text style={styles.caption}>React Native Logo (Remote Image)</Text>

          {/* Local image — uncomment when you have the file */}
          {/* <Image source={require('./assets/logo.png')} style={styles.localImage} /> */}
        </View>

        {/* ── FLATLIST ───────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course List (FlatList)</Text>

          <FlatList
            data={COURSES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CourseItem name={item.name} credits={item.credits} />
            )}
            scrollEnabled={false} // disables inner scroll
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f7fafc" },
  scroll: { flex: 1, paddingHorizontal: 16 },
  section: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: 12,
  },
  profileRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#4299e1",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  name: { fontSize: 16, fontWeight: "600", color: "#2d3748" },
  bio: { fontSize: 13, color: "#718096", marginTop: 4, maxWidth: 260 },
  remoteImage: {
    width: 100,
    height: 120,
    alignSelf: "center",
    borderRadius: 12,
  },
  caption: {
    textAlign: "center",
    color: "#718096",
    fontSize: 13,
    marginTop: 6,
  },
  courseCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  courseInfo: { flex: 1 },
  courseName: { fontSize: 15, fontWeight: "600", color: "#2d3748" },
  courseCredits: { fontSize: 13, color: "#718096" },
  separator: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 4 },
});

export default CoreComponentsDemo;