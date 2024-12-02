import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Vibration,
  AccessibilityInfo,
  Dimensions,
} from 'react-native';
import Tts from 'react-native-tts';
import { OCRData } from '../ocrdata'; // OCRData 가져오기

const screenHeight = Dimensions.get('window').height; // 화면 높이

const CategoryScreen = ({ navigation }) => {
  const categories = Object.keys(OCRData); // OCRData의 키를 동적으로 가져와 카테고리 배열 생성
  const [focusedCategory, setFocusedCategory] = useState(null); // 현재 focus된 카테고리
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태 확인

  const announce = (message) => {
    AccessibilityInfo.announceForAccessibility(message);
    Tts.speak(message);
  };

  const handleTouchStart = () => {
    setIsDragging(true); // 드래그 시작
    announce('탐색을 시작합니다. 손가락을 움직여 카테고리를 선택하세요.');
    Vibration.vibrate(100);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;

    const y = event.nativeEvent.pageY; // 화면 전체에서의 Y 좌표
    const itemHeight = screenHeight / categories.length; // 각 카테고리 높이를 화면에 맞게 계산
    const index = Math.floor(y / itemHeight); // Y 좌표를 기반으로 현재 인덱스 계산

    if (index >= 0 && index < categories.length) {
      const category = categories[index];
      if (category !== focusedCategory) {
        setFocusedCategory(category); // focus된 카테고리 업데이트
        announce(`${category} 카테고리`); // 음성 출력
        Vibration.vibrate(30); // 진동 피드백
      }
    }
  };

  const handleTouchEnd = () => {
    if (focusedCategory) {
      announce(`${focusedCategory} 카테고리로 이동합니다.`);
      navigation.navigate('ProductList', { category: focusedCategory });
    }
    setIsDragging(false); // 드래그 종료
  };

  const renderCategory = (category) => (
    <View
      key={category}
      style={[
        styles.categoryItem,
        focusedCategory === category && styles.focusedCategory, // focus된 카테고리 강조
      ]}
    >
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      onTouchStart={handleTouchStart} // 손가락 누름 감지
      onTouchMove={handleTouchMove} // 손가락 움직임 감지
      onTouchEnd={handleTouchEnd} // 손가락 뗌 감지
      scrollEnabled={!isDragging} // 드래그 중에는 스크롤 비활성화
    >
      {categories.map((category) => renderCategory(category))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  categoryItem: {
    height: screenHeight / 12, // 각 항목의 높이 설정
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 5,
  },
  focusedCategory: {
    backgroundColor: '#d0f0d0', // focus된 카테고리 강조 색상
  },
  categoryText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default CategoryScreen;
