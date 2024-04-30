const API = "http://192.168.1.188:3000";

export const createUser = async (userData) => { //userData sera los campos q ingrese el usuario, los datos pues
    const res = await fetch(`${API}/register`, { //fetch a la ruta donde se ejecuta la funcion q queremos
        method: "POST",
        headers: { //encabezado de la solicitud y lo que aceptamos
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData) //cuerpo de la solicitud, se convierte a una cadena json, objeto q contiene los datos 
    });

    if (!res.ok) { throw new Error("Error al crear usuario"); }
    return await res.json(); //leer el cuerpo de la respuesta como json
};

