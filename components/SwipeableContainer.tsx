import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

interface SwipeableContainerProps {
  onSwipe: (direction: 'left' | 'right') => void;
}

const SwipeableContainer: React.FC<SwipeableContainerProps> = ({ onSwipe }) => {
  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX > 50) {
        onSwipe('right'); // 오른쪽으로 스와이프
      } else if (event.translationX < -50) {
        onSwipe('left'); // 왼쪽으로 스와이프
      }
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(300) // 300ms 이상 꾹 누르기
    .onEnd(() => {
      console.log('Long Press Activated');
    });

  const combinedGesture = Gesture.Simultaneous(swipeGesture, longPressGesture);

  return (
    <GestureDetector gesture={combinedGesture}>
      <View style={styles.container}>
        <Text style={styles.text}>꾹 누르고 스와이프하세요</Text>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default SwipeableContainer;
