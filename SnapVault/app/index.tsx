// app/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../theme/colors";

const FEATURES = [
  {
    href: "/camera",
    icon: "camera" as const,
    title: "Camera",
    body: "Capture photos and record video using the device camera.",
    tint: colors.primary,
  },
  {
    href: "/gallery",
    icon: "images" as const,
    title: "Photo Library",
    body: "Browse the photos already on your device.",
    tint: colors.accent,
  },
  {
    href: "/picker",
    icon: "cloud-upload" as const,
    title: "Image Picker",
    body: "Pick a photo using the system picker, with cropping.",
    tint: colors.success,
  },
];

export default function HomeScreen() {
  return (
    <ScreenContainer
      title="SnapVault"
      subtitle="A demo of device-feature access in React Native"
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.heroBlob1} pointerEvents="none" />
          <View style={styles.heroBlob2} pointerEvents="none" />

          <View style={styles.heroIconRing}>
            <View style={styles.heroIconInner}>
              <Ionicons name="aperture" size={30} color={colors.primary} />
            </View>
          </View>

          <Text style={styles.heroTitle}>SnapVault</Text>
          <Text style={styles.heroBody}>
            {"Three native capabilities, one sleek app.\n"}
            {"Tap a card below to explore camera, library, and picker."}
          </Text>

          <View style={styles.heroStats}>
            {(["Camera", "Library", "Picker"] as const).map((label, i) => (
              <View key={label} style={styles.heroStat}>
                {i !== 0 && <View style={styles.heroStatDivider} />}
                <Text style={styles.heroStatLabel}>{label}</Text>
              </View>
            ))}
          </View>
        </View>

        {FEATURES.map((f) => (
          <Link key={f.href} href={f.href} asChild>
            <Pressable>
              {({ pressed }) => (
                <View
                  style={[
                    styles.card,
                    { borderColor: f.tint + "30" },
                    pressed && { transform: [{ scale: 0.97 }], opacity: 0.85 },
                  ]}
                >
                  <View
                    style={[styles.cardAccent, { backgroundColor: f.tint }]}
                  />

                  <View
                    style={[
                      styles.iconWrap,
                      { backgroundColor: f.tint + "18" },
                    ]}
                  >
                    <Ionicons name={f.icon} size={26} color={f.tint} />
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{f.title}</Text>
                    <Text style={styles.cardText}>{f.body}</Text>
                  </View>

                  <View
                    style={[
                      styles.cardArrow,
                      { backgroundColor: f.tint + "18" },
                    ]}
                  >
                    <Ionicons name="arrow-forward" size={14} color={f.tint} />
                  </View>
                </View>
              )}
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  hero: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: colors.primary + "25",
    overflow: "hidden",
  },
  heroBlob1: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.primary,
    opacity: 0.08,
  },
  heroBlob2: {
    position: "absolute",
    bottom: -30,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.accent,
    opacity: 0.07,
  },
  heroIconRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: colors.primary + "40",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    backgroundColor: colors.primary + "12",
  },
  heroIconInner: {
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    color: colors.text,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginBottom: 8,
  },
  heroBody: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },
  heroStats: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingTop: 16,
  },
  heroStat: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  heroStatDivider: {
    position: "absolute",
    left: 0,
    width: 1,
    height: 14,
    backgroundColor: colors.divider,
  },
  heroStatLabel: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 0,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    overflow: "hidden",
  },
  cardAccent: {
    width: 3,
    alignSelf: "stretch",
    borderRadius: 2,
    marginRight: 14,
    marginLeft: 2,
    opacity: 0.85,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  cardBody: { flex: 1 },
  cardTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },
  cardText: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 3,
    lineHeight: 18,
  },
  cardArrow: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
});