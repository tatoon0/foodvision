import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { productInfo, productData } from './data';

const App = () => {
  const [productInfo, setProductInfo] = React.useState<productInfo | null>(null);

  const handleBarCodeRead = (barcode : string) => {
    if (productData[barcode]) {
      setProductInfo(productData[barcode]);
    } else {
      setProductInfo(null);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        onBarCodeRead={(barcode) => {
          const scannedBarcode = barcode.data;
          handleBarCodeRead(scannedBarcode);
          console.log('Barcode:', scannedBarcode);
        }}
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back}
        autoFocus={RNCamera.Constants.AutoFocus.on}
      />
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        }}>
        <Button
          title="test1"
          onPress={() => {
            handleBarCodeRead('2221234567895');
            console.log(productInfo); 
          }}
        />
        <Button
          title="test2"
          onPress={() => {
            handleBarCodeRead('0036000291452');
            console.log(productInfo); 
          }}
        />
      </View>
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