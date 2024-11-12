import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Home from './screens/Home';
import BarcodeRead from './screens/BarcodeRead';
import OCRModeScreen from './screens/OCRModeScreen';
import OcrScreen from './screens/OCRScreen';
import MyPage from './screens/Mypage';
import OCRResultScreen from './screens/OCRResultScreen';
import Navbar from './components/Navbar'; // Navbar 컴포넌트

type RootStackParamList = {
  Home: undefined;
  BarcodeRead: undefined;
  OCRModeScreen: undefined;
  OcrScreen: undefined;
  OCRResultScreen: { ocrResult: string };
  MyPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="BarcodeRead" component={BarcodeRead} />
          <Stack.Screen name="OCRModeScreen" component={OCRModeScreen} />
          <Stack.Screen name="OcrScreen" component={OcrScreen} />
          <Stack.Screen name="OCRResultScreen" component={OCRResultScreen} />
          <Stack.Screen name="MyPage" component={MyPage} />
        </Stack.Navigator>
        <Navbar />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
