import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { translations } from '../translation'; 

const BarcodeInfo1 = ({route, navigation}) => {
    const { info } = route.params;

    useEffect(() => {
        navigation.setOptions({title: route.params.title});
    }, []);

    return (
        <View style={styles.container}>
            {Object.entries(info).map(([key, value]) => (
                <Text key={key} style={styles.text}>{translations[key]} : {String(value)}</Text>
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

export default BarcodeInfo1;