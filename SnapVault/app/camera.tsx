// app/camera.tsx
import { Ionicons } from "@expo/vector-icons";
import {
  CameraType,
  CameraView,
  FlashMode,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { PermissionGate } from "../components/PermissionGate";
import { colors } from "../theme/colors";

const ALBUM_NAME = "SnapVault";

export default function CameraScreen() {
  const [cameraPerm, requestCamera] = useCameraPermissions();
  const [micPerm, requestMic] = useMicrophonePermissions();
  const [mediaPerm, requestMedia] = MediaLibrary.usePermissions();

  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<FlashMode>("off");
  const [mode, setMode] = useState<"picture" | "video">("picture");
  const [isRecording, setIsRecording] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const toggleFacing = () =>
    setFacing((prev) => (prev === "back" ? "front" : "back"));

  const cycleFlash = () =>
    setFlash((prev) =>
      prev === "off" ? "on" : prev === "on" ? "auto" : "off"
    );

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.85,
        skipProcessing: false,
      });
      if (!photo) return;
      setPreview(photo.uri);
    } catch (e) {
      Alert.alert("Could not capture", String(e));
    }
  };

  const startRecording = async () => {
    if (!cameraRef.current || isRecording) return;
    setIsRecording(true);
    try {
      const video = await cameraRef.current.recordAsync({
        maxDuration: 30,
      });
      if (video?.uri) {
        setPreview(video.uri);
      }
    } catch (e) {
      Alert.alert("Recording failed", String(e));
    } finally {
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  const saveToLibrary = async () => {
    if (!preview) return;

    if (!mediaPerm?.granted) {
      const res = await requestMedia();
      if (!res.granted) {
        Alert.alert("Cannot save", "Photo-library permission was denied.");
        return;
      }
    }

    try {
      const asset = await MediaLibrary.createAssetAsync(preview);

      const album = await MediaLibrary.getAlbumAsync(ALBUM_NAME);
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      } else {
        await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset, false);
      }

      Alert.alert("Saved", `Added to the "${ALBUM_NAME}" album.`);
      setPreview(null);
    } catch (e) {
      Alert.alert("Save failed", String(e));
    }
  };

  const discardPreview = () => setPreview(null);

  return (
    <PermissionGate
      isLoading={!cameraPerm}
      isGranted={cameraPerm?.granted ?? false}
      canAskAgain={cameraPerm?.canAskAgain ?? true}
      onRequest={() => requestCamera()}
      icon="camera-outline"
      title="Camera access needed"
      rationale="SnapVault uses the camera to capture photos and videos."
    >
      <PermissionGate
        isLoading={!micPerm}
        isGranted={micPerm?.granted ?? false}
        canAskAgain={micPerm?.canAskAgain ?? true}
        onRequest={() => requestMic()}
        icon="mic-outline"
        title="Microphone access needed"
        rationale="A microphone is required for videos to include audio."
      >
        {preview ? (
          <View style={styles.fill}>
            <Image source={{ uri: preview }} style={styles.fill} />
            <View style={styles.previewBar}>
              <Pressable
                style={[styles.previewBtn, { backgroundColor: colors.danger }]}
                onPress={discardPreview}
              >
                <Ionicons name="trash-outline" size={22} color="#fff" />
                <Text style={styles.previewBtnText}>Discard</Text>
              </Pressable>
              <Pressable
                style={[styles.previewBtn, { backgroundColor: colors.success }]}
                onPress={saveToLibrary}
              >
                <Ionicons name="checkmark" size={22} color="#fff" />
                <Text style={styles.previewBtnText}>Save</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.fill}>
            <CameraView
              ref={cameraRef}
              style={styles.fill}
              facing={facing}
              flash={flash}
              mode={mode}
            />

            <View style={styles.topHud}>
              <Pressable style={styles.hudBtn} onPress={cycleFlash}>
                <Ionicons
                  name={
                    flash === "on"
                      ? "flash"
                      : flash === "auto"
                      ? "flash-outline"
                      : "flash-off"
                  }
                  size={22}
                  color="#fff"
                />
                <Text style={styles.hudText}>{flash.toUpperCase()}</Text>
              </Pressable>

              <View style={styles.modeSwitch}>
                <Pressable
                  onPress={() => setMode("picture")}
                  style={[
                    styles.modeBtn,
                    mode === "picture" && styles.modeBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.modeText,
                      mode === "picture" && styles.modeTextActive,
                    ]}
                  >
                    PHOTO
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setMode("video")}
                  style={[
                    styles.modeBtn,
                    mode === "video" && styles.modeBtnActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.modeText,
                      mode === "video" && styles.modeTextActive,
                    ]}
                  >
                    VIDEO
                  </Text>
                </Pressable>
              </View>

              <Pressable style={styles.hudBtn} onPress={toggleFacing}>
                <Ionicons name="camera-reverse-outline" size={22} color="#fff" />
              </Pressable>
            </View>

            <View style={styles.bottomHud}>
              {mode === "picture" ? (
                <Pressable style={styles.shutter} onPress={takePhoto}>
                  <View style={styles.shutterInner} />
                </Pressable>
              ) : (
                <Pressable
                  style={styles.shutter}
                  onPress={isRecording ? stopRecording : startRecording}
                >
                  <View
                    style={[
                      isRecording ? styles.recordingSquare : styles.recordCircle,
                    ]}
                  />
                </Pressable>
              )}
              {isRecording && (
                <View style={styles.recBadge}>
                  <View style={styles.recDot} />
                  <Text style={styles.recText}>REC</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </PermissionGate>
    </PermissionGate>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: "#000" },

  topHud: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  hudBtn: {
    backgroundColor: colors.overlay,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  hudText: { color: "#fff", fontSize: 11, fontWeight: "700" },

  modeSwitch: {
    flexDirection: "row",
    backgroundColor: colors.overlay,
    borderRadius: 999,
    padding: 4,
  },
  modeBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 999 },
  modeBtnActive: { backgroundColor: "#fff" },
  modeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  modeTextActive: { color: "#000" },

  bottomHud: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  shutter: {
    width: 78,
    height: 78,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  shutterInner: {
    width: 62,
    height: 62,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  recordCircle: {
    width: 56,
    height: 56,
    borderRadius: 999,
    backgroundColor: colors.danger,
  },
  recordingSquare: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  recBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.danger,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginTop: 12,
    gap: 6,
  },
  recDot: { width: 8, height: 8, borderRadius: 999, backgroundColor: "#fff" },
  recText: { color: "#fff", fontSize: 11, fontWeight: "800" },

  previewBar: {
    position: "absolute",
    bottom: 36,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  previewBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
  },
  previewBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});