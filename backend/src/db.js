import mysql from "mysql2/promise"; //com
import { config } from "./config";

export const connect = async () => {
    return await mysql.createConnection(config);
}