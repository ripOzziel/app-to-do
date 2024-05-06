import React, { useState } from "react";
import  Constants  from "expo-constants";
import { View, Text, Pressable, TextInput, StyleSheet, ImageBackground, Alert} from "react-native";
import { getUser } from "../../api";

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const loginUser = async () => {
    try {
        const userData = {
            email: email,
            password: password
        };

        console.log('datos del usuario:', userData);
        console.log('enviando solicitud de validacion');
        const response = await getUser(userData);

        console.log('respuesta del servidor:', response);

        if (response && response.user) {
            const userId = response.user.id;
            navigation.navigate('HomeScreen', { userId: userId });
        } else {
            Alert.alert('Error', 'Hubo un problema durante el inicio de sesión, por favor inténtalo de nuevo');
        }
    } catch (err) {
        Alert.alert('Error', 'correo o contraseña incorrectos');
    }
};

    return(
        <ImageBackground
        source={require('../../public/img/fondo2.png')} 
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
                value={email}
                onChangeText={setEmail}
                />
            <Text style={styles.texts}>Ingresa tu contraseña</Text>
            <TextInput 
                style={styles.inputs}
                placeholder = '**********'
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                />    
            <Pressable 
                style={styles.buton}
                onPress={loginUser}
            >
                <Text>Acceder</Text>
            </Pressable>
        </View>
        </ImageBackground>
    );
};

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
        resizeMode: 'cover',
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
});

export default Login;