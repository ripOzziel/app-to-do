const API = "http://192.168.1.76:3000"; //! aqui va la direccion ip q tiene tu compu seguido del puerto 3000, si le dejaba la q tenia el video el servidor tardaba mucho en responder pq kien sabe

export const createUser = async (userData) => { // userData sera los campos q ingrese el usuario, los datos pues
    const res = await fetch(`${API}/register`, { // fetch a la ruta donde se ejecuta la funcion q queremos
        method: "POST",
        headers: { //encabezado de la solicitud y lo que aceptamos
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData) //cuerpo de la solicitud, se convierte a una cadena json, objeto q contiene los datos 
    });

    if (!res.ok) { throw new Error(`Error al crear un usuario: ${res.statusText}`); }
    return await res.json(); //leer el cuerpo de la respuesta como json
};

export const getUser = async (userData) => {
    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData)
    });

    if (!res.ok) {
        throw new Error(`Error al iniciar sesión: ${res.statusText}`);
    }

    return await res.json(); 
}


export const deleteUser = async (userId) => {
    //TODO: LLENAR FUNCION
    console.log('aqui ira el contenido de la funcion eliminar la cuenta del usuario')
}

export const saveTask = async (userId, taskData) => {
    const res = await fetch(`${API}/${userId}/task/create`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData)
    });

    if (!res.ok) {
        throw new Error(`Error al crear tarea: ${res.statusText}`);
    }

    return await res.json();
}

export const getAllTask = async (userId) => {
    const res = await fetch(`${API}/${userId}/tasks`, {
        method: "GET"
    })
    const data = await res.json();
    console.log('Datos de las tareas:', data);

    return data;
}

export const deleteTask = async (userId, taskId) => {
    console.log('aqui ira el contenido de la funcion para eliminar tareas')
    console.log(userId)
    const res = await fetch(`${API}/${userId}/task/${taskId}/delete`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error(`Error al crear tarea: ${res.statusText}`);
    }

    return await res.json();
}

export const updateTask = async (userId, taskId, taskData) => {
    //TODO: LLENAR FUNCION
    console.log('aqui ira el contenido de la funcion para actualizar tareas')
}

export const getTaskByCategory = async (userId, category) => {
    //TODO: LLENAR FUNCION
    console.log('aqui ira el contenido de la funcion para obtener tareas por su categoria')
}