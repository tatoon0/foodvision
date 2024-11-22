import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomBlock from '../components/CustomBlock';


const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <CustomBlock
                    hint={"3개 중 첫번째 항목. 바코드를 인식하여 제품 정보를 확인합니다."}
                    title="Barcode"
                    onPress={() => {
                        navigation.navigate('BarcodeReader');
                    }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomBlock
                    hint={"3개 중 두번째 항목. 사진을 찍어 텍스트를 추출합니다."}
                    title="OCR"
                    onPress={() => navigation.navigate('OCRModeScreen')}
                />
            </View>
            <View style={styles.buttonContainer}>
                <CustomBlock
                    hint={"3개 중 세번째 항목. 스캔 기록, 설정 등을 확인합니다."}
                    title="마이페이지"
                    onPress={() => navigation.navigate('MyPage')}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly', // 위아래로 균등한 간격
        padding: 5,
        backgroundColor:"#F5F5F5"
    },
    buttonContainer: {
        flex: 1, // 버튼 컨테이너가 메인의 절반씩 차지
        justifyContent: 'center', // 버튼을 세로 중앙 정렬
    },
});

export default Home;