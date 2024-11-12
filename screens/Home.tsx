import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';


const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* OCR버튼 */}
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate('OCR')
            }}>
                <Text style={styles.text}>OCR</Text>
            </TouchableOpacity>
            {/* 바코드버튼 */}
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate('바코드 리더')
            }}>
                <Text style={styles.text}>Barcode</Text>
            </TouchableOpacity>
            <TouchableOpacity
            style={styles.button}
            onPress={() => {
                navigation.navigate('설정')
            }}>
                <Text style={styles.text}>Setting</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'black',
        fontSize: 16,
    },
});

export default Home;