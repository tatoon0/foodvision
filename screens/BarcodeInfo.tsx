import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { translations } from '../translation'; 

const BarcodeInfo = ({route, navigation}) => {
    const { info } = route.params;

    return (
        <View style={styles.container}>
            {Object.entries(info).map(([key, value], index) => (
                <Text accessibilityLabel={`${route.params.title} ${Object.keys(info).length}개 중 ${index+1}번째, ${translations[key]} : ${String(value)}`} key={key} style={styles.text}>{translations[key]} : {String(value)}</Text>
            ))}
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
        fontSize: 20,
        margin: 5,
    },
});

export default BarcodeInfo;