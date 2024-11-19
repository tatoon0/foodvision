import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyAllergen from '../MyAllergen';
import CustomBlock from '../components/CustomBlock';
import { trigger } from 'react-native-haptic-feedback';

const BarcodeResult = ({route, navigation}) => {
    // 제품 정보를 route.params에서 가져옴
    const { productInfo } = route.params;
    const { basicInfo, detailedInfo, nutritionInfo, additionalInfo } = productInfo;
    const [allergens, setAllergens] = useState(MyAllergen);

    useEffect(() => {
        ToastAndroid.show(`바코드를 인식했습니다. 제품명 : ${basicInfo.name}`, ToastAndroid.SHORT);

        // 제품 이름을 타이틀로 설정
        navigation.setOptions({title: basicInfo.name});

        // Load allergen state from AsyncStorage
        const loadAllergen = async () => {
            try {
                const allergenState = await AsyncStorage.getItem("allergen");
                if (allergenState !== null) {
                    setAllergens(JSON.parse(allergenState));
                }
            } catch (e) {
                console.log(e);
            }
        };
        loadAllergen();
    }, []);

    useEffect(() => {
        const checkAllergen = async () => {
            if (nutritionInfo.allergens !== undefined) {
                for (let allergen of nutritionInfo.allergens) {
                    if (allergens[allergen]) {
                        ToastAndroid.show('이 제품에는 알레르기 유발 성분이 포함되어 있습니다', ToastAndroid.SHORT);
                        break;
                    }
                }
            };
            if (nutritionInfo.manufacturingAllergens !== undefined) {
                for (let allergen of nutritionInfo.manufacturingAllergens) {
                    if (allergens[allergen]) {
                        ToastAndroid.show('이 제품은 알레르기 유발 성분이 사용된 제조시설에서 생산되었습니다', ToastAndroid.SHORT);
                        break;
                    }
                }
            };
        }
        checkAllergen();
    }, [allergens]);

    function navInfo(screenName: string, info: any, title: string) {
        navigation.navigate(screenName, { info: info, title: title });
    }

    return (
        <View style={styles.container}>
            <View style={styles.rowButtonContainer}>
                <CustomBlock hint="4개 중 첫번째 항목" title="기본정보" onPress={() => {navInfo('BarcodeInfo', basicInfo, "기본정보")}} />
                <CustomBlock hint="4개 중 두번째 항목" title="상세정보" onPress={() => {navInfo('BarcodeInfo', detailedInfo, "상세정보")}} />
            </View>
            <View style={styles.rowButtonContainer}>
                <CustomBlock hint="4개 중 세번째 항목" title="영양정보" onPress={() => {navInfo('BarcodeInfo', nutritionInfo, "영양정보")}} />
                <CustomBlock hint="4개 중 네번째 항목" title={"기타정보"} onPress={() => {navInfo('BarcodeInfo', additionalInfo, "기타정보")}} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 5,
        backgroundColor:"#F5F5F5"
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