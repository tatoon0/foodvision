import React from 'react';
import { View, Button, StyleSheet } from 'react-native';


const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            {/* OCR버튼 */}
            <Button 
                title="OCR"
                onPress={() => console.log('Top Button Pressed')}
            />
            {/* 바코드버튼 */}
            <Button
                title="Barcode"
                onPress={() => {
                    console.log('Barcode Button Pressed');
                    navigation.navigate('BarcodeRead')
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        padding: 20,
    },
});

export default Home;