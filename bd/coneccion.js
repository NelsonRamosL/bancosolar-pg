/**
 * 
 * 1. Utilizar el paquete pg para conectarse a PostgreSQL y realizar consultas DML para la
gestión y persistencia de datos. (3 Puntos)
 * 
 */

const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "bancosolar",
    port: 5432
});



const guardarUsuario = async (usuario) => {
    const values = Object.values(usuario);
    const consulta = {
        text: "INSERT INTO usuarios (nombre, balance) values ($1,$2)",
        values
    };
    const result = await pool.query(consulta);
    return result;
}





const getUsuarios = async () => {
    const result = await pool.query("SELECT * FROM usuarios");
    return result.rows;
}








const editarUsuario = async (usuario) => {
    const values = Object.values(usuario);
    console.log(usuario)
    const consulta = {
        text: "UPDATE usuarios SET nombre=$1, balance=$2 WHERE id=$3 RETURNING *",
        values
    };
    const result = await pool.query(consulta);
    return result;
}




const eliminarCandidato = async (id) => {
    const result = await pool.query(`DELETE FROM usuarios WHERE id = ${id}`);
    return result.rows;
}













module.exports = { guardarUsuario,getUsuarios,editarUsuario }
