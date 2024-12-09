import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Voice from '@react-native-voice/voice';
import { saveOCRData } from './ocrdata';
import { useNavigation } from '@react-navigation/native';

const ProductRegistrationScreen = ({ route }: { route: any }) => {
  const { ocrResult } = route.params; // OCR 결과 받아오기
  const [productName, setProductName] = useState(''); // 제품명 상태
  const [isListening, setIsListening] = useState(false); // 음성 인식 상태
  const navigation = useNavigation();

  // 시작 음성 인식
  const startListening = () => {
    setIsListening(true);
    Voice.start('ko-KR'); // 한국어 음성 인식
  };

  // 종료 음성 인식
  const stopListening = () => {
    setIsListening(false);
    Voice.stop();
  };

  // 음성 결과 처리
  Voice.onSpeechResults = (event) => {
    if (event.value && event.value.length > 0) {
      setProductName(event.value[0]); // 첫 번째 결과를 제품명으로 설정
      stopListening();
    }
  };

  // OCR 데이터 분석 로직
  const parseOCRData = (ocrResult: string, category: string): string => {
    const cleanOCRResult = (text: string) => text.replace(/\s+/g, ' ').replace(/\n/g, ' ').trim();

    const cleanedText = cleanOCRResult(ocrResult);

    switch (category) {
      case 'ingredients': {
        const match = cleanedText.match(/원재료명[|:.\s]*([\s\S]*?)(?=\s(?:밀|우유|대두|땅콩|함유|직사광선))/);
        return match && match[1] ? match[1].trim() : '정보 없음';
      }
      case 'allergens': {
        const allergyKeywords = [
          '계란', '우유', '메밀', '땅콩', '대두', '밀', '잣', '호두',
          '게', '새우', '오징어', '고등어', '조개류', '복숭아', '토마토',
          '닭고기', '돼지고기', '쇠고기', '아황산류',
        ];
        const allergyRegex = new RegExp(`(${allergyKeywords.join('|')})`, 'gi');
        const match = cleanedText.match(/([\s\S]*?)\s*함유/);
        if (match && match[1]) {
          const matches = match[1].match(allergyRegex);
          return matches && matches.length > 0 ? Array.from(new Set(matches)).join(', ') : '정보 없음';
        }
        return '정보 없음';
      }
      case 'nutrition': {
        const nutritionRegex = /(나트륨|탄수화물|당류|지방|트랜스지방|포화지방|콜레스테롤|단백질|칼로리)\s*[0-9]+(\s*[g|mg|kcal|%]?)/gi;
        const matches = cleanedText.match(nutritionRegex);
        return matches && matches.length > 0 ? matches.join(', ').trim() : '정보 없음';
      }
      case 'storage': {
        const storageRegex = /직사광선.*?(진열|교환|보관)/gi;
        const match = cleanedText.match(storageRegex);
        return match && match.length > 0 ? match.join(', ').trim() : '정보 없음';
      }
      default:
        return '정보 없음';
    }
  };

  const saveToDatabase = async () => {
    try {
      const parsedData = {
        name: productName || '제품명 없음',
        ingredients: parseOCRData(ocrResult, 'ingredients'),
        allergens: parseOCRData(ocrResult, 'allergens'),
        nutrition: parseOCRData(ocrResult, 'nutrition'),
        storage: parseOCRData(ocrResult, 'storage'),
      };

      console.log('저장할 데이터:', parsedData);

      // OCR 데이터 저장
      await saveOCRData(parsedData);

      alert('데이터가 저장되었습니다!');
      navigation.goBack(); // 이전 화면으로 돌아가기
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('데이터 저장에 실패했습니다.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>제품명과 OCR 결과 저장</Text>

        {/* OCR 결과 */}
        <Text style={styles.ocrResult}>{ocrResult}</Text>

        {/* 제품명 입력 */}
        <TextInput
          style={styles.input}
          placeholder="제품명을 입력하세요"
          value={productName}
          onChangeText={setProductName}
        />

        {/* 음성 입력 버튼 */}
        <TouchableOpacity style={styles.voiceButton} onPress={isListening ? stopListening : startListening}>
          <Text style={styles.voiceButtonText}>{isListening ? '녹음 중지' : '음성 입력'}</Text>
        </TouchableOpacity>

        {/* 저장 버튼 */}
        <TouchableOpacity style={styles.saveButton} onPress={saveToDatabase}>
          <Text style={styles.saveButtonText}>데이터베이스에 저장</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f3f3',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ocrResult: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  voiceButton: {
    backgroundColor: '#5370d4',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  voiceButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProductRegistrationScreen;

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
// import Voice from '@react-native-voice/voice';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { saveOCRData } from './ocrdata';
// const ProductRegistrationScreen = ({ route }: { route: any }) => {
//   const { ocrResult } = route.params; // OCR 결과 받아오기
//   const [productName, setProductName] = useState(''); // 제품명 상태
//   const [isListening, setIsListening] = useState(false); // 음성 인식 상태
//   const navigation = useNavigation();

//   // 시작 음성 인식
//   const startListening = () => {
//     setIsListening(true);
//     Voice.start('ko-KR'); // 한국어 음성 인식
//   };

//   // 종료 음성 인식
//   const stopListening = () => {
//     setIsListening(false);
//     Voice.stop();
//   };

//   // 음성 결과 처리
//   Voice.onSpeechResults = (event) => {
//     if (event.value && event.value.length > 0) {
//       setProductName(event.value[0]); // 첫 번째 결과를 제품명으로 설정
//       stopListening();
//     }
//   };

//   const saveToDatabase = async () => {
//     try {
//       const newData = {
//         name: productName,
//         ingredients: ocrResult.ingredients || '정보 없음',
//         allergens: ocrResult.allergens || '정보 없음',
//         storage: ocrResult.storage || '정보 없음',
//         nutrition: ocrResult.nutrition || '정보 없음',
//       };
  
//       console.log('저장할 데이터:', newData);
  
//       // OCR 데이터 저장
//       await saveOCRData(newData);
  
//       alert('데이터가 저장되었습니다!');
//       navigation.goBack(); // 이전 화면으로 돌아가기
//     } catch (error) {
//       console.error('저장 중 오류 발생:', error);
//       alert('데이터 저장에 실패했습니다.');
//     }
//   };
  
  
//   // 한글 초성을 반환하는 유틸리티 함수
//   const getGroupKey = (letter: string) => {
//     const initialConsonants = [
//       'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
//     ];
//     const code = letter.charCodeAt(0) - 0xac00; // 한글 유니코드 시작점 기준으로 계산
//     if (code < 0 || code > 11171) return letter; // 한글이 아닌 경우 그대로 반환
//     const index = Math.floor(code / 588); // 초성 인덱스 계산
//     return initialConsonants[index] || letter; // 초성 반환
//   };
  

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <View style={styles.container}>
//         <Text style={styles.title}>제품명과 OCR 결과 저장</Text>

//         {/* OCR 결과 */}
//         <Text style={styles.ocrResult}>{ocrResult}</Text>

//         {/* 제품명 입력 */}
//         <TextInput
//           style={styles.input}
//           placeholder="제품명을 입력하세요"
//           value={productName}
//           onChangeText={setProductName}
//         />

//         {/* 음성 입력 버튼 */}
//         <TouchableOpacity style={styles.voiceButton} onPress={isListening ? stopListening : startListening}>
//           <Text style={styles.voiceButtonText}>{isListening ? '녹음 중지' : '음성 입력'}</Text>
//         </TouchableOpacity>

//         {/* 저장 버튼 */}
//         <TouchableOpacity style={styles.saveButton} onPress={saveToDatabase}>
//           <Text style={styles.saveButtonText}>데이터베이스에 저장</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f3f3f3',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   ocrResult: {
//     fontSize: 16,
//     marginBottom: 20,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   voiceButton: {
//     backgroundColor: '#5370d4',
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//   },
//   voiceButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     padding: 15,
//     borderRadius: 5,
//   },
//   saveButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default ProductRegistrationScreen;
