import React, {useState} from 'react'
import { Pressable, View, Text, Image, StyleSheet } from 'react-native'

const Footer = ({onPress}) => {
    const addTask = () =>{

    }
    return (
        <View style={styles.container}>
            <Pressable style={styles.button}>
                <Image 
                    source={require("../../assets/img/perfil-del-usuario.png")}
                    style={styles.image}
                />
                <Text style={styles.buttonText}>Nombre usuario inf</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onPress}>
                <Image 
                    source={require("../../assets/img/agregar-tarea.png")}
                    style={styles.image}
                />
                <Text style={styles.buttonText}>Agregar Tarea</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#715CF8',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 25,
        marginHorizontal: 10,
    },
    image: {
        width: 20,
        height: 20,
        marginBottom: 2,
        marginTop: 15
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    },
});

export default Footer;