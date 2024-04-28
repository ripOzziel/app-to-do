import { Router } from "express"; //enrutador que usa express
import { 
        createUser, 
        getUser 
    } from "../controllers/controllers";

const router = Router();

router.post('/register', createUser);
router.get('/login', getUser);


export default router;