import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const BarcodeInfo1 = ({route, navigation}) => {
    const { info } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.text}>포장단위 : {info.packagingUnit}</Text>
            <Text style={styles.text}>제품용량 : {info.capacity}</Text>
            {info.cookingInstructions ?
            <Text style={styles.text}>조리방법 : {info.cookingInstructions}</Text> : null}
            {info.cookingcaution ?
            <Text style={styles.text}>조리주의사항 : {info.cookingcaution}</Text> : null}
            {info.features ?
            <Text style={styles.text}>제품특징 : {info.features}</Text> : null}
            {info.abv ? 
            <Text style={styles.text}>알콜도수 : {info.abv}</Text> : null}
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