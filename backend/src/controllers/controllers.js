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
                message: "El correo electrónico ya está registrado"
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