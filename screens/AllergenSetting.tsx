import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Switch, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyAllergen from "../MyAllergen";
import CustomBlock from "../components/CustomBlock";

const AllergenSetting = ({ route, navigation }) => {
    const [allergens, setAllergens] = useState(MyAllergen);

    useEffect(() => {
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
        // Save allergen state to AsyncStorage
        const saveAllergen = async () => {
            try {
                await AsyncStorage.setItem("allergen", JSON.stringify(allergens));
            } catch (e) {
                console.log(e);
            }
        };
        saveAllergen();
    }, [allergens]);
    
    // Function to toggle allergen state
    const toggleAllergen = (allergen:string) => {
        setAllergens((prev) => ({
            ...prev,
            [allergen]: !prev[allergen]
        }));
        console.log(allergens);
    };

    return (
        <View style={styles.container}>
            {Object.entries(allergens).map(([allergen, isChecked], index) => (
                <CustomBlock
                    hint={`${Object.keys(allergens).length}개 성분 중 ${index+1}번째 성분.`}
                    key={allergen}
                    title={`${allergen} 알림 ${isChecked ? "끄기" : "켜기"}`}
                    onPress={() => toggleAllergen(allergen)}
                />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    allergenItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    allergenText: {
        fontSize: 18,
        color: "black",
        padding: 10,
    },
});

export default AllergenSetting;
