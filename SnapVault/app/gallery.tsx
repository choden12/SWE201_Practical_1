// app/gallery.tsx
import { Ionicons } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PermissionGate } from "../components/PermissionGate";
import { ScreenContainer } from "../components/ScreenContainer";
import { colors } from "../theme/colors";

const COLUMNS = 3;
const GAP = 2;
const CELL = (Dimensions.get("window").width - GAP * (COLUMNS - 1)) / COLUMNS;
const PAGE_SIZE = 60;

export default function GalleryScreen() {
  const [perm, requestPerm] = MediaLibrary.usePermissions();
  const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
  const [endCursor, setEndCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadPage = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const page = await MediaLibrary.getAssetsAsync({
        mediaType: ["photo"],
        first: PAGE_SIZE,
        after: endCursor,
        sortBy: [MediaLibrary.SortBy.creationTime],
      });

      setAssets((prev) => [...prev, ...page.assets]);
      setEndCursor(page.endCursor);
      setHasMore(page.hasNextPage);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, endCursor]);

  useEffect(() => {
    if (perm?.granted && assets.length === 0) {
      loadPage();
    }
  }, [perm?.granted]);

  return (
    <ScreenContainer
      title="Photo Library"
      subtitle={
        perm?.granted
          ? `Showing ${assets.length} photo${assets.length === 1 ? "" : "s"}`
          : "Permission required"
      }
    >
      <PermissionGate
        isLoading={!perm}
        isGranted={perm?.granted ?? false}
        canAskAgain={perm?.canAskAgain ?? true}
        onRequest={() => requestPerm()}
        icon="images-outline"
        title="Photo library access"
        rationale="SnapVault needs to read your photo library so you can see your existing photos."
      >
        {assets.length === 0 && !loading ? (
          <View style={styles.empty}>
            <View style={styles.emptyIconRing}>
              <Ionicons name="image-outline" size={28} color={colors.accent} />
            </View>
            <Text style={styles.emptyTitle}>No photos yet</Text>
            <Text style={styles.emptyText}>No photos found on this device.</Text>
          </View>
        ) : (
          <FlatList
            data={assets}
            keyExtractor={(item) => item.id}
            numColumns={COLUMNS}
            renderItem={({ item }) => (
              <Pressable style={styles.cell}>
                <Image source={{ uri: item.uri }} style={styles.thumb} />
              </Pressable>
            )}
            onEndReached={loadPage}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading ? (
                <View style={styles.footer}>
                  <ActivityIndicator color={colors.primary} />
                </View>
              ) : !hasMore && assets.length > 0 ? (
                <Text style={styles.footerText}>
                  End of library ({assets.length} photos)
                </Text>
              ) : null
            }
          />
        )}
      </PermissionGate>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: CELL,
    height: CELL,
    marginRight: GAP,
    marginBottom: GAP,
  },
  thumb: { width: "100%", height: "100%", backgroundColor: colors.surface },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 40,
  },
  emptyIconRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.accent + "40",
    backgroundColor: colors.accent + "12",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  footer: { paddingVertical: 24, alignItems: "center" },
  footerText: {
    color: colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    paddingVertical: 16,
  },
});