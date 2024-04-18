import * as React from "react";
import  Constants  from "expo-constants";
import { View, Text, Pressable, StyleSheet} from "react-native";

const Welcome = ({navigation}) =>{
    return(
        <View style = {styles.container}>
            <View>
                {/*TODO: DEBERIAMOS DE PONER UN LOGO PARA ACOMPAÑAR LA APP?*/ }
                <Text style = {styles.title}>Nombre Aplicacion</Text>
                <View style={styles.btns}>
                    <Pressable
                      style={styles.btn}
                      onPress={() => {navigation.navigate('Login')}}
                    >
                      <Text style={styles.buttonTxt}>Iniciar sesión</Text>
                    </Pressable>
                    <Pressable
                      style={styles.btn}
                      onPress={() => {navigation.navigate('Registro')}}
                    >
                      <Text style={styles.buttonTxt}>Registrarse</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: Constants.statusBarHeight,
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center', 
    },
    title:{
      fontSize: 24, 
      fontWeight: 'bold', 
      marginBottom: 10, 
      color: '#545454'
    },
    btns: {
      flexDirection: 'column', 
      marginTop: 20, 
    },
    btn: {
      backgroundColor: '#715CF8',
      paddingVertical: 10, 
      paddingHorizontal: 20, 
      borderRadius: 20, 
      marginBottom: 10, 
      alignItems: 'center',
    },
    buttonTxt: {
      fontSize: 18, 
      color: 'white', 
    },
  });
export default Welcome;