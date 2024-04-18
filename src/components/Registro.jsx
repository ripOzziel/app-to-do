import * as React from 'react'
import  Constants  from 'expo-constants'
import { View, Text, Button} from "react-native"

const Registro = ({navigation}) => {
    return(
        <View style = {{marginTop: Constants.statusBarHeight, 
                     flexGrow: 1}} >
            <Text>Pantalla de registro</Text>
            <Button
                title='Terminar registro'
                onPress={()=>{navigation.navigate('Login')}}
            />
        </View>

    )
}

//const styles = StyleSheet.create({
//    container:{
//        marginTop: Constants.statusBarHeight, // Añadir padding en la parte superior igual a la altura de la barra de estado
//        flexGrow: 1
//    }

//})

export default Registro;