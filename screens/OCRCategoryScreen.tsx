import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OCRCategoryScreen = ({ route }: { route: any }) => {
  const { ocrResult } = route.params;
  const navigation = useNavigation();

  const cleanOCRResult = (text) => {
    return text
      .replace(/\s+/g, ' ') // 여러 공백을 하나로 통합
      .replace(/\n/g, ' ') // 줄바꿈 제거
      .trim();
  };
  const parseOCRData = (ocrResult: string, category: string): string => {
    const cleanedText = cleanOCRResult(ocrResult);
  
    switch (category) {
      case 'ingredients': {
        // '원재료명' 이후부터 '함유' 또는 알레르기 키워드 이전까지 추출
        const match = cleanedText.match(/원재료명[|:.\s]*([\s\S]*?)(?=\s(?:밀|우유|대두|땅콩|함유|직사광선))/);
        return match && match[1] ? match[1].trim() : '정보를 찾을 수 없습니다.';
      }
      case 'allergy': {
        // 알레르기 키워드와 '함유' 사이의 텍스트에서 키워드만 추출
        const allergyKeywords = ['계란', '우유', '메밀', '땅콩', '대두', '밀', '잣', '호두', '게', '새우', '오징어', '고등어', '조개류', '복숭아', '토마토', '닭고기', '돼지고기', '쇠고기', '아황산류'];
        const allergyRegex = new RegExp(`(${allergyKeywords.join('|')})`, 'gi');
        
        // '함유' 이전의 텍스트 추출
        const match = cleanedText.match(/([\s\S]*?)\s*함유/);
        console.log('Cleaned Text:', cleanedText); // Log the cleaned OCR result
        console.log('Matched Text Before 함유:', match ? match[1] : 'No Match Found'); // Log the match before '함유'
  
        if (match && match[1]) {
          // '함유' 이전 텍스트에서 알레르기 키워드만 추출
          const allergyMatches = match[1].match(allergyRegex);
          console.log('Allergy Matches:', allergyMatches); // Log the extracted allergy matches
          return allergyMatches && allergyMatches.length > 0
            ? Array.from(new Set(allergyMatches)).join(', ')
            : '정보를 찾을 수 없습니다.';
        }
        return '정보를 찾을 수 없습니다.';
      }
      case 'nutrition': {
        // 영양정보 추출: 키워드와 숫자/단위를 포함한 텍스트 추출
        const nutritionRegex = /(나트륨|탄수화물|당류|지방|트랜스지방|포화지방|콜레스테롤|단백질|총 내용량|칼로리)\s*[0-9]+(\s*[g|mg|kcal|%]?)/gi;
        const matches = cleanedText.match(nutritionRegex);
        return matches && matches.length > 0 ? matches.join(', ').trim() : '정보를 찾을 수 없습니다.';
      }
      case 'storage': {
        // 보관방법 추출: '직사광선'부터 '진열', '교환', 또는 '보관'까지 추출
        const storageRegex = /직사광선.*?(진열|교환|보관)/gi;
        const match = cleanedText.match(storageRegex);
        return match && match.length > 0 ? match.join(', ').trim() : '정보를 찾을 수 없습니다.';
      }
      default:
        return '정보를 찾을 수 없습니다.';
    }
  };
  

  const categories = [
    { id: 'ingredients', title: '원재료명' },
    { id: 'allergy', title: '알레르기 성분' },
    { id: 'nutrition', title: '영양정보' },
    { id: 'storage', title: '보관방법' },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => {
              const parsedData = parseOCRData(ocrResult, item.id);
              navigation.navigate('ParsedDataScreen', {
                title: item.title,
                data: parsedData,
              });
            }}
          >
            <Text style={styles.categoryText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  categoryButton: {
    backgroundColor: '#5370d4',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default OCRCategoryScreen;
