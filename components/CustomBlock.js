import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomBlock = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flex:1, // 부모 컨테이너의 크기를 가득 채움
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10, // 버튼 간의 간격
    },
    text: {
        color: '#000',
        fontSize: 16,
    },
});

export default CustomBlock;
