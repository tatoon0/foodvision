import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, Easing } from 'react-native-reanimated';

const categories = ['가나다순', '품목순', '최신순'];

const FavoritesScreen = () => {
  const [currentCategory, setCurrentCategory] = useState(0);

  const translateX = useSharedValue(0); // 현재 컨테이너
  const prevTranslateX = useSharedValue(-300); // 이전 컨테이너 초기 위치
  const nextTranslateX = useSharedValue(300); // 다음 컨테이너 초기 위치
  const scale = useSharedValue(1); // 확대 효과를 위한 scale 값

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left' && currentCategory < categories.length - 1) {
      runOnJS(setCurrentCategory)(currentCategory + 1);
    } else if (direction === 'right' && currentCategory > 0) {
      runOnJS(setCurrentCategory)(currentCategory - 1);
    }
  };

  const longPressGesture = Gesture.LongPress()
    .onStart(() => {
      scale.value = withTiming(1.1, { duration: 200 });
    })
    .onEnd(() => {
      scale.value = withTiming(1, { duration: 200 });
    });

  const swipeGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      prevTranslateX.value = event.translationX - 300;
      nextTranslateX.value = event.translationX + 300;
    })
    .onEnd((event) => {
      if (event.translationX > 50) {
        translateX.value = withTiming(300, { duration: 600, easing: Easing.out(Easing.cubic) });
        prevTranslateX.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
        runOnJS(handleSwipe)('right');
      } else if (event.translationX < -50) {
        translateX.value = withTiming(-300, { duration: 600, easing: Easing.out(Easing.cubic) });
        nextTranslateX.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
        runOnJS(handleSwipe)('left');
      } else {
        translateX.value = withTiming(0, { duration: 300 });
        prevTranslateX.value = withTiming(-300, { duration: 300 });
        nextTranslateX.value = withTiming(300, { duration: 300 });
      }
    });

  const combinedGesture = Gesture.Simultaneous(longPressGesture, swipeGesture);

  // Animated Styles
  const currentContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: scale.value }],
  }));

  const prevContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: prevTranslateX.value }],
  }));

  const nextContainerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: nextTranslateX.value }],
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>현재 카테고리: {categories[currentCategory]}</Text>
        <View style={styles.swipeWrapper}>
          <GestureDetector gesture={combinedGesture}>
            <Animated.View style={[styles.swipeContainer, currentContainerStyle]}>
              <Text>{categories[currentCategory]}</Text>
            </Animated.View>
          </GestureDetector>
          <Animated.View style={[styles.swipeContainer, prevContainerStyle, { backgroundColor: 'lightgray' }]}>
            <Text>{categories[(currentCategory - 1 + categories.length) % categories.length]}</Text>
          </Animated.View>
          <Animated.View style={[styles.swipeContainer, nextContainerStyle, { backgroundColor: 'lightgray' }]}>
            <Text>{categories[(currentCategory + 1) % categories.length]}</Text>
          </Animated.View>
        </View>
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
  swipeWrapper: {
    position: 'relative',
    width: 300,
    height: 200,
  },
  swipeContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default FavoritesScreen;
