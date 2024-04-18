import * as React from "react";
import  Constants  from "expo-constants";
import { View, Text, Button} from "react-native";

const Login = ({navigation})=>{
    return(
        <View style = {{marginTop: Constants.statusBarHeight, 
            flexGrow: 1}} >
            <Text>Pantalla de login</Text>
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