import React from 'react';
import { View, Text, Pressable} from 'react-native';


const Footer = ({userId, navigation}) => {

    const form = () => {
        navigation.navigate('FormTask', { userId: userId });
    }

    return (
        <View >
                <Pressable onPress={form}>
                    <Text>Agregar Tarea</Text>
                </Pressable>
        </View>
    );
};


export default Footer;
