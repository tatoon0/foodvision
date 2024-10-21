import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const BarcodeResult = ({route, navigation}) => {
    // 제품 정보를 route.params에서 가져옴
    const { productInfo } = route.params;
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{productInfo.name}</Text>
            <Text style={styles.text}>{productInfo.type}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        color: 'black',
        fontSize: 16,
    },
});

export default BarcodeResult;