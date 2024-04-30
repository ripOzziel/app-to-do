import * as React from 'react'
import  Constants  from 'expo-constants'
import { View, Text, TextInput, StyleSheet, Pressable, Alert} from "react-native"
import { createUser } from '../../api';

const Registro = ({ navigation }) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegistro = async () => {
    console.log('funciono'); 
    
    try {
        const userData = {  
            name: username, 
            email: email, 
            password: password 
        };

        console.log('datos del usuario:', userData); 
        
        console.log('enviando solicitud de registro'); 
        const response = await createUser(userData); 

        console.log('respuesta del servidor:', response); 
        
        navigation.navigate('Login'); 
    } catch (error) {
        console.log('Error durante el registro:', error); 
        Alert.alert('Error', 'Hubo un problema durante el registro, intentalo de nuevo');
    }
};

  return (
      <View style={styles.header}>
          <View>
              <Text style={styles.title}>Crear una cuenta</Text>

              <Text style={styles.instruction}>Nombre de usuario</Text>
              <TextInput
                  style={styles.inputs}
                  placeholder='Werito mercado guzman'
                  value={username}
                  onChangeText={setUsername}
              />
              <Text style={styles.instruction}>Correo</Text>
              <TextInput
                  style={styles.inputs}
                  placeholder='ej@ite.im'
                  value={email}
                  onChangeText={setEmail}
              />
              <Text style={styles.instruction}>Contraseña</Text>
              <TextInput
                  style={styles.inputs}
                  placeholder='**********'
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
              />
          </View>
          <Pressable
              style={styles.btn}
              onPress={handleRegistro} // Llama a la función handleRegistro cuando se presione el botón
          >
              <Text style={styles.btnTxt}> Terminar Registro</Text>
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