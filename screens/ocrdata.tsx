import AsyncStorage from '@react-native-async-storage/async-storage';

// 한글 초성을 반환하는 함수
export const getGroupKey = (letter) => {
  const initialConsonants = [
    'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
  ];
  const code = letter.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return null; // 한글이 아닌 경우 null 반환
  const index = Math.floor(code / 588);
  return initialConsonants[index];
};

// AsyncStorage에서 OCRData 가져오기
export const loadOCRData = async () => {
  try {
    const storedData = await AsyncStorage.getItem('productData');
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('OCR 데이터 불러오기 오류:', error);
    return {};
  }
};

// AsyncStorage에 OCRData 저장
export const saveOCRData = async (newData) => {
  try {
    const currentData = await loadOCRData();

    // 새 데이터의 초성 그룹 키 계산
    const groupKey = getGroupKey(newData.name.charAt(0));
    if (!groupKey) {
      console.error('유효하지 않은 한글 초성:', newData.name.charAt(0));
      return;
    }

    // 초성 그룹에 새 데이터 추가
    const updatedGroup = [...(currentData[groupKey] || []), newData];
    const updatedData = {
      ...currentData,
      [groupKey]: updatedGroup,
    };

    await AsyncStorage.setItem('productData', JSON.stringify(updatedData));
    console.log('OCR 데이터 저장 완료:', updatedData);
  } catch (error) {
    console.error('OCR 데이터 저장 오류:', error);
  }
};


// // ocrdata.tsx

// export const OCRData = {
//   ㄱ: [
//     {
//       id: '1',
//       name: '감자칩',
//       nutrition: '칼로리: 200kcal, 탄수화물: 20g, 지방: 10g',
//       storage: '서늘한 곳에 보관',
//     },
//     {
//       id: '2',
//       name: '김치',
//       nutrition: '칼로리: 30kcal, 나트륨: 500mg, 비타민C: 10mg',
//       storage: '냉장 보관',
//     },
//   ],
//   ㄴ: [
//     {
//       id: '3',
//       name: '녹차',
//       nutrition: '칼로리: 0kcal, 단백질: 0g',
//       storage: '건조하고 서늘한 곳에 보관',
//     },
//   ],
//   ㄷ: [
//     {
//       id: '4',
//       name: '딸기잼',
//       nutrition: '칼로리: 150kcal, 당류: 25g',
//       storage: '냉장 보관',
//     },
//   ],
//   ㄹ: [
//     {
//       id: '5',
//       name: '라면',
//       nutrition: '칼로리: 500kcal, 나트륨: 1500mg, 탄수화물: 75g',
//       storage: '서늘한 곳에 보관',
//     },
//   ],
//   ㅁ: [
//     {
//       id: '6',
//       name: '머핀',
//       nutrition: '칼로리: 400kcal, 지방: 20g, 당류: 30g',
//       storage: '실온 보관',
//     },
//   ],
//   ㅂ: [
//     {
//       id: '7',
//       name: '버터',
//       nutrition: '칼로리: 720kcal, 지방: 80g',
//       storage: '냉장 보관',
//     },
//   ],
//   ㅅ: [
//     {
//       id: '8',
//       name: '샐러드',
//       nutrition: '칼로리: 50kcal, 식이섬유: 5g',
//       storage: '냉장 보관',
//     },
//   ],
//   ㅇ: [
//     {
//       id: '9',
//       name: '우유',
//       nutrition: '칼로리: 150kcal, 단백질: 8g, 지방: 5g',
//       storage: '냉장 보관',
//     },
//   ],
//   ㅈ: [
//     {
//       id: '10',
//       name: '잼',
//       nutrition: '칼로리: 150kcal, 당류: 25g',
//       storage: '냉장 보관',
//     },
//   ],
// };
