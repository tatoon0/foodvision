import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { translations } from '../translation'; 
import Slider from '@react-native-community/slider';

const BarcodeInfo = ({ route, navigation }) => {
    const { info } = route.params;

    // State to manage the font size
    const [fontSize, setFontSize] = useState(20);

    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer} importantForAccessibility='no-hide-descendants'>
                <Text style={{color: 'black', padding: 20, fontSize: 30}}>글자 크기</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={20}
                    maximumValue={60}
                    minimumTrackTintColor='#000000'
                    maximumTrackTintColor='#000000'
                    step={1}
                    value={fontSize}
                    onValueChange={(value) => setFontSize(value)}
                />
            </View>
            <ScrollView style={styles.textContainer}>
                {Object.entries(info).map(([key, value], index) => (
                    <Text
                        accessibilityLabel={`${route.params.title} ${Object.keys(info).length}개 중 ${index + 1}번째, ${translations[key]} : ${String(value)}`}
                        key={key}
                        style={[styles.text, { fontSize }]}
                    >
                        {translations[key]} : {String(value)}
                    </Text>
                ))}
            </ScrollView>
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
    textContainer: {
        flex: 1,
    },
    sliderContainer: {
        width: '80%',
        alignItems: 'center',
        marginBottom: 20,
    },
    text: {
        color: 'black',
        margin: 10,
    },
    slider: {
        width: '100%',
    },
});

export default BarcodeInfo;
