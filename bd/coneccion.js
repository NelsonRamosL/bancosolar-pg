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
    const consulta = {
        text: "UPDATE usuarios SET nombre=$1, balance=$2 WHERE id=$3 RETURNING *",
        values
    };
    const result = await pool.query(consulta);
    return result;
}




const eliminarUsuario = async (id) => {
    const result = await pool.query(`DELETE FROM usuarios WHERE id = ${id}`);
    return result.rows;
}







const registroTransferencia = async (transferencia) => {
    const values = Object.values(transferencia);
    console.log(values);

    const registrarTransferencia = {
        text: "INSERT INTO transferencias (emisor, receptor, monto, fecha) values ($1,$2,$3,'2008/12/31 13:00:00.59')",
        values: [Number(values[0]),Number(values[1]),Number(values[2])]
    };


    const agregaraUsuario = {
        text: "UPDATE usuarios SET balance=balance+$2 WHERE id=$1",
        values: [Number(values[1]),Number(values[2])]
    };

    const restaraUsuario = {
        text: "UPDATE usuarios SET balance=balance-$2 WHERE id=$1",
        values: [Number(values[0]),Number(values[2])]
    };
console.log(registrarTransferencia);
console.log(agregaraUsuario);
console.log(restaraUsuario);

    try {
        await pool.query("BEGIN");
        await pool.query(registrarTransferencia);
        await pool.query(agregaraUsuario);
        await pool.query(restaraUsuario);
        await pool.query("COMMIT");
        return true;
    } catch (e) {
        console.log("error base de datos realizar transaccion", e)
        await Pool.query("ROLLBACK");
        throw e;
    }

}





const getTransferencias = async () => {
    const consulta = {
        text : "SELECT fecha,nombre,(SELECT nombre as nombrereceptor from usuarios WHERE usuarios.id=transferencias.receptor),monto FROM transferencias INNER JOIN usuarios ON transferencias.emisor= usuarios.id",
        rowMode: "array"
            };
        
            const result = await pool.query(consulta);
            return result.rows;
        }

module.exports = { guardarUsuario, getUsuarios, editarUsuario, eliminarUsuario, registroTransferencia,getTransferencias }
