import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { saveTask } from "../../api.js";

const Footer = ({ userId, onAddTask}) => {
    const [expanded, setExpanded] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [importance, setImportance] = useState('');
    const [category, setCategory] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

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
        const response = await saveTask(userId, taskData);
        onAddTask()
        console.log('respuesta del servidor:', response);        
        setExpanded(!expanded)


        } catch(err) {
            console.log('Error durante el registro:', err); 
            Alert.alert('Error', 'Hubo un problema durante el registro, intentalo de nuevo ', err);
        }

    };


    return (
        <View style={[styles.container, expanded && styles.expandedContainer]}>
            {!expanded && (
                <Pressable style={styles.addButton} onPress={toggleExpand}>
                    <Text>Agregar Tarea</Text>
                </Pressable>
            )}
            {expanded && (
                <View style={styles.expandedContent}>
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
                    <Pressable
                        style={styles.input}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text>Fecha de vencimiento: {dueDate.toLocaleDateString()}</Text>
                    </Pressable>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={dueDate}
                            defaultValue=''
                            mode="date"
                            is24Hour={true}
                            display="default"
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
                    <Pressable style={styles.saveButton} onPress={addTask}>
                        <Text>Guardar</Text>
                    </Pressable>
                    <Pressable style={styles.cancelButton} onPress={toggleExpand}>
                        <Text>Cancelar</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
};

const styles = {
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'flex-end', // Alineación de los botones en la esquina derecha
        alignItems: 'center',
        paddingVertical: 10,
    },
    expandedContainer: {
        height: '75%', // Altura expandida del footer
    },
    addButton: {
        backgroundColor: '#715CF8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    expandedContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 5,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: '#715CF8',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    cancelButton: {
        marginHorizontal: 10,
    },
};

export default Footer;
