import React from 'react';

// Import required React Native components
import { View, Text, StyleSheet, FlatList, Image, useWindowDimensions, SafeAreaView } from 'react-native';

// Define Flower type
type Flower = {
  id: string;        // Unique ID for each flower
  name: string;      // Flower name
  imageUrl: string;  // Image URL of the flower
};

//  Replace these URLs with your own working image URLs
const FLOWERS: Flower[] = [
  { id: '1', name: 'Rose', imageUrl: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400' },
  { id: '2', name: 'Tulip', imageUrl: 'https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400' },
  { id: '3', name: 'Sunflower', imageUrl: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=400' },
];

// Main Flowers Screen Component
export default function FlowersScreen() {

  // Get screen width for responsive layout
  const { width } = useWindowDimensions();

  // Decide number of columns based on screen width
  let numColumns = width >= 500 ? 3 : width >= 350 ? 2 : 1;

  // Layout spacing values
  const horizontalPadding = 16;
  const gap = 12;

  // Calculate available width for cards
  const availableWidth = width - horizontalPadding * 2;

  // Calculate dynamic card width
  const cardWidth = (availableWidth - (numColumns - 1) * gap) / numColumns;

  // Function to render each flower item
  const renderItem = ({ item }: { item: Flower }) => (
    <View style={[styles.card, { width: cardWidth }]}>
      
      {/* Flower Image */}
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      {/* Text container */}
      <View style={styles.cardTextContainer}>
        
        {/* Flower Name */}
        <Text style={styles.flowerName}>{item.name}</Text>
        
      </View>
    </View>
  );

  return (
    // Safe area for devices (avoids notch overlap)
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Header Title */}
        <Text style={styles.header}> Flower Spot</Text>

        {/* FlatList to display flowers in grid */}
        <FlatList
          data={FLOWERS}                        // Data source
          renderItem={renderItem}               // Item renderer
          keyExtractor={(item) => item.id}      // Unique key
          numColumns={numColumns}               // Dynamic columns
          contentContainerStyle={styles.gridContainer}
          columnWrapperStyle={numColumns > 1 ? styles.rowWrapper : undefined} // Row styling for multiple columns
          showsVerticalScrollIndicator={false}  // Hide scroll bar
          key={numColumns}                      // Re-render when column count changes
        />
      </View>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({

  // Safe area background
  safeArea: { flex: 1, backgroundColor: '#fff9f0' },

  // Main container styling
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },

  // Header styling
  header: { 
    fontSize: 28, 
    fontWeight: '600', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#e6a0b3', 
    backgroundColor: '#ffe8e0', 
    paddingVertical: 12, 
    borderRadius: 30, 
    overflow: 'hidden' 
  },

  // Grid container styling
  gridContainer: { paddingBottom: 20 },

  // Row wrapper for spacing between items
  rowWrapper: { justifyContent: 'space-between', marginBottom: 16 },

  // Card design
  card: { 
    backgroundColor: 'white', 
    borderRadius: 24, 
    overflow: 'hidden', 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 6, 
    elevation: 4, 
    marginBottom: 4 
  },

  // Image styling
  image: { width: '100%', height: 150, resizeMode: 'cover' },

  // Container for text inside card
  cardTextContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    backgroundColor: '#fff' 
  },

  // Flower name text
  flowerName: { fontSize: 16, fontWeight: '600', color: '#b95f7a' },

  // (Optional) emoji styling (not used currently)
  flowerEmoji: { fontSize: 18 },
});