import { Router } from "express"; //enrutador que usa express
import { 
        createUser, 
        deleteTask, 
        deleteUser, 
        getAllTasks, 
        getTaskByCategory, 
        getTaskById, 
        getUser, 
        saveTask,
        updateTask
    } from "../controllers/controllers";

const router = Router();

router.post('/register', createUser);
router.post('/login', getUser);
router.delete('/:idUser/delete', deleteUser);
router.post('/:id/task/create', saveTask);
router.get('/:id/tasks', getAllTasks);
router.get('/:id/:idTask/showTask', getTaskById);
router.delete('/:idUser/task/:idTask/delete', deleteTask);
router.put('/:idUser/task/:idTask/update', updateTask);
router.get('/:idUser/tasks/:category', getTaskByCategory);

export default router;