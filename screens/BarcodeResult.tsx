import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const BarcodeResult = ({route, navigation}) => {
    // 제품 정보를 route.params에서 가져옴
    const { productInfo } = route.params;
    const { basicInfo, detailedInfo, nutritionInfo, additionalInfo } = productInfo;

    navigation.setOptions({title: basicInfo.name});

    function navInfo(screenName: string, info: any) {
        navigation.navigate(screenName, { info: info });
    }

    return (
        <View style={styles.container}>
            <View style={styles.rowButtonContainer}>
                <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => {navInfo('기본정보', basicInfo)}}>
                    <Text style={styles.text}>기본정보</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {navInfo('상세정보', detailedInfo)}}>
                    <Text style={styles.text}>상세정보</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.rowButtonContainer}>
            <TouchableOpacity 
                style={styles.buttonContainer}
                onPress={() => {navInfo('영양정보', nutritionInfo)}}>
                    <Text style={styles.text}>영양정보</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => {navInfo('기타정보', additionalInfo)}}>
                    <Text style={styles.text}>기타정보</Text>
                </TouchableOpacity>
            </View>
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
    rowButtonContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default BarcodeResult;