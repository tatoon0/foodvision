import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const App = () => {
  const [text, setText] = React.useState('result');

  return (
    <View style={styles.container}>
      <RNCamera
        onBarCodeRead={(barcode) => {
          setText(barcode.data);
          console.log(barcode);
        }}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
      />
      <Text style={{ 
        textAlign: 'center',
        fontSize: 30, 
        }}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;