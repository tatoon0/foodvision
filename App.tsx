import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { productInfo, productData } from './data';

const App = () => {
  const [productInfo, setProductInfo] = React.useState<productInfo | null>(null);

  return (
    <View style={styles.container}>
      <RNCamera
        onBarCodeRead={(barcode) => {
          const scannedBarcode = barcode.data;

          if (productData[scannedBarcode]) {
            setProductInfo(productData[scannedBarcode]);
          } else {
            setProductInfo(null);
          }

          console.log('Barcode:', scannedBarcode);
        }}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
      />
      <Text style={{ 
        textAlign: 'center',
        fontSize: 30, 
        }}>
        {productInfo ? productInfo.name : '알 수 없는 제품'}
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