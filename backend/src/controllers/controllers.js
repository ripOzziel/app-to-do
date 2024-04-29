import { connect } from "../db";

export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body; //obtener los datos de la solicitud

        if(!name || !email || !password){ //verificar que todos los campos tengan algo
            return res.status(400).json({
                message: "se deben llenar todos los campos"
            });
        }

        const connection = await connect(); //conexion bd
        const [existingUser] = await connection.query( //consulta para evitar q se ingrese un correo duplicado
            "SELECT * FROM users WHERE email = ?", [email]
        );

        if (existingUser.length > 0) { //devolver el error
            return res.status(400).json({
                message: "el correo electrónico ya esta registrado"
            });
        }

        const [result] = await connection.query( //si no hay erroes ejecutamos la consulta
            "INSERT INTO users (name, email, password) VALUES (?,?,?)", [name, email, password]
        );

        return result.affectedRows === 1?  //validar si se actualizo la base de datos
                                res.status(201).json({
                                    message: "usuario creado"
                                }) :
                                res.status(500).json({
                                    message: "error usuario no creado"
                                });

    } catch(err) {
        console.log('error ', err);
        return res.status(500).json({
            message: "error interno en el server pa"
        });
    }

}

export const getUser = async (req, res) => {
    try{
        const { email, password } = req.body; //obtener los datos de la solicitud

        if(!email || !password){ 
            return res.status(400).json({
                message: "se deben llenar todos los campos"
            });
        }

        const connection = await connect(); 
        const [rows] = await connection.query(
            "SELECT * FROM users WHERE email = ?",[email]
        ); 

        if(rows.length == 0) { //verifica si es que se encuentra el usuario (su correo mas bien)
            return res.status(401).json({
                message: "datos incorrectos (contraseña o correo)"
            });
        }

        const user = rows[0];
        if(password !== user.password) {
            return res.status(401).json({
                message: "contraseña incorrecta pa"
            });
        }

        return res.status(200).json({ // correcto inicio de sesion
            message: "usuario encontrado",
            user:{
                id: user.id,
                name: user.name,
                email: user.email,
            }
        });

    } catch(err) {
        console.log('error ', err);
        return res.status(500).json({
            message: "error interno en el server pa"
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.idUser;
		/*
		! LO MISMO Q ENLA FUNCION DE ABAJO
        if (!req.user) {
            return res.status(401).json({
                message: "autentifica antes de eliminar la cuenta"
            });
        }
        
        const authenticatedUserId = req.user.id; 

		if (userId !== authenticatedUserId) {
            return res.status(403).json({
                message: "no estás autorizado para eliminar la cuenta de otro usuario"
            });
        }*/

        const connection = await connect();
        const [result] = await connection.query(
            "DELETE FROM users WHERE id = ?", [userId]
        );

		return result.affectedRows === 1 ?
					res.status(200).json({
                        message: "usuario eliminado exitosamente"
                    }) :
					res.status(500).json({
						message: "error al eliminar la cuenta de usuario"
					}); 

    } catch (err) {
        console.log('Error:', err);
        return res.status(500).json({
            message: "Error interno en el server pa"
        });
    }
}


export const saveTask = async (req, res) => {
    try {
        const userId = req.params.id; //obtener el id q se manda en la url
        /*
        TODO: ESTO AYUDA AUTENTICAR QUE EL QUE PUBLICA LA TAREA ES EL Q INICIO SESION YA QUE SE IMPLEMENTE EL FRONTEND CREO Q DEBEREMOS DESCOMENTARLO PARA USAR ESTO
        pq si lo deja no puedo hacer la solicitud http     

        if(!req.user){ //ver si esta utenicado el usuar
            return res.status(401).json({
                message: "usuario no autenticado, inicia sesion para crear una tarea"
            })
        }

        
        const authenticatedUserId = req.user.id; //usuario autenticado (id)

        if(userId != authenticatedUserId){
            return res.status(403).json({
                message: "no estás autorizado para crear una tarea en nombre de otro usuario"
            });
        }*/

        const {name, description, creation_date, due_date, category, importance, completed} = req.body;
        if(!name || !due_date){
            return res.status(400).json({
                message: "La tarea debe contener un nombre y una fecha de vencimiento"
            });
        }

        const connection = await connect();
        const [result] = await connection.query(
            "INSERT INTO tasks (name, description, creation_date, due_date, category, importance, completed, user_id) VALUES (?,?,?,?,?,?,?,?)",
            [name, description, creation_date, due_date, category, importance, completed, userId]
        );
   
        return result.affectedRows === 1?
                res.status(201).json({
                    message: "tarea creada"
                }) :
                res.status(500).json({
                    message: "error tarea no creada"
                });

    } catch(err) {
        console.log('error ', err);
        return res.status(500).json({
            message: "error interno en el server pa"
        });
    }
}

export const getAllTasks = async (req, res)=>{
	try {
        const userId = req.params.id;
        const connection = await connect();
        const [rows] = await connection.query(
            "SELECT * FROM tasks WHERE user_id =?  ORDER BY due_date", [userId]
        );

		if(rows.length == 0) { 
            return res.status(401).json({
                message: "No hay nada por hacer"
            });
        }

        return res.status(200).json({
            message: "tareas encontradas",
            tasks: rows
        });

    } catch(err) {
        console.log('error ', err);
        return res.status(500).json({
            message: "error interno en el server pa"
        });
    }
}

export const deleteTask = async (req, res) => {
	try{
		const userId = req.params.idUser;
        const taskId = req.params.idTask;
		
        const connection = await connect();
        const [result] = await connection.query(
            "DELETE FROM tasks WHERE id =? AND user_id =?", [taskId, userId]
        );

        return result.affectedRows === 1?
                res.status(200).json({
                    message: "tarea eliminada"
                }) :
                res.status(500).json({
                    message: "error tarea no eliminada o no encontrada"
                });
	
	} catch(err){
		console.log('error ', err);
        return res.status(500).json({
            message: "error interno en el server pa"
        });
	}
}

export const updateTask = async (req, res) => {
    try {
        const userId = req.params.idUser;
        const taskId = req.params.idTask;
        const { name, description, creation_date, due_date, category, importance, completed } = req.body;

        const connection = await connect();
        const [rows] = await connection.query(
            "SELECT * FROM tasks WHERE id = ? AND user_id = ?", [taskId, userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({
                message: "La tarea especificada no existe para el usuario dado"
            });
        }

        const fieldsToUpdate = {};
        if (name !== undefined) fieldsToUpdate.name = name;
        if (description !== undefined) fieldsToUpdate.description = description;
        if (creation_date !== undefined) fieldsToUpdate.creation_date = creation_date;
        if (due_date !== undefined) fieldsToUpdate.due_date = due_date;
        if (category !== undefined) fieldsToUpdate.category = category;
        if (importance !== undefined) fieldsToUpdate.importance = importance;
        if (completed !== undefined) fieldsToUpdate.completed = completed;

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({
                message: "No se proporcionaron campos válidos para actualizar"
            });
        }

        const [result] = await connection.query(
            "UPDATE tasks SET ? WHERE id = ? AND user_id = ?",
            [fieldsToUpdate, taskId, userId]
        );

        return result.affectedRows === 1 ?
            res.status(200).json({
                message: "Tarea actualizada correctamente"
            }) :
            res.status(500).json({
                message: "Error al actualizar la tarea o la tarea no encontrada"
            });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error interno en el servidor"
        });
    }
}


export const getTaskByCategory = async (req, res) =>{
    try {
        const userId = req.params.idUser;
        const category = req.params.category;

        if (!userId || !category) {
            return res.status(400).json({
                message: "Se deben proporcionar  el userId y la categoría"
            });
        }
		
        const connection = await connect();
        const [rows] = await connection.query(
            "SELECT * FROM tasks WHERE user_id = ? AND category = ? ORDER BY due_date", [userId, category]
        );

        if (rows.length === 0) { 
            return res.status(404).json({
                message: "No tienes ninguna tarea con esta categoría"
            });
        }

        return res.status(200).json({
            message: "Tareas encontradas por categoría",
            tasks: rows
        });

    } catch(err) {
        console.log('Error en la función getTaskByCategory:', err);
        return res.status(500).json({
            message: "Error al obtener las tareas por categoría"
        });
    }
}
