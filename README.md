Readme 



datos base de datos posgresql

CREATE DATABASE bancosolar;

\c bancosolar

CREATE TABLE usuarios (id SERIAL PRIMARY KEY, nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0));


CREATE TABLE transferencias (id SERIAL PRIMARY KEY, emisor INT, receptor
INT, monto FLOAT, fecha TIMESTAMP, FOREIGN KEY (emisor) REFERENCES
usuarios(id), FOREIGN KEY (receptor) REFERENCES usuarios(id));


para poder listar las transferencias con los respectivos nombres de los usuarios realise un INNER JOIN y una sub consulta.

SELECT fecha,nombre,(SELECT nombre as nombrereceptor from usuarios WHERE usuarios.id=transferencias.receptor),monto FROM transferencias INNER JOIN usuarios ON transferencias.emisor= usuarios.id"
    
