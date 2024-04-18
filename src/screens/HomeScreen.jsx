import * as React from 'react'
import  Constants  from 'expo-constants'
import { View, Text, StyleSheet} from 'react-native'
import Footer from '../components/Footer.jsx'

const HomeScreen = ()=>{
    return(
        <View style = {styles.container} >
            <Text>¿Que pendientes hay?</Text>


            <Footer />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: Constants.statusBarHeight, 
        flexGrow: 1,
    }
})

export default HomeScreen;