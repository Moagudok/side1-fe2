import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Loading() {
  const { container } = styles;
  const { loadingText } = styles;
  return (
    <View style={container}>
      <Text style={loadingText}>잠시만 기다려주세요...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Loading;