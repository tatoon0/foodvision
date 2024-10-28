import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const BarcodeInfo1 = ({route, navigation}) => {
    const { info } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>원재료 : {info.ingredients}</Text>
            <Text style={styles.text}>영양성분 : {info.nutritionalContent}</Text>
            {info.allergens ?
            <Text style={styles.text}>알레르기 : {info.allergens}</Text> : null}
            <Text style={styles.text}>제조시설알레르기 : {info.manufacturingAllergens}</Text>
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