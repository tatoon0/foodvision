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
import { OCRData } from '../ocrdata';

const screenHeight = Dimensions.get('window').height; // 화면 높이

const ProductListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const products = OCRData[category]; // 해당 카테고리의 제품 데이터
  const [focusedProduct, setFocusedProduct] = useState(null); // 현재 focus된 제품
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태 확인

  const announce = (message) => {
    AccessibilityInfo.announceForAccessibility(message);
    Tts.speak(message);
  };

  const handleTouchStart = () => {
    setIsDragging(true); // 드래그 시작
    announce('탐색을 시작합니다. 손가락을 움직여 제품을 선택하세요.');
    Vibration.vibrate(100);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;

    const y = event.nativeEvent.pageY; // 화면 전체에서의 Y 좌표
    const itemHeight = screenHeight / products.length; // 각 제품 항목의 높이를 화면에 맞게 계산
    const index = Math.floor(y / itemHeight); // Y 좌표를 기반으로 현재 인덱스 계산

    if (index >= 0 && index < products.length) {
      const product = products[index];
      if (product !== focusedProduct) {
        setFocusedProduct(product); // focus된 제품 업데이트
        announce(`${product.name}`); // 음성 출력
        Vibration.vibrate(30); // 진동 피드백
      }
    }
  };

  const handleTouchEnd = () => {
    if (focusedProduct) {
      announce(`${focusedProduct.name}를 선택했습니다.`);
      navigation.navigate('ProductDetail', { product: focusedProduct });
    }
    setIsDragging(false); // 드래그 종료
  };

  const renderProduct = (product) => (
    <View
      key={product.id}
      style={[
        styles.productItem,
        focusedProduct === product && styles.focusedProduct, // focus된 제품 강조
      ]}
    >
      <Text style={styles.productText}>{product.name}</Text>
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
      {products.map((product) => renderProduct(product))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  productItem: {
    height: screenHeight / 12, // 각 항목의 높이 설정
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 5,
  },
  focusedProduct: {
    backgroundColor: '#d0f0d0', // focus된 제품 강조 색상
  },
  productText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductListScreen;
