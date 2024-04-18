import * as React from "react";
import  Constants  from "expo-constants";
import { Button, View, Text} from "react-native";

const Welcome = ({navigation}) =>{
    return(
        <View style = {{marginTop: Constants.statusBarHeight, 
            flexGrow: 1}} >
            <Text>Bienvenido a la aplicacion</Text>
            <Button
                title='Iniciar sesion'
                onPress={() => {navigation.navigate('Login')}}
            />
            <Button
                title="Registrarse"
                onPress={() => {navigation.navigate('Registro')}}
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
export default Welcome;