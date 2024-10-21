import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import BarcodeRead from './screens/BarcodeRead';
import BarcodeResult from './screens/BarcodeResult';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="BarcodeRead" component={BarcodeRead} />
        <Stack.Screen name="BarcodeResult" component={BarcodeResult} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;