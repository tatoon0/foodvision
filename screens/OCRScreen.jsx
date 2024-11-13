import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import TextRecognition, { TextRecognitionScript } from '@react-native-ml-kit/text-recognition';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native'; // 네비게이션 추가

const OcrScreen = () => {
  const [ocrResult, setOcrResult] = useState('');
  const cameraRef = useRef(null);
  const navigation = useNavigation(); // 네비게이션 객체

  const handleCapture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: false };
      const data = await cameraRef.current.takePictureAsync(options);
      const uri = data.uri;

      try {
        const result = await TextRecognition.recognize(
          uri,
          TextRecognitionScript.KOREAN
        );

        console.log('OCR Result:', result);
        if (result && result.blocks && result.blocks.length > 0) {
          const recognizedText = result.blocks.map(block => block.text).join('\n');
          setOcrResult(recognizedText);
          navigation.navigate('OCRResultScreen', { ocrResult: recognizedText }); // OCRResultScreen으로 이동
        } else {
          setOcrResult('인식된 텍스트가 없습니다.');
        }
      } catch (error) {
        console.error('Error during OCR:', error);
        setOcrResult('OCR 처리 중 오류 발생');
      }
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
      />
      <CustomButton onPress={handleCapture} backgroundColor="#5370d4" textColor="white" marginTop="10px">
        스캔하기
      </CustomButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
});

export default OcrScreen;