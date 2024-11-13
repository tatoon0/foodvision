import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomBlock from '../components/CustomBlock';
import parseOCRText from '../utils/parseOCR';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OCRResultScreenProps {
  route: {
    params: {
      ocrResult: string;
    };
  };
  navigation: any; // React Navigation의 navigate를 사용하기 위해 추가
}

const OCRResultScreen: React.FC<OCRResultScreenProps> = ({ route, navigation }) => {
  const { ocrResult } = route.params;
  const [showFullText, setShowFullText] = React.useState(false);

  const handleSaveParsedData = async () => {
  try {
    console.log('OCR Text:', ocrResult); // OCR 텍스트 확인
    const parsedData = parseOCRText(ocrResult); // OCR 텍스트 파싱
    console.log('Parsed Data:', parsedData); // 파싱된 결과 확인

    if (Object.keys(parsedData).length === 0) {
      Alert.alert('경고', '파싱된 데이터가 없습니다.');
      return;
    }

    Alert.alert('파싱 결과', JSON.stringify(parsedData, null, 2), [{ text: '확인' }]);

    await AsyncStorage.setItem('parsedOCRData', JSON.stringify(parsedData));
    navigation.navigate('SavedOCRData', { parsedData });
  } catch (error) {
    console.error('데이터 저장 오류:', error);
    Alert.alert('오류', '데이터 저장에 실패했습니다.');
  }
};


  return (
    <View style={styles.container}>
      {!showFullText ? (
        <>
          <CustomBlock
            title="전체 텍스트 불러오기"
            onPress={() => setShowFullText(true)}
          />
          <CustomBlock
            title="특정 정보 얻기 및 저장"
            onPress={handleSaveParsedData}
          />
        </>
      ) : (
        <ScrollView contentContainerStyle={styles.textContainer}>
          <Text style={styles.resultText}>{ocrResult}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
  },
  textContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
});

export default OCRResultScreen;
