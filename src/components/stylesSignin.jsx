import { StyleSheet } from "react-native";
import  Constants  from "expo-constants";

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight, // Añadir padding en la parte superior igual a la altura de la barra de estado
        flexGrow: 1,
        width: '100%',
        height: 200,
        alignItems: 'center'
    },
    boton: {
        backgroundColor: 'blue'
    },
    title: {
        fontSize: 20
    }

});

export default styles