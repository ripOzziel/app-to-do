import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { saveTask, updateTask } from "../../api.js";

const FormTask = ({ route, navigation }) => {
    const userId = route.params?.userId;
    const taskToUpdate = route.params?.taskToUpdate;

    const defaultDueDate = taskToUpdate?.due_date ? new Date(taskToUpdate.due_date) : new Date();
    const defaultDueTime = taskToUpdate?.due_time ? new Date(taskToUpdate.due_time) : new Date();
    
    const [title, setTitle] = useState(taskToUpdate?.name || '');
    const [description, setDescription] = useState(taskToUpdate?.description || '');
    const [dueDate, setDueDate] = useState(defaultDueDate);
    const [dueTime, setDueTime] = useState(defaultDueTime);
    const [importance, setImportance] = useState(taskToUpdate?.importance || '');
    const [category, setCategory] = useState(taskToUpdate?.category || '');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(taskToUpdate?.dueTime || false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isPickerVisible, setPickerVisible] = useState(false);

    const addTask = async () => {
        try {
            const currentDate = new Date().toISOString().substring(0, 19).replace('T', ' ');
            const dueDateFormatted = dueDate.toISOString().substring(0, 19).replace('T', ' ');
            const dueTimeFormatted = dueTime.getHours() + ':' + dueTime.getMinutes() + ':' + dueTime.getSeconds();

            const taskData = {
                name: title,
                description: description,
                creation_date: currentDate,
                due_date: dueDateFormatted,
                due_time: dueTimeFormatted,
                category: category,
                importance: importance,
                completed: false
            }

            console.log('limite hora ', taskData.due_time)

            if (taskToUpdate) {
                const response = await updateTask(userId, taskToUpdate.id, taskData);
                console.log('respuesta del servidor:', response);
            } else {
                const response = await saveTask(userId, taskData);
                console.log('respuesta del servidor:', response);
            }
            
            navigation.navigate('HomeScreen', { userId: userId });
        } catch (err) {
            Alert.alert('Error', 'Hubo un problema durante el registro, intentalo de nuevo ', err);
        } 
    };

    const showDatePicker = () => { setDatePickerVisibility(true);  };
    const hideDatePicker = () => { setDatePickerVisibility(false); };
    const handleDateConfirm = (date) => {
        setDueDate(date);
        hideDatePicker();
    };

    const showTimePicker = () => { setTimePickerVisibility(true); };
    const hideTimePicker = () => { setTimePickerVisibility(false);};
    const handleTimeConfirm = (time) => {
        setDueTime(time);
        hideTimePicker();
    };

    const handlePickerVisibility = () => {
        setPickerVisible(true);
    };
    

    const handlePickerChange = (itemValue, itemIndex) => {
        setImportance(itemValue)
        setPickerVisible(false); // Oculta el picker cuando se selecciona un valor
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>{taskToUpdate ? 'Actualizar Tarea' : 'Agregar Tarea'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                value={description}
                onChangeText={setDescription}
            />
            <TouchableOpacity
                style={styles.input}
                onPress={showDatePicker}
            >
                <Text>Fecha de vencimiento: {dueDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
            />
            <TouchableOpacity
                style={styles.input}
                onPress={showTimePicker}
            >
                <Text>Hora límite: {dueTime.toLocaleTimeString()}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
            />
            
                <TouchableOpacity style={styles.input} onPress={handlePickerVisibility}>
                <Text>Seleccionar: {importance}</Text>
            </TouchableOpacity>
            {isPickerVisible && (
                <Picker
                    selectedValue={importance}
                    onValueChange={handlePickerChange}
                >
                    <Picker.Item label="Baja" value="baja" />
                    <Picker.Item label="Media" value="media" />
                    <Picker.Item label="Alta" value="alta" />
                </Picker>
            )}

       
            <TextInput
                style={styles.input}
                placeholder="Categoría"
                value={category}
                onChangeText={setCategory}
            />
            <TouchableOpacity style={styles.saveButton} onPress={addTask}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('HomeScreen', { userId: userId })}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    importancia: {
        height: 80,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingVertical: 10,
        justifyContent: 'center',
        paddingHorizontal: 10,
       
    },
    saveButton: {
        backgroundColor: '#715CF8',
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 20,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    
});


export default FormTask;