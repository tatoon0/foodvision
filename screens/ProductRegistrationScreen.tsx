import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Voice from '@react-native-voice/voice';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  // 데이터 저장
  const saveToDatabase = async () => {
    try {
      const savedData = {
        productName,
        ocrResult,
      };
      const existingData = JSON.parse(await AsyncStorage.getItem('productData')) || [];
      const updatedData = [...existingData, savedData];

      await AsyncStorage.setItem('productData', JSON.stringify(updatedData));
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
