import React from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Home from './screens/Home';
import BarcodeReader from './screens/BarcodeReader';
import BarcodeResult from './screens/BarcodeResult';
import BarcodeInfo from './screens/BarcodeInfo';
import OCRModeScreen from './screens/OCRModeScreen';
import OcrScreen from './screens/OCRScreen';
import OCRResultScreen from './screens/OCRResultScreen';
import MyPage from './screens/MyPage';
import AllergenSetting from './screens/AllergenSetting';
import CategoryScreen from './screens/CategoryScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import { theme } from './theme';
import Navbar from './components/Navbar';
import ParsedDataScreen from './screens/ParsedDataScreen';
import OCRCategoryScreen from './screens/OCRCategoryScreen';
import ProductRegistrationScreen from './screens/ProductRegistrationScreen';

const Stack = createNativeStackNavigator();

const BackButton = ({ navigation }: { navigation: any }) => (
  <TouchableOpacity
    style={styles.backButton}
    onPress={() => navigation.goBack()}
  >
    <Text style={styles.backButtonText}>뒤로가기</Text>
  </TouchableOpacity>
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ navigation }) => ({
            headerShown: true, // 헤더 표시
            headerLeft: () => <BackButton navigation={navigation} />, // 커스텀 뒤로가기 버튼
            headerTitleAlign: 'center', // 헤더 제목 가운데 정렬
          })}
        >
          <Stack.Screen name="Home" component={Home} options={{ title: '홈' }} />
          <Stack.Screen name="BarcodeReader" component={BarcodeReader} options={{ title: '바코드 리더' }} />
          <Stack.Screen name="BarcodeResult" component={BarcodeResult} options={{ title: '바코드 결과' }} />
          <Stack.Screen name="BarcodeInfo" component={BarcodeInfo} options={{ title: '바코드 정보' }} />
          <Stack.Screen name="OCRModeScreen" component={OCRModeScreen} options={{ title: 'OCR 모드' }} />
          <Stack.Screen name="OcrScreen" component={OcrScreen} options={{ title: 'OCR 화면' }} />
          <Stack.Screen name="OCRResultScreen" component={OCRResultScreen} options={{ title: 'OCR 결과' }} />
          <Stack.Screen name="Category" component={CategoryScreen} options={{ title: '카테고리' }} />
          <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: '제품 목록' }} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: '제품 상세' }} />
          <Stack.Screen name="ParsedDataScreen" component={ParsedDataScreen} options={{ title: '파싱된 데이터' }} />
          <Stack.Screen name="OCRCategoryScreen" component={OCRCategoryScreen} options={{ title: 'OCR 카테고리' }} />
          <Stack.Screen name="ProductRegistrationScreen" component={ProductRegistrationScreen} options={{ title: '제품 등록' }} />
          <Stack.Screen name="MyPage" component={MyPage} options={{ title: '마이페이지' }} />
          <Stack.Screen name="AllergenSetting" component={AllergenSetting} options={{ title: '알레르기 설정' }} />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  backButton: {
    padding: 10,
    marginLeft: 10,
    backgroundColor: '#5370d4',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
