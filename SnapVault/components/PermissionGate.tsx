// components/PermissionGate.tsx
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

interface PermissionGateProps {
  isLoading: boolean;
  isGranted: boolean;
  canAskAgain: boolean;
  onRequest: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  rationale: string;
  children: ReactNode;
}

export function PermissionGate({
  isLoading,
  isGranted,
  canAskAgain,
  onRequest,
  icon,
  title,
  rationale,
  children,
}: PermissionGateProps) {
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (isGranted) {
    return <>{children}</>;
  }

  return (
    <View style={styles.center}>
      <View style={styles.iconRing}>
        <Ionicons name={icon} size={40} color={colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rationale}>{rationale}</Text>
      <Pressable style={styles.button} onPress={onRequest}>
        <Text style={styles.buttonText}>
          {canAskAgain ? "Grant Access" : "Open Settings"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
  iconRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.primary + "40",
    backgroundColor: colors.primary + "12",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  rationale: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 999,
    marginTop: 16,
  },
  buttonText: {
    color: colors.bg,
    fontSize: 16,
    fontWeight: "700",
  },
});