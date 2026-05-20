// app/picker.tsx
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../theme/colors";

export default function PickerScreen() {
  const [picked, setPicked] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const pickOne = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPicked(result.assets);
    }
  };

  const pickMany = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsMultipleSelection: true,
      selectionLimit: 6,
      quality: 0.8,
    });
    if (!result.canceled) {
      setPicked(result.assets);
    }
  };

  const takeWithSystemCamera = async () => {
    const camPerm = await ImagePicker.requestCameraPermissionsAsync();
    if (!camPerm.granted) {
      Alert.alert("Permission needed", "Camera access was denied.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled) {
      setPicked(result.assets);
    }
  };

  return (
    <ScreenContainer
      title="Image Picker"
      subtitle="System UI for selecting or capturing media"
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.actions}>
          <ActionButton
            icon="image-outline"
            label="Pick one (with crop)"
            color={colors.primary}
            onPress={pickOne}
          />
          <ActionButton
            icon="images-outline"
            label="Pick many"
            color={colors.accent}
            onPress={pickMany}
          />
          <ActionButton
            icon="camera-outline"
            label="System camera"
            color={colors.success}
            onPress={takeWithSystemCamera}
          />
        </View>

        {picked.length > 0 && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>
              {picked.length} item{picked.length === 1 ? "" : "s"} selected
            </Text>
            <View style={styles.grid}>
              {picked.map((asset) => (
                <View key={asset.uri} style={styles.tile}>
                  <Image source={{ uri: asset.uri }} style={styles.tileImg} />
                  <Text style={styles.tileMeta} numberOfLines={1}>
                    {asset.width} × {asset.height}
                    {asset.fileSize
                      ? ` · ${(asset.fileSize / 1024).toFixed(0)} KB`
                      : ""}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

function ActionButton({
  icon,
  label,
  color,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.action,
        { borderColor: color },
        pressed && { backgroundColor: color + "15" },
      ]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={26} color={color} />
      <Text style={[styles.actionText, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  actions: { gap: 12 },
  action: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    padding: 16,
    borderRadius: 14,
    gap: 14,
  },
  actionText: { fontSize: 15, fontWeight: "700" },

  results: { marginTop: 28 },
  resultsTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tile: {
    width: "48%",
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.divider,
  },
  tileImg: { width: "100%", aspectRatio: 1, backgroundColor: "#000" },
  tileMeta: {
    color: colors.textMuted,
    fontSize: 11,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
});