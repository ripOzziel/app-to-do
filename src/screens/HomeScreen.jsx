import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SectionList, TextInput, Alert, Image, Animated } from 'react-native';
import Constants from 'expo-constants';
import Footer from '../components/Footer.jsx';
import { getAllTask, deleteTask, getTaskByCategory } from '../../api.js';

const HomeScreen = ({ route, navigation }) => {
    const userId = route.params?.userId;
    const [tasks, setTasks] = useState([]);
    const [expandedTaskId, setExpandedTaskId] = useState(null);
    const [category, setCategory] = useState('');
    const [isSearchOpen, setSearchOpen] = useState(false);

    const searchAnim = useRef(new Animated.Value(0)).current;

    const handleSearchButtonVisibility = () => {
        setSearchOpen(true);
        Animated.timing(searchAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    const handleCancelSearch = () => {
        setCategory('');
        setSearchOpen(false);
        Animated.timing(searchAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    useEffect(() => {
        const fetchTasksOnFocus = () => {
            fetchTasks();
        };
    
        const unsubscribeFocus = navigation.addListener('focus', fetchTasksOnFocus);
        return () => {
            unsubscribeFocus();
        };
    }, [navigation, category]);
    
    useEffect(() => {
        if (category === '') { fetchTasks(); }
    }, [category]);

    const fetchTasks = async () => {
        try {
            let tasksData;
            if (category) {
                tasksData = await getTaskByCategory(userId, category);
            } else {
                tasksData = await getAllTask(userId);
            }
            setTasks(tasksData.tasks);
        } catch (err) {
            Alert.alert('Error ', err);
        }
    };

    const deleteTaskHandler = async (taskId) => {
        try {
            await deleteTask(userId, taskId);
            fetchTasks();
        } catch (err) {
            Alert.alert('Error ', err);
        }
    };

    const updateTaskHandler = async (task) => {
        navigation.navigate('FormTask', { userId: userId, taskToUpdate: task });
    };

    const renderItem = ({ item }) => {
        const isExpanded = item.id === expandedTaskId;
        return (
            <TouchableOpacity
                style={[styles.taskContainer, { borderBottomColor: getImportanceColor(item.importance) }]}
                onPress={() => setExpandedTaskId(isExpanded ? null : item.id)}
            >
                <Text style={styles.taskName}>{item.name}</Text>
                <Text style={styles.taskDescription}>{item.description}</Text>
                <Text style={styles.taskDescription}>Categoria: {item.category}</Text>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateLabel}>Creada:</Text>
                    <Text style={styles.taskDate}>{item.creation_date}</Text>
                </View>
                <View style={styles.dateContainer}>
                    <Text style={styles.dateLabel}>Vencimiento:</Text>
                    <Text style={styles.taskDate}>{item.due_date}</Text>
                </View>
                <Text style={styles.taskDate}>Hora limite: {item.due_time}</Text>
                {isExpanded && (
                    <View style={styles.actionButtonsContainer}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.deleteButton]}
                            onPress={() => deleteTaskHandler(item.id)}
                        >
                            <Text style={styles.actionButtonText}>Eliminar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.updateButton]}
                            onPress={() => updateTaskHandler(item)}
                        >
                            <Text style={styles.actionButtonText}>Actualizar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    const categorizeTask = (task) => {
        const today = new Date();
        const dueDate = new Date(task.due_date);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const endOfWeek = new Date(today);
        endOfWeek.setDate(endOfWeek.getDate() + (7 - today.getDay()));
        
        if (dueDate.toDateString() === today.toDateString()) {
            return 'HOY';
        } else if (dueDate.toDateString() === tomorrow.toDateString()) {
            return 'MAÑANA';
        } else if (dueDate <= endOfWeek) {
            return 'ESTA SEMANA';
        } else {
            return 'DESPUÉS';
        }
    };

    const organizedTasks = tasks ? tasks.reduce((acc, task) => {
        const category = categorizeTask(task);
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(task);
        return acc;
    }, {}) : {};

    const sections = Object.keys(organizedTasks).map(category => ({
        title: category,
        data: organizedTasks[category],
    }));

    return (
        <View style={styles.container}>
            {
                !isSearchOpen &&(
                <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonVisibility}>
                            <Image source={require('../../public/img/lupa.png')} style={styles.icon} />
                </TouchableOpacity>

                )
            }
            {
                isSearchOpen &&(             
             <View style={styles.inputContainer}> 
                <TextInput
                    style={[styles.input, {
                        width: searchAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['0%', '85%'],
                        }),
                        marginRight: searchAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 10],
                        }),
                    }]}
                    placeholder="Buscar por categoría"
                    value={category}
                    onChangeText={setCategory}
                />
                <Animated.View style={{
                    width: searchAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['15%', '0%'],
                    }),
                    opacity: searchAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }),
                    overflow: 'hidden',
                }}>
                </Animated.View>
                
                    <TouchableOpacity style={styles.searchButton} onPress={fetchTasks}>
                        <Image source={require('../../public/img/lupa.png')} style={styles.icon} />
                    </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelSearch}>
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
            </View>
               )
            }
            <SectionList
                sections={sections}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                )}
            />
            <Footer navigation={navigation} userId={userId} />
        </View>
    );
};


const getImportanceColor = (importance) => {
    switch (importance.toLowerCase()) {
        case 'baja':
            return '#2ecc71';
        case 'media':
            return '#3498db';
        case 'alta':
            return '#e74c3c';
        default:
            return '#ccc';
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#F0F8FF', // azul claro
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 20,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff', // blanco
        padding: 20,
    },
    searchButton: {
        backgroundColor: '#03A9F4', // azul claro
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        padding: 10,
    },
    sectionHeader: {
        backgroundColor: '#ffffff', // blanco
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    sectionHeaderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    taskContainer: {
        backgroundColor: '#FEFEFF', // blanco
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        elevation: 3,
        borderBottomWidth: 4,
        borderColor: '#f0f0f0', // gris claro
    },
    taskName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    taskDescription: {
        fontSize: 14,
        marginBottom: 5,
        color: '#666',
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
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    actionButton: {
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    deleteButton: {
        backgroundColor: '#F44336', // rojo
    },
    updateButton: {
        backgroundColor: '#2196F3', // azul
    },
    actionButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
    icon: {
        width: 20,
        height: 20,
        tintColor: '#ffffff', // blanco
    },
    cancelButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    cancelButtonText: {
        color: '#03A9F4', // azul claro
        fontWeight: 'bold',
    },
});

export default HomeScreen;