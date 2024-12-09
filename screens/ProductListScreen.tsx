import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Vibration,
  AccessibilityInfo,
  Dimensions,
} from 'react-native';
import { loadOCRData } from './ocrdata';

const screenHeight = Dimensions.get('window').height; // 화면 높이 계산

const ProductListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [focusedProduct, setFocusedProduct] = useState(null); // 현재 포커스된 상품
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태 확인

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await loadOCRData();
      setProducts(data[category] || []);
    };

    fetchProducts();
  }, [category]);

  const announce = (message) => {
    AccessibilityInfo.announceForAccessibility(message);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
    announce('상품 탐색을 시작합니다. 손가락을 움직여 상품을 선택하세요.');
    Vibration.vibrate(100);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;

    const y = event.nativeEvent.pageY; // 터치된 Y 좌표
    const itemHeight = screenHeight / products.length; // 각 상품 높이를 화면에 맞게 계산
    const index = Math.floor(y / itemHeight); // 현재 선택된 상품의 인덱스 계산

    if (index >= 0 && index < products.length) {
      const product = products[index];
      if (product !== focusedProduct) {
        setFocusedProduct(product); // 포커스된 상품 업데이트
        announce(`${product.name} 선택됨`);
        Vibration.vibrate(30); // 진동 피드백
      }
    }
  };

  const handleTouchEnd = () => {
    if (focusedProduct) {
      announce(`${focusedProduct.name}로 이동합니다.`);
      navigation.navigate('ProductDetail', { product: focusedProduct });
    }
    setIsDragging(false);
  };

  const renderProduct = (product) => (
    <View
      key={product.id}
      style={[
        styles.productItem,
        focusedProduct === product && styles.focusedProduct, // 선택된 상품 강조
      ]}
    >
      <Text style={styles.productName}>{product.name}</Text>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      onTouchStart={handleTouchStart} // 드래그 시작
      onTouchMove={handleTouchMove} // 드래그 중
      onTouchEnd={handleTouchEnd} // 드래그 종료
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
    height: screenHeight / 12, // 상품 항목 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 5,
  },
  focusedProduct: {
    backgroundColor: '#d0f0d0', // 선택된 상품 강조 색상
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ProductListScreen;


// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, Text, StyleSheet } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProductListScreen = ({ route }) => {
//   const { category } = route.params;
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const loadProducts = async () => {
//       try {
//         const storedData = JSON.parse(await AsyncStorage.getItem('productData')) || {};
//         setProducts(storedData[category] || []);
//       } catch (error) {
//         console.error('데이터 불러오기 오류:', error);
//       }
//     };

//     loadProducts();
//   }, [category]);

//   return (
//     <ScrollView style={styles.container}>
//       {products.length > 0 ? (
//         products.map((product) => (
//           <View key={product.id} style={styles.productItem}>
//             <Text style={styles.productName}>{product.name}</Text>
//             <Text>영양정보: {product.nutrition}</Text>
//             <Text>보관방법: {product.storage}</Text>
//           </View>
//         ))
//       ) : (
//         <Text style={styles.noDataText}>해당 카테고리에 제품이 없습니다.</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//   },
//   productItem: {
//     backgroundColor: '#f3f3f3',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   noDataText: {
//     fontSize: 16,
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default ProductListScreen;

// import React, { useState } from 'react';
// import {
//   ScrollView,
//   View,
//   Text,
//   StyleSheet,
//   Vibration,
//   AccessibilityInfo,
//   Dimensions,
// } from 'react-native';
// import Tts from 'react-native-tts';
// import { OCRData } from '../ocrdata';

// const screenHeight = Dimensions.get('window').height;

// const ProductListScreen = ({ route, navigation }) => {
//   const { category } = route.params;
//   const products = OCRData[category];
//   const [focusedProduct, setFocusedProduct] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);

//   const announce = (message) => {
//     Tts.stop(); // 이전 음성 중지
//     AccessibilityInfo.announceForAccessibility(message);
//     Tts.speak(message);
//   };

//   const handleTouchStart = () => {
//     setIsDragging(true);
//     announce('탐색을 시작합니다. 손가락을 움직여 제품을 선택하세요.');
//     Vibration.vibrate(100);
//   };

//   const handleTouchMove = (event) => {
//     if (!isDragging) return;

//     const y = event.nativeEvent.pageY;
//     const itemHeight = screenHeight / products.length;
//     const index = Math.floor(y / itemHeight);

//     if (index >= 0 && index < products.length) {
//       const product = products[index];
//       if (product !== focusedProduct) {
//         setFocusedProduct(product);
//         announce(`${product.name}`);
//         Vibration.vibrate(30);
//       }
//     }
//   };

//   const handleTouchEnd = () => {
//     if (focusedProduct) {
//       announce(`${focusedProduct.name}를 선택했습니다.`);
//       navigation.navigate('ProductDetail', { product: focusedProduct });
//     }
//     setIsDragging(false);
//   };

//   const renderProduct = (product) => (
//     <View
//       key={product.id}
//       style={[
//         styles.productItem,
//         focusedProduct === product && styles.focusedProduct,
//       ]}
//     >
//       <Text style={styles.productText}>{product.name}</Text>
//     </View>
//   );

//   return (
//     <ScrollView
//       style={styles.container}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//       scrollEnabled={!isDragging}
//     >
//       {products.map((product) => renderProduct(product))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   productItem: {
//     height: screenHeight / 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//     borderRadius: 10,
//     marginHorizontal: 16,
//     marginVertical: 5,
//   },
//   focusedProduct: {
//     backgroundColor: '#d0f0d0',
//   },
//   productText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
// });

// export default ProductListScreen;
