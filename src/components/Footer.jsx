import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

const Footer = ({ userId, navigation }) => {
    const form = () => {
        navigation.navigate('FormTask', { userId: userId });
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={form}>
                <Text style={styles.buttonText}>Agregar Tarea</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#1565C0',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Footer;
