import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const BarcodeInfo1 = ({route, navigation}) => {
    const { info } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>제조국 : {info.countryOfManufacture}</Text>
            <Text style={styles.text}>재활용 : {info.recyclingInstructions}</Text>
            <Text style={styles.text}>보관방법 : {info.storageInstructions}</Text>
            <Text style={styles.text}>주의사항 : {info.caution}</Text>
            <Text style={styles.text}>연락처 : {info.contactNumber}</Text>
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