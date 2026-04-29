// DraggableCard.tsx
import React, { useRef } from 'react';
import { Animated, PanResponder, View, Text, StyleSheet } from 'react-native';

const DraggableCard: React.FC = () => {
  // Stores the card's current position
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  // Stores the position at the START of each drag (so we can calculate correctly)
  
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      // When drag starts, "extract" the current animated value into a plain number
      // so we can add the delta to it
      position.extractOffset();
    },

    onPanResponderMove: Animated.event(
      // Animated.event automatically links gestureState.dx to position.x
      // and gestureState.dy to position.y — no manual calculation needed!
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false } // Animated.event with ValueXY needs false
    ),

    onPanResponderRelease: (_, gestureState) => {
      // When released, check if user swiped far enough to dismiss
      if (Math.abs(gestureState.dx) > 150) {
        // Fling the card off screen
        Animated.timing(position, {
          toValue: { x: gestureState.dx > 0 ? 500 : -500, y: gestureState.dy },
          duration: 250,
          useNativeDriver: false,
        }).start();
      } else {
        // Snap back to center
        position.flattenOffset();
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  // Rotate based on horizontal position (like Tinder cards!)
  const rotate = position.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-15deg', '0deg', '15deg'],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: rotate },
            ],
          },
        ]}
      >
        <Text style={styles.emoji}>🏠</Text>
        <Text style={styles.title}>Greenwood Villa</Text>
        <Text style={styles.subtitle}>₹45,000/month • 3 BHK</Text>
        <Text style={styles.hint}>← Drag to dismiss →</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  card: {
    width: 300,
    height: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  emoji: { fontSize: 60, marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#1A1A2E' },
  subtitle: { fontSize: 15, color: '#666', marginTop: 6 },
  hint: { position: 'absolute', bottom: 20, fontSize: 13, color: '#AAA' },
});

export default DraggableCard;