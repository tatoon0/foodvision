import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const BarcodeInfo1 = ({route, navigation}) => {
    const { info } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>제품명 : {info.name}</Text>
            <Text style={styles.text}>상품분류명 : {info.category}</Text>
            <Text style={styles.text}>식품유형 : {info.type}</Text>
            <Text style={styles.text}>유통사 : {info.distributor}</Text>
            <Text style={styles.text}>제조사 : {info.manufacturer}</Text>
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

export default BarcodeInfo1;