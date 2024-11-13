import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Switch, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyAllergen from "../MyAllergen";

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
        <ScrollView style={styles.container}>
            {Object.entries(allergens).map(([allergen, isChecked]) => (
                <View key={allergen} style={styles.allergenItem}>
                    <Text style={styles.allergenText}>{allergen}</Text>
                    <Switch
                        value={isChecked}
                        onValueChange={() => toggleAllergen(allergen)}
                    />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    allergenItem: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    allergenText: {
        fontSize: 18,
        color: "black",
    },
});

export default AllergenSetting;
