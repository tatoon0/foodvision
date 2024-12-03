import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomBlock from '../components/CustomBlock';
import { useNavigation } from '@react-navigation/native';

const OCRResultScreen = ({ route }: { route: any }) => {
  const { ocrResult } = route.params; // OCR 결과 받아오기
  const [showFullText, setShowFullText] = React.useState(false); // 전체 텍스트 보기 토글
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {!showFullText ? (
        <>
          {console.log(ocrResult)}
          <CustomBlock
            title="전체 텍스트 불러오기"
            onPress={() => setShowFullText(true)}
          />
          <CustomBlock
            title="특정 정보 얻기"
            onPress={() =>
              navigation.navigate('OCRCategoryScreen', { ocrResult })
            }
          />
          <CustomBlock
            title="데이터베이스에 저장"
            onPress={() =>
              navigation.navigate('ProductRegistrationScreen', { ocrResult })
            }
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
    padding: 5,
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


// import React from 'react';
// import { View, Text, StyleSheet, ScrollView } from 'react-native';
// import CustomBlock from '../components/CustomBlock';

// const OCRResultScreen = ({ route }: { route: any }) => {
//   const { ocrResult } = route.params; // OCR 결과 받아오기

//   const [showFullText, setShowFullText] = React.useState(false); // 전체 텍스트 보기 토글

//   return (
//     <View style={styles.container}>
//       {!showFullText ? (
//         <>
//           <CustomBlock
//             title="전체 텍스트 불러오기"
//             onPress={() => setShowFullText(true)} // 전체 텍스트 보기 활성화
            
//           />
//           <CustomBlock
//             title="특정 정보 얻기"
//             onPress={() => alert('')} // 특정 정보 처리
//           />
//         </>
//       ) : (
//         <ScrollView contentContainerStyle={styles.textContainer}>
//           <Text style={styles.resultText}>{ocrResult}
//           {console.log(ocrResult)}
//           </Text>
          
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'space-evenly',
//     padding: 5,
//   },
//   textContainer: {
//     flexGrow: 1,
//     padding: 20,
//     backgroundColor: '#f3f3f3',
//     borderRadius: 10,
//   },
//   resultText: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'left',
//   },
// });

// export default OCRResultScreen;