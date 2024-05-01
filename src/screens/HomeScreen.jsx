import React, { useEffect, useState } from 'react';
import  Constants  from 'expo-constants';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, FlatList, Pressable} from 'react-native'
import Footer from '../components/Footer.jsx';
import { getAllTask } from '../../api.js';


const HomeScreen = ({ route, navigation }) => {
    const userId = route.params?.userId;
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
            const tasksData = await getAllTask(userId);
            setTasks(tasksData.tasks);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const renderItem = ({ item }) => (
        <View style={[styles.taskContainer, { borderBottomColor: getImportanceColor(item.importance) }]}>
            <Text style={styles.taskName}>{item.name}</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>Creada:</Text>
                <Text style={styles.taskDate}>{item.creation_date}</Text>
            </View>
            <View style={styles.dateContainer}>
                <Text style={styles.dateLabel}>Vencimiento:</Text>
                <Text style={styles.taskDate}>{item.due_date}</Text>
            </View>
            <View style={styles.categoryContainer}>
                <Text style={styles.taskCategory}>Categoría: {item.category}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.taskList}
            />

            <Footer userId={userId} />
        </View>
    );
};

const getImportanceColor = (importance) => {
    switch (importance.toLowerCase()) {
        case 'low':
            return '#2ecc71'; // Verde
        case 'medium':
            return '#3498db'; // Azul
        case 'high':
            return '#e74c3c'; // Rojo
        default:
            return '#ccc'; // Color por defecto
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight, 
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    taskList: {
        paddingBottom: 70, // Espacio adicional en la parte inferior para evitar solapamiento con el botón
    },
    taskContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        elevation: 3,
        borderBottomWidth: 4,
    },
    taskName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    taskDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    dateLabel: {
        fontSize: 12,
        marginRight: 5,
        color: '#888',
    },
    taskDate: {
        fontSize: 12,
        color: '#888',
    },
    categoryContainer: {
        marginTop: 10,
        paddingHorizontal: 5,
    },
    taskCategory: {
        fontSize: 12,
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        backgroundColor: '#3498db',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
        elevation: 3,
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HomeScreen;