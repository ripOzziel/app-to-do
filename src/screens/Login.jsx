import * as React from "react";
import  Constants  from "expo-constants";
import { View, Text, Button, TextInput} from "react-native";

const Login = ({navigation})=>{
    return(
        <View style = {{marginTop: Constants.statusBarHeight, 
            flexGrow: 1}} >
            <Text>Login</Text>

            <Text>Ingresa tu usuario</Text>
            <TextInput 
                placeholder = 'ej@ite.im'
                />
            <Text>Ingresa tu contraseña</Text>
            <TextInput 
                placeholder = '**********'
                />    
            <Button 
                title='Acceder'
                onPress={() => {navigation.navigate('HomeScreen')}}
            />
        </View>
    )
}
/** 
const styles = StyleSheet.create({
    container:{
        paddingTop: Constants.statusBarHeight, // Añadir padding en la parte superior igual a la altura de la barra de estado
        flex: 1,
    }

})
*/
export default Login;