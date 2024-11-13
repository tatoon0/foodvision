import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomBlock from '../components/CustomBlock'; // CustomBlock 경로에 맞게 수정
import OCRResultScreen from './OCRResultScreen';
const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
           
                 <View style={styles.buttonContainer}>
                <CustomBlock
                    title="Barcode"
                    onPress={() => {
                        console.log('Barcode Button Pressed');
                        navigation.navigate('BarcodeRead');
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomBlock
                    title="OCR"
                    onPress={() => navigation.navigate('OCRModeScreen')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly', // 위아래로 균등한 간격
        padding: 20,
        backgroundColor:"#F5F5F5"
    },
    buttonContainer: {
        flex: 1, // 버튼 컨테이너가 메인의 절반씩 차지
        justifyContent: 'center', // 버튼을 세로 중앙 정렬
    },
});

export default Home;
