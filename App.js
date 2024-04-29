import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login.jsx';
import Welcome from './src/screens/Welcome.jsx';
import Registro from './src/screens/Registro.jsx';
import HomeScreen from './src/screens/HomeScreen.jsx';

export default function App() {

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
            name="Welcome" 
            component = {Welcome} 
            options={{headerShown:false}}  />
        <Stack.Screen 
            name="Login" 
            component = {Login} 
            options={{headerShown:false}}  />
        <Stack.Screen
            name="Registro"
            component = {Registro} 
            options={{headerShown:false}}  />
        <Stack.Screen
            name="HomeScreen"
            component = {HomeScreen} 
            options={{headerShown:false}}  />
      </Stack.Navigator>

    </NavigationContainer>
  );
}