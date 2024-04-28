import express from "express"; //framework de node
import cors from "cors";
import morgan from "morgan"; //esto controla el registro de las solicitudes HTTP
import router from "./routes/routes";

const app = express(); //instanciar la aplicacion express

app.use(cors()); //? permitir las solicitudes desde cualquier origen
app.use(morgan("dev")); //? ver peticiones HTTP por consola
app.use(express.json()); //? analizar el cuerpo de las solicitados como json
app.use(router); //? montar las rutas definidas

export default app;