import * as React from "react";
import  Constants  from "expo-constants";
import { View, Text, Pressable, TextInput, StyleSheet, ImageBackground} from "react-native";

const Login = ({navigation})=>{
    return(
        <ImageBackground
        source={require('../../public/img/fondo2.png')} // Ruta de la imagen
        style={styles.backgroundImage}
        >
        <View style = {styles.container} >
            <Text
            style = {styles.title}
            >Login</Text>

            <Text style={styles.texts}>Ingresa tu usuario</Text>
            <TextInput 
                style={styles.inputs}
                placeholder = 'ej@ite.im'
                />
            <Text style={styles.texts}>Ingresa tu contraseña</Text>
            <TextInput 
                style={styles.inputs}
                placeholder = '**********'
                />    
            <Pressable 
                style={styles.buton}
                onPress={() => {navigation.navigate('HomeScreen')}}
            >
                <Text>Acceder</Text>
            </Pressable>
        </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: Constants.statusBarHeight, 
        flexGrow: 1,
        width: '100%',
        height: 400,
        alignItems: 'center',
        justifyContent: 'center'

    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Ajusta la imagen al tamaño del contenedor
        justifyContent: 'center',
      },
      title:{
        fontSize: 40,
        paddingBottom: 150
      },
      inputs: {
        borderRadius: 10,
        backgroundColor: '#F3F1F8',
        width: '60%',
        height: 40,
        paddingLeft: 10

      },
      texts:{
        paddingVertical: 20,
        fontSize: 20

      },
      buton:{
        backgroundColor: '#715CF8',
        paddingVertical: 10, 
        paddingHorizontal: 20, 
        borderRadius: 20, 
        marginVertical: 20, 
        alignItems: 'center',
        
      }
     

})

export default Login;