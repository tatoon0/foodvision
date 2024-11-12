import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import BarcodeReader from './screens/BarcodeReader';
import BarcodeResult from './screens/BarcodeResult';
import BarcodeInfo from './screens/BarcodeInfo';
import Setting from './screens/Setting';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="홈" component={Home}/>
        <Stack.Screen name="바코드 리더" component={BarcodeReader}/>
        <Stack.Screen name="결과창" component={BarcodeResult} />
        <Stack.Screen name="정보" component={BarcodeInfo} />
        <Stack.Screen name="설정" component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;