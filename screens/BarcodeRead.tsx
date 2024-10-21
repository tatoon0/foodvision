import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { productInfo, productData } from '../data';

const BarcodeRead = ({navigation}) => {
  // 바코드를 찾았을 때의 정보를 저장할 state
  const [productInfo, setProductInfo] = React.useState<productInfo | null>(null);

  // 바코드를 찾았을 때의 정보를 저장할 함수
  const handleBarCodeRead = (barcode : string) => {
    // 바코드가 productData에 있으면 해당 바코드의 정보를 productInfo에 저장하고 BarcodeResult로 이동
    if (productData[barcode]) {
      setProductInfo(productData[barcode]);
      navigation.navigate('BarcodeResult', { productInfo: productData[barcode] });
    } else {
      setProductInfo(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* 카메라화면 */}
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
      {/* 테스트용 버튼 */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        }}>
        {/* 테스트1 */}
        <Button
          title="test1"
          onPress={() => {
            handleBarCodeRead('2221234567895');
            console.log(productInfo); 
          }}
        />
        {/* 테스트2 */}
        <Button
          title="test2"
          onPress={() => {
            handleBarCodeRead('0036000291452');
            console.log(productInfo); 
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default BarcodeRead;