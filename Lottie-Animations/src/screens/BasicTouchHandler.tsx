// BasicTouchHandler.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BasicTouchHandler: React.FC = () => {
  const [status, setStatus] = useState('Waiting for touch...');
  const [touchPos, setTouchPos] = useState({ x: 0, y: 0 });

  return (
    <View
      style={styles.touchArea}
      // Claim the touch when finger is placed
      onStartShouldSetResponder={() => true}
      // Called when this component "wins" the touch — it can now respond
      onResponderGrant={(event) => {
        setStatus('Touch started!');
        setTouchPos({
          x: Math.round(event.nativeEvent.locationX),
          y: Math.round(event.nativeEvent.locationY),
        });
      }}
      // Called for every move event
      onResponderMove={(event) => {
        setStatus('Moving...');
        setTouchPos({
          x: Math.round(event.nativeEvent.locationX),
          y: Math.round(event.nativeEvent.locationY),
        });
      }}
      // Called when finger is lifted
      onResponderRelease={() => {
        setStatus('Released!');
      }}
    >
      <Text style={styles.statusText}>{status}</Text>
      <Text style={styles.posText}>
        x: {touchPos.x}, y: {touchPos.y}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  touchArea: {
    width: 300,
    height: 200,
    backgroundColor: '#E8F0FE',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    borderWidth: 2,
    borderColor: '#4A90E2',
    borderStyle: 'dashed',
  },
  statusText: { fontSize: 18, fontWeight: '600', color: '#333' },
  posText: { fontSize: 14, color: '#666', marginTop: 8 },
});

export default BasicTouchHandler;