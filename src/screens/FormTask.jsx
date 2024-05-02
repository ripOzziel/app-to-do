import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveTask, updateTask } from "../../api.js";

const FormTask = ({ route, navigation,  }) => {
    const userId = route.params?.userId;
    const onAddTask = route.params?.onAddTask;
    const taskToUpdate = route.params?.taskToUpdate; // Nuevo parámetro para almacenar los datos de la tarea a actualizar
    const [title, setTitle] = useState(taskToUpdate?.name || '');
    const [description, setDescription] = useState(taskToUpdate?.description || '');
    const [dueDate, setDueDate] = useState(new Date(taskToUpdate?.due_date) || new Date());
    const [importance, setImportance] = useState(taskToUpdate?.importance || '');
    const [category, setCategory] = useState(taskToUpdate?.category || '');
    const [showDatePicker, setShowDatePicker] = useState(false);


    const addTask = async () => {
        console.log('ID del usuario:', userId);
        try {
            const currentDate = new Date().toISOString().substring(0, 19).replace('T', ' ');
            const dueDateFormatted = new Date().toISOString().substring(0, 19).replace('T', ' ');
            const taskData = {
                name: title,
                description: description,
                creation_date: currentDate,
                due_date: dueDateFormatted,
                category: category,
                importance: importance,
                completed: false
            }

            console.log('datos de la tarea:', taskData);
            console.log('enviando solicitud de validacion');
            if (taskToUpdate) {
                // Si hay datos de tarea para actualizar, llamar a la función de actualización de tarea en lugar de agregar una nueva tarea
                const response = await updateTask(userId, taskToUpdate.id, taskData);
                console.log('respuesta del servidor:', response);
            } else {
                // Si no hay datos de tarea para actualizar, agregar una nueva tarea
                const response = await saveTask(userId, taskData);
                console.log('respuesta del servidor:', response);
                onAddTask();
            }
            
            navigation.navigate('HomeScreen', { userId: userId });
        
        } catch (err) {
            console.log('Error:', err);
            //Alert.alert('Error', 'Hubo un problema durante el registro, intentalo de nuevo ', err);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{taskToUpdate ? 'Actualizar Tarea' : 'Agregar Tarea'}</Text>
            <TextInput
                style={styles.input}
                placeholder="Título"
                defaultValue=''
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                defaultValue=''
                value={description}
                onChangeText={setDescription}
            />
            <TouchableOpacity
                style={styles.input}
                onPress={() => setShowDatePicker(true)}
            >
                <Text>Fecha de vencimiento: {dueDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dueDate}
                    defaultValue=''
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            setDueDate(selectedDate);
                        }
                    }}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="Importancia"
                defaultValue=''
                value={importance}
                onChangeText={setImportance}
            />
            <TextInput
                style={styles.input}
                placeholder="Categoría"
                defaultValue=''
                value={category}
                onChangeText={setCategory}
            />
            <TouchableOpacity style={styles.saveButton} onPress={addTask}>
                <Text style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => console.log('Cancelar')}>
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
