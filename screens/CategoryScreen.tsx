import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Vibration,
  AccessibilityInfo,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadOCRData } from './ocrdata';

const screenHeight = Dimensions.get('window').height; // 화면 높이 계산
const initialConsonants = [
  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
];

const CategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [focusedCategory, setFocusedCategory] = useState(null); // 포커스된 카테고리
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태 확인

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const data = await loadOCRData();
    const availableCategories = initialConsonants.filter((key) => data[key] && data[key].length > 0);
    setCategories(availableCategories);
  };

  const announce = (message) => {
    AccessibilityInfo.announceForAccessibility(message);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
    announce('카테고리 탐색을 시작합니다. 손가락을 움직여 선택하세요.');
    Vibration.vibrate(100);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;

    const y = event.nativeEvent.pageY; // 터치된 Y 좌표
    const itemHeight = screenHeight / categories.length; // 각 카테고리 높이를 화면에 맞게 계산
    const index = Math.floor(y / itemHeight); // 현재 선택된 카테고리 인덱스 계산

    if (index >= 0 && index < categories.length) {
      const category = categories[index];
      if (category !== focusedCategory) {
        setFocusedCategory(category); // 포커스된 카테고리 업데이트
        announce(`${category} 카테고리 선택됨`);
        Vibration.vibrate(30); // 진동 피드백
      }
    }
  };

  const handleTouchEnd = () => {
    if (focusedCategory) {
      announce(`${focusedCategory}로 이동합니다.`);
      navigation.navigate('ProductList', { category: focusedCategory });
    }
    setIsDragging(false);
  };

  const handleResetDatabase = async () => {
    Alert.alert(
      '초기화 확인',
      '데이터베이스의 모든 데이터를 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('productData'); // 데이터베이스 초기화
              setCategories([]); // 카테고리 목록 비우기
              announce('데이터베이스가 초기화되었습니다.');
              Alert.alert('초기화 완료', '데이터베이스가 초기화되었습니다.');
            } catch (error) {
              console.error('데이터 초기화 오류:', error);
              Alert.alert('초기화 실패', '데이터를 초기화하는 중 오류가 발생했습니다.');
            }
          },
        },
      ]
    );
  };

  const renderCategory = (category) => (
    <View
      key={category}
      style={[
        styles.categoryItem,
        focusedCategory === category && styles.focusedCategory, // 선택된 카테고리 강조
      ]}
    >
      <Text style={styles.categoryText}>{category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.resetButton} onPress={handleResetDatabase}>
        <Text style={styles.resetButtonText}>초기화</Text>
      </TouchableOpacity>
      <ScrollView
        style={styles.scrollContainer}
        onTouchStart={handleTouchStart} // 드래그 시작
        onTouchMove={handleTouchMove} // 드래그 중
        onTouchEnd={handleTouchEnd} // 드래그 종료
        scrollEnabled={!isDragging} // 드래그 중에는 스크롤 비활성화
      >
        {categories.length > 0 ? (
          categories.map((category) => renderCategory(category))
        ) : (
          <Text style={styles.noDataText}>카테고리가 없습니다.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContainer: {
    flex: 1,
    marginTop: 10,
  },
  resetButton: {
    alignSelf: 'center',
    backgroundColor: '#ff6b6b',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryItem: {
    height: screenHeight / 12, // 카테고리 항목 높이
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginHorizontal: 16,
    marginVertical: 5,
  },
  focusedCategory: {
    backgroundColor: '#d0f0d0', // 포커스된 카테고리 강조 색상
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CategoryScreen;


// import React, { useState, useEffect } from 'react';
// import { ScrollView, View, Text, StyleSheet, Vibration, AccessibilityInfo, Dimensions } from 'react-native';
// import Tts from 'react-native-tts';
// import { loadOCRData } from './ocrdata'; // OCRData 로드 함수 가져오기

// const screenHeight = Dimensions.get('window').height;

// const CategoryScreen = ({ navigation }) => {
//   const [categories, setCategories] = useState([]); // 카테고리 목록 상태
//   const [focusedCategory, setFocusedCategory] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);

//   // 데이터 로드
//   useEffect(() => {
//     const fetchCategories = async () => {
//       const data = await loadOCRData();
//       if (data && typeof data === 'object') {
//         setCategories(Object.keys(data)); // 유효한 데이터의 키를 카테고리로 설정
//       } else {
//         setCategories([]); // 데이터가 없으면 빈 배열로 설정
//       }
//     };

//     fetchCategories();
//   }, []);

//   const announce = (message) => {
//     AccessibilityInfo.announceForAccessibility(message);
//     Tts.speak(message);
//   };

//   const handleTouchStart = () => {
//     setIsDragging(true);
//     announce('탐색을 시작합니다. 손가락을 움직여 카테고리를 선택하세요.');
//     Vibration.vibrate(100);
//   };

//   const handleTouchMove = (event) => {
//     if (!isDragging) return;

//     const y = event.nativeEvent.pageY;
//     const itemHeight = screenHeight / categories.length;
//     const index = Math.floor(y / itemHeight);

//     if (index >= 0 && index < categories.length) {
//       const category = categories[index];
//       if (category !== focusedCategory) {
//         setFocusedCategory(category);
//         announce(`${category} 카테고리`);
//         Vibration.vibrate(30);
//       }
//     }
//   };

//   const handleTouchEnd = () => {
//     if (focusedCategory) {
//       announce(`${focusedCategory} 카테고리로 이동합니다.`);
//       navigation.navigate('ProductList', { category: focusedCategory });
//     }
//     setIsDragging(false);
//   };

//   const renderCategory = (category) => (
//     <View
//       key={category}
//       style={[
//         styles.categoryItem,
//         focusedCategory === category && styles.focusedCategory,
//       ]}
//     >
//       <Text style={styles.categoryText}>{category}</Text>
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
//       {categories.length > 0 ? (
//         categories.map((category) => renderCategory(category))
//       ) : (
//         <Text style={styles.noDataText}>데이터가 없습니다.</Text>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   categoryItem: {
//     height: screenHeight / 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     marginHorizontal: 16,
//     marginVertical: 5,
//   },
//   focusedCategory: {
//     backgroundColor: '#d0f0d0',
//   },
//   categoryText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   noDataText: {
//     fontSize: 18,
//     color: '#999',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });

// export default CategoryScreen;
