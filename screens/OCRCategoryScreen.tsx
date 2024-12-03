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
    let match;

    switch (category) {
      case 'ingredients': {
        // 원재료명 추출
        match = cleanedText.match(/원재료명\s([\s\S]*?)\s(?:밀|우유|대두|땅콩).*?함유/);
        return match && match[1] ? match[1].trim() : '정보를 찾을 수 없습니다.';
      }
      case 'allergy': {
        // 알레르기 성분 추출
        match = cleanedText.match(/(?:밀|우유|대두|땅콩).*?함유/);
        return match ? match[0].trim() : '정보를 찾을 수 없습니다.';
      }
      case 'nutrition': {
        // 영양정보 추출
        const allergyMatch = cleanedText.match(/(?:밀|우유|대두|땅콩).*?함유/);
        const allergyEndIndex = allergyMatch ? cleanedText.indexOf(allergyMatch[0]) : -1;
        if (allergyEndIndex !== -1) {
          const nutritionText = cleanedText.slice(0, allergyEndIndex);
          return nutritionText ? nutritionText.trim() : '정보를 찾을 수 없습니다.';
        }
        return '정보를 찾을 수 없습니다.';
      }
      case 'storage': {
        // 보관방법 추출
        match = cleanedText.match(/직사광선.*?교환/);
        return match ? match[0].trim() : '정보를 찾을 수 없습니다.';
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
