import React, { useState, useRef } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { NativeModules } from 'react-native';

const { MLKitObjectDetection } = NativeModules;

const OcrScreen = () => {
  const cameraRef = useRef(null);
  const [detectedObjects, setDetectedObjects] = useState([]);
  const [message, setMessage] = useState('');

  const handleObjectDetection = async () => {
    if (cameraRef.current) {
      const options = { quality: 1.0, base64: true };
  
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        const objects = await MLKitObjectDetection.detectObjects(data.base64);
  
        if (objects.length === 0) {
          console.log('No objects detected');
          setDetectedObjects([]);
          setMessage('객체가 감지되지 않았습니다. 다시 시도해주세요.');
          return;
        }
  
        const cameraWidth = 640;
        const cameraHeight = 480; // ML Kit 기준
        const screenWidth = Dimensions.get('window').width;
        const screenHeight = Dimensions.get('window').height;
  
        const scaleX = screenWidth / cameraHeight; // 가로 세로 변경
        const scaleY = screenHeight / cameraWidth;
  
        const transformedObjects = objects.map((object) => {
          const originalBox = object.boundingBox;
  
          // 기존 좌표 변환 로직
          const rotatedLeft = originalBox.top; // Y값 → X값
          const rotatedTop = cameraWidth - originalBox.right; // 반대쪽 X축
          const rotatedRight = originalBox.bottom; // Y값 → X값
          const rotatedBottom = cameraWidth - originalBox.left; // 반대쪽 X축
  
          const boxWidth = rotatedRight - rotatedLeft;
          const boxHeight = rotatedBottom - rotatedTop;
  
          if (boxWidth < 20 || boxHeight < 20) {
            console.log('Object too small, ignoring...');
            return null;
          }
  
          const left = rotatedLeft * scaleX;
          const top = rotatedTop * scaleY;
          const width = boxWidth * scaleX;
          const height = boxHeight * scaleY;
          const centerX = left + width / 2;
          const centerY = top + height / 2;
  
          return {
            left,
            top,
            width,
            height,
            centerX,
            centerY,
          };
        }).filter(Boolean);
  
        setDetectedObjects(transformedObjects);
  
        if (transformedObjects.length > 0) {
          const screenCenterX = screenWidth / 2;
          const screenCenterY = screenHeight / 2;
          const firstObject = transformedObjects[0];
  
          // 객체 중심과 화면 중심 비교
          const horizontalOffset = firstObject.centerX - screenCenterX; // X축 오프셋
          const verticalOffset = firstObject.centerY - screenCenterY; // Y축 오프셋
  
          // 오차 범위 설정
          const offsetThresholdX = screenWidth * 0.1; // 가로 방향 오차 범위 (10%)
          const offsetThresholdY = screenHeight * 0.1; // 세로 방향 오차 범위 (10%)
  
          // 치우침 판단
          if (horizontalOffset < -offsetThresholdX) {
            setMessage(`카메라가 왼쪽으로 ${Math.abs(horizontalOffset).toFixed(1)} 만큼 치우쳤습니다. 오른쪽으로 이동하세요.`);
          } else if (horizontalOffset > offsetThresholdX) {
            setMessage(`카메라가 오른쪽으로 ${horizontalOffset.toFixed(1)} 만큼 치우쳤습니다. 왼쪽으로 이동하세요.`);
          } else if (verticalOffset < -offsetThresholdY) {
            setMessage(`카메라가 위로 ${Math.abs(verticalOffset).toFixed(1)} 만큼 치우쳤습니다. 아래로 이동하세요.`);
          } else if (verticalOffset > offsetThresholdY) {
            setMessage(`카메라가 아래로 ${verticalOffset.toFixed(1)} 만큼 치우쳤습니다. 위로 이동하세요.`);
          } else {
            setMessage('객체가 중앙에 있습니다. 스캔을 진행하세요.');
          }
        }
      } catch (error) {
        console.error('Detection error:', error);
        setMessage('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };
  
  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
        ratio="4:3"
      />
      {detectedObjects.map((boundingBox, index) => (
        <View
          key={index}
          style={[
            styles.boundingBox,
            {
              top: boundingBox.top,
              left: boundingBox.left,
              width: boundingBox.width,
              height: boundingBox.height,
            },
          ]}
        >
          <Text style={styles.boundingBoxText}>
            ({boundingBox.left.toFixed(1)}, {boundingBox.top.toFixed(1)})
          </Text>
        </View>
      ))}
      <View style={styles.messageBox}>
        <Text style={styles.messageText}>{message}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleObjectDetection}>
        <Text style={styles.buttonText}>Detect Objects</Text>
      </TouchableOpacity>
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
    flex: 1,
    width: '100%',
  },
  boundingBox: {
    position: 'absolute',
    borderColor: 'blue',
    borderWidth: 2,
    zIndex: 1,
  },
  boundingBoxText: {
    color: 'blue',
    fontSize: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 2,
    borderRadius: 4,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageBox: {
    position: 'absolute',
    top: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OcrScreen;






// import React, { useState, useRef } from 'react';
// import { View, StyleSheet } from 'react-native';
// import { RNCamera } from 'react-native-camera';
// import TextRecognition, { TextRecognitionScript } from '@react-native-ml-kit/text-recognition';
// import CustomButton from '../components/CustomButton';
// import { useNavigation } from '@react-navigation/native'; // 네비게이션 추가

// const OcrScreen = () => {
//   const [ocrResult, setOcrResult] = useState('');
//   const cameraRef = useRef(null);
//   const navigation = useNavigation(); // 네비게이션 객체

//   const handleCapture = async () => {
//     if (cameraRef.current) {
//       const options = { quality: 0.5, base64: false };
//       const data = await cameraRef.current.takePictureAsync(options);
//       const uri = data.uri;

//       try {
//         const result = await TextRecognition.recognize(
//           uri,
//           TextRecognitionScript.KOREAN
//         );

//         console.log('OCR Result:', result);
//         if (result && result.blocks && result.blocks.length > 0) {
//           const recognizedText = result.blocks.map(block => block.text).join('\n');
//           setOcrResult(recognizedText);
//           navigation.navigate('OCRResultScreen', { ocrResult: recognizedText }); // OCRResultScreen으로 이동
//         } else {
//           setOcrResult('인식된 텍스트가 없습니다.');
//         }
//       } catch (error) {
//         console.error('Error during OCR:', error);
//         setOcrResult('OCR 처리 중 오류 발생');
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <RNCamera
//         ref={cameraRef}
//         style={styles.camera}
//         type={RNCamera.Constants.Type.back}
//       />
//       <CustomButton onPress={handleCapture} backgroundColor="#5370d4" textColor="white" marginTop="10px">
//         스캔하기
//       </CustomButton>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     width: '100%',
//     height: '80%',
//   },
// });

// export default OcrScreen;