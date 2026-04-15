import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions, SafeAreaView } from 'react-native';

type Flower = {
  id: string;
  name: string;
  imageUrl: string;
};

//  Replace these URLs with your own working image URLs
const FLOWERS: Flower[] = [
  { id: '1', name: 'Rose', imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400' },
  { id: '2', name: 'Tulip', imageUrl: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400' },
  { id: '3', name: 'Sunflower', imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400' },
];

export default function FlowersScreen() {
  const { width } = useWindowDimensions();
  let numColumns = width >= 500 ? 3 : width >= 350 ? 2 : 1;
  const horizontalPadding = 16;
  const gap = 12;
  const availableWidth = width - horizontalPadding * 2;
  const cardWidth = (availableWidth - (numColumns - 1) * gap) / numColumns;

  const renderItem = ({ item }: { item: Flower }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardTextContainer}>
        <Text style={styles.flowerName}>{item.name}</Text>
        
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}> Flower Spot</Text>
        <FlatList
          data={FLOWERS}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={numColumns > 1 ? styles.rowWrapper : undefined}
          showsVerticalScrollIndicator={false}
          key={numColumns}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff9f0' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },
  header: { fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 20, color: '#e6a0b3', backgroundColor: '#ffe8e0', paddingVertical: 12, borderRadius: 30, overflow: 'hidden' },
  gridContainer: { paddingBottom: 20 },
  rowWrapper: { justifyContent: 'space-between', marginBottom: 16 },
  card: { backgroundColor: 'white', borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 4, marginBottom: 4 },
  image: { width: '100%', height: 150, resizeMode: 'cover' },
  cardTextContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, backgroundColor: '#fff' },
  flowerName: { fontSize: 16, fontWeight: '600', color: '#b95f7a' },
  flowerEmoji: { fontSize: 18 },
});