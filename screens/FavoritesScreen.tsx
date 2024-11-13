import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';

const categories = ['가나다순', '품목순', '최신순'];

const FavoritesScreen = () => {
  const [currentCategory, setCurrentCategory] = useState(0);
  const translateX = useSharedValue(0); // 슬라이딩 애니메이션을 위한 translateX 값
  const scale = useSharedValue(1); // 확대 효과를 위한 scale 값

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      translateX.value = withTiming(-300, { duration: 300 }, () => {
        runOnJS(setCurrentCategory)((currentCategory + 1) % categories.length); // 다음 카테고리로 순환
        translateX.value = 300; // 다음 페이지로 이동 후 초기화
        translateX.value = withTiming(0, { duration: 300 }); // 원래 위치로 부드럽게 복귀
      });
    } else if (direction === 'right') {
      translateX.value = withTiming(300, { duration: 300 }, () => {
        runOnJS(setCurrentCategory)(
          (currentCategory - 1 + categories.length) % categories.length // 이전 카테고리로 순환
        );
        translateX.value = -300; // 이전 페이지로 이동 후 초기화
        translateX.value = withTiming(0, { duration: 300 }); // 원래 위치로 부드럽게 복귀
      });
    }
  };

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      scale.value = withSpring(1.1); // 확대 효과
    })
    .onEnd(() => {
      scale.value = withSpring(1); // 원래 크기로 복구
    });

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX; // 스와이프 시 실시간 이동
    })
    .onEnd((event) => {
      if (event.translationX > 50) {
        runOnJS(handleSwipe)('right');
      } else if (event.translationX < -50) {
        runOnJS(handleSwipe)('left');
      } else {
        translateX.value = withTiming(0); // 기준치 미만 이동 시 복귀
      }
    });

  const combinedGesture = Gesture.Simultaneous(longPressGesture, swipeGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value }, // 스와이프에 따른 좌우 슬라이딩
        { scale: scale.value }, // 꾹 누르기 확대 효과
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>현재 카테고리: {categories[currentCategory]}</Text>
        <GestureDetector gesture={combinedGesture}>
          <Animated.View style={[styles.swipeArea, animatedStyle]}>
            <Text>길게 누르고 스와이프하세요</Text>
            <Text style={styles.header}>{categories[currentCategory]}</Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  swipeArea: {
    width: 300,
    height: 400,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default FavoritesScreen;
