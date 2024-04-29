import React from 'react'
import  Constants  from 'expo-constants'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, FlatList} from 'react-native'
import Footer from '../components/Footer.jsx'
import { useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ()=>{
    //HOOKS
    const [agregarTarea, setAgregarTarea] = useState(false)
    const [text, setText] = useState('')
    const [tasks, setTasks] = useState([])
    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('my-tasks', JSON.stringify(value));
        } catch (e) {
          // saving error
        }
      };

    const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('my-tasks');
        if (value !== null) {
            const tasksLocal = JSON.parse(value)
            setTasks(tasksLocal)
        }
    } catch (e) {
        // error reading value
    }
    };
    
    useEffect(()=>{getData()},[] )

    const startToAdd = () =>{
        console.log("agregar");
        setAgregarTarea(true)
    }
    const addTask = () =>{
        const tmp = [...tasks]
        const newTask={
            title: text,
            done: false,
            date: new Date()
        }
       tmp.push(newTask)
        console.log("Agregada"); 
        setTasks(tmp)
        storeData(tmp)
        setText('')
    }

    const markDone = (task) =>{
        console.log("Marcada");
        const tmp = [...tasks]
        const index = tmp.findIndex(el => el.title === task.title)
        const toDo = tasks[index]
        toDo.done = !toDo.done
        setTasks(tmp)
        storeData(tmp)

    }

    const deleteFunction = (task) =>{
        console.log("Eliminada");
        const tmp = [...tasks]
        const index = tmp.findIndex(el => el.title === task.title)
        tmp.splice(index,1)
        setTasks(tmp)
        setText('')
        storeData(tmp)

    }
    const renderItem = ({item}) =>{
        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity
                onPress={()=>markDone(item)}
                >
                    <Text style={item.done? styles.textDone : styles.text}>{item.title}</Text>
                    <Text style={styles.text}>{new Date(item.date).toLocaleDateString()}</Text>
                </TouchableOpacity>

                {
                    item.done &&
                    <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() =>deleteFunction(item)}
                    >
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                }
            </View>
    )
    }
    return(
        <View style = {styles.container} >
            <Text>¿Que pendientes hay?</Text>
                {agregarTarea &&
                    <View style={styles.inputContainer}>
                        <TextInput 
                        style={styles.textInput}
                        placeholder='Agregar nueva tarea'
                        onChangeText={(t)=> setText(t)}
                        value={text}
                        />
                        <TouchableOpacity
                        style={styles.button}
                        onPress={addTask}
                        ><Text>Agregar</Text></TouchableOpacity>
                    </View>
                }
            
            <View style= {styles.scrollContainer}>
                <FlatList
                data={tasks}
                renderItem={renderItem}/>
            </View>
            <Footer onPress={startToAdd}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: Constants.statusBarHeight, 
        flexGrow: 1,
       

        width: '100%'
    },
    textInput:{
        borderColor: '#574171',
        backgroundColor: '#F3F1F8',
        borderWidth: 2,
        width: Dimensions.get('screen').width *0.6,
        height:40,
        margin: 10,
        paddingLeft: 10,
        borderRadius: 10
    },
    inputContainer:{
        margin: 20,
        flexDirection: 'row',
    },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width *0.2,
        backgroundColor: '#715CF8',
        height: 40,
        marginVertical: 10,
        borderRadius: 10
    },
    scrollContainer:{
        marginTop: 20
    },
    itemContainer:{
        paddingVertical:10,
        borderBottomColor: '#574171' ,
        borderBottomWidth:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    text:{
        fontSize: 16,
        color: '#6f6f6f'
    },
    textDone:{
        fontSize: 16,
        color: '#6f6f6f',
        textDecorationLine: 'line-through',
        color: 'red'
    },
    removeButton:{
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 15,
        color: 'white'

    }
})

export default HomeScreen;