import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Constants from 'expo-constants';
import Footer from '../components/Footer.jsx';
import { getAllTask, deleteTask, getTaskByCategory } from '../../api.js';

const HomeScreen = ({ route, navigation }) => {
    const userId = route.params?.userId;
    const [tasks, setTasks] = useState([]);
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [category, setCategory] = useState('');

    const fetchTasks = async () => {
        try {
            let tasksData;
            if (category) {
                tasksData = await getTaskByCategory(userId, category);
            } else {
                tasksData = await getAllTask(userId);
            }
            setTasks(tasksData.tasks);
        } catch (error) {
            console.error('Error al obtener las tareas:', error);
        }
    };

    const deleteTaskHandler = async (taskId) => {
        try {
            await deleteTask(userId, taskId);
            fetchTasks();
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }
    };

    const updateTaskHandler = async (taskId) => {
        console.log('id de la tarea a actualizar ', taskId);
        navigation.navigate('FormTask', { userId: userId, taskId: taskId });
    }

    useEffect(() => {
        fetchTasks();
    }, [category]);

    const renderItem = ({ item }) => {
        const isExpanded = item.id === expandedTaskId;
        return (
            <TouchableOpacity
                style={[styles.taskContainer, { borderBottomColor: getImportanceColor(item.importance) }]}
                onPress={() => setExpandedTaskId(isExpanded ? null : item.id)}
            >
                <Text style={styles.taskName}>{item.name}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Text style={styles.taskDescription}>categoria: {item.category}</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateLabel}>Creada:</Text>
                    <Text style={styles.taskDate}>{item.creation_date}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateLabel}>Vencimiento:</Text>
                    <Text style={styles.taskDate}>{item.due_date}</Text>
                </View>
                {isExpanded && (
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => deleteTaskHandler(item.id)}
                        >
                            <Text style={styles.actionButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => updateTaskHandler(item.id)}
                        >
                            <Text style={styles.actionButtonText}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar por categoría"
                    value={category}
                    onChangeText={setCategory}
                />
                <TouchableOpacity style={styles.searchButton} onPress={fetchTasks}>
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={tasks}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.taskList}
            />
            <Footer navigation={navigation} userId={userId} onAddTask={fetchTasks} />
        </View>
    );
};

const getImportanceColor = (importance) => {
    switch (importance.toLowerCase()) {
        case 'low':
            return '#2ecc71';
        case 'medium':
            return '#3498db';
        case 'high':
            return '#e74c3c';
        default:
            return '#ccc';
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
        paddingBottom: 70,
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
    actionButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    actionButton: {
        backgroundColor: '#3498db',
        padding: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    actionButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchButton: {
        backgroundColor: '#715CF8',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    searchButtonText: {
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 8,
    },
});

export default HomeScreen;
