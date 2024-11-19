import React from 'react';
import { NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import BarcodeReader from './screens/BarcodeReader';
import BarcodeResult from './screens/BarcodeResult';
import BarcodeInfo from './screens/BarcodeInfo';
import OCRModeScreen from './screens/OCRModeScreen';
import OcrScreen from './screens/OCRScreen';
import OCRResultScreen from './screens/OCRResultScreen';
import MyPage from './screens/MyPage';
import AllergenSetting from './screens/AllergenSetting';
import { theme } from './theme';
import Navbar from './components/Navbar';

type RootStackParamList = {
  Home: undefined;
  BarcodeReader: undefined;
  BarcodeResult: undefined;
  BarcodeInfo: undefined;
  OCRModeScreen: undefined;
  OcrScreen: undefined;
  OCRResultScreen: { ocrResult: string };
  AllergenSetting: undefined;
  MyPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="BarcodeReader" component={BarcodeReader}/>
          <Stack.Screen name="BarcodeResult" component={BarcodeResult}/>
          <Stack.Screen name="BarcodeInfo" component={BarcodeInfo} />
          <Stack.Screen name="OCRModeScreen" component={OCRModeScreen} />
          <Stack.Screen name="OcrScreen" component={OcrScreen} />
          <Stack.Screen name="OCRResultScreen" component={OCRResultScreen} />
          <Stack.Screen name="MyPage" component={MyPage} />
          <Stack.Screen name="AllergenSetting" component={AllergenSetting} />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;