import * as React from 'react'
import  Constants  from 'expo-constants'
import { View, Text, TextInput, StyleSheet, Pressable} from "react-native"

const Registro = ({navigation}) => {
    return(
        <View style = {styles.header} >
            <View>
                <Text style = {styles.title}>Crear una cuenta</Text>
        
                <Text style = {styles.instruction}>Nombre de usuario</Text>
                <TextInput
                    style = {styles.inputs}
                    placeholder = 'Werito mercado guzman'
                />
                <Text style = {styles.instruction}>Correo</Text>
                {/*TODO: AGREGAR UN VALIDAR PARA ESTE INPUT PARA QUE ACEPTE SOLO CORREOS*/}
                <TextInput
                    style={styles.inputs}
                    placeholder = 'ej@ite.im'
                />
                <Text style = {styles.instruction}>Contraseña</Text>
                <TextInput
                    style = {styles.inputs}
                    placeholder = '**********'
                    secureTextEntry = {true}
                />
            </View>
            <Pressable
                style={styles.btn}
                onPress={() => {navigation.navigate('Login')}} >
                <Text style = {styles.btnTxt}> Terminar Registro</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
      marginTop: Constants.statusBarHeight,
      paddingHorizontal: 20, 
      paddingTop: 20, 
      flex: 1,
    },
    title: {
      fontSize: 24, 
      color: '#715CF8',
      fontWeight: 'bold', 
      marginBottom: 10, 
    },
    instruction: {
      fontSize: 18, 
      color: '#545454',
      fontWeight: 'bold', 
      paddingLeft: 10, 
      marginBottom: 5, 
    },
    inputs: {
      paddingLeft: 10, 
      paddingRight: 10, 
      marginBottom: 10, 
      borderWidth: 1, 
      borderRadius: 10, 
      fontSize: 18, 
      height: 40, 
    },
    btn: {
      position: 'absolute', 
      bottom: 20, 
      right: 20, 
      backgroundColor: '#715CF8',
      paddingHorizontal: 15, 
      paddingVertical: 8, 
      borderRadius: 10, 
      fontSize: 16, 
      color: 'white',
    },
    btnTxt:{
        color: 'white'
    }
  });

export default Registro;