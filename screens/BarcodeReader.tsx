import React from 'react';
import { View, Text, StyleSheet, Button, Modal, FlatList, TouchableOpacity, ToastAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { productInfo, productData } from '../data';

const BarcodeReader = ({navigation}) => {
  // 바코드를 찾았을 때의 정보를 저장할 state
  const [productInfo, setProductInfo] = React.useState<productInfo | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [lastToastTime, setLastToastTime] = React.useState(0);
  const cooldown = 5000;

  const showToast = () => {
    const now  = Date.now();
    if (now - lastToastTime >= cooldown) {
      ToastAndroid.show('해당 제품의 정보가 없습니다', ToastAndroid.SHORT);
      setLastToastTime(now);
    }
  }

  // 바코드를 찾았을 때의 정보를 저장할 함수
  const handleBarCodeRead = (barcode : string) => {
    // 바코드가 productData에 있으면 해당 바코드의 정보를 productInfo에 저장하고 BarcodeResult로 이동
    if (productData[barcode]) {
      setProductInfo(productData[barcode]);
      navigation.navigate('BarcodeResult', { productInfo: productData[barcode] });
    } else {
      setProductInfo(null);
      showToast();
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
          title="test"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{ backgroundColor: 'white', padding: 20, height: '50%' }}>
            <FlatList
              data={Object.keys(productData)}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{ padding: 10 }}
                  onPress={() => {
                    setModalVisible(false);
                    handleBarCodeRead(item);
                }}>
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              )}
            >
            </FlatList>
            <Button
              title="닫기"
              onPress={() => {
                setModalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 16,
},
});

export default BarcodeReader;