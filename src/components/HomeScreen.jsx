import * as React from 'react'
import  Constants  from 'expo-constants'
import { View, Text, } from 'react-native'

const HomeScreen = ()=>{
    return(
        <View style = {{marginTop: Constants.statusBarHeight, 
                        flexGrow: 1}} >
            <Text>Bienvenido usuario</Text>
        </View>
    )
}


//const styles = StyleSheet.create({
//    container:{
//        paddingTop: Constants.statusBarHeight, // Añadir padding en la parte superior igual a la altura de la barra de estado
//        flex: 1,
//    }

//})

export default HomeScreen;