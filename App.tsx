import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import BarcodeReader from './screens/BarcodeReader';
import BarcodeResult from './screens/BarcodeResult';
import BarcodeInfo1 from './screens/BarcodeInfo1';
import BarcodeInfo2 from './screens/BarcodeInfo2';
import BarcodeInfo3 from './screens/BarcodeInfo3';
import BarcodeInfo4 from './screens/BarcodeInfo4';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="홈" component={Home}/>
        <Stack.Screen name="바코드 리더" component={BarcodeReader}/>
        <Stack.Screen name="결과창" component={BarcodeResult} />
        <Stack.Screen name="기본정보" component={BarcodeInfo1} />
        <Stack.Screen name="상세정보" component={BarcodeInfo2} />
        <Stack.Screen name="영양정보" component={BarcodeInfo3} />
        <Stack.Screen name="기타정보" component={BarcodeInfo4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;