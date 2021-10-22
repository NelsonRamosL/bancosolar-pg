const http = require("http");
const fs = require("fs");
const url = require("url");
const { guardarUsuario, getUsuarios, editarUsuario,eliminarUsuario,registroTransferencia,getTransferencias } = require("./bd/coneccion");

http.createServer(async (req, res) => {

    if (req.url == "/" && req.method == "GET") {
        console.log(req.Url)
        fs.readFile("index.html", (err, data) => {

            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader("content-type", "text/html");
                res.end(data);
            }
        })
    }



    if (req.url == "/usuario" && req.method == "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body = chunk.toString();
        });
        console.log("guardar usuario")
        req.on("end", async () => {
            const usuario = JSON.parse(body);

            try {
                const result = await guardarUsuario(usuario);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (e) {
                console.log("error" + e)
                res.statusCode = 500;
                res.end("ocurrio un error" + e);
            }
        })
    }




    if (req.url == "/usuarios" && req.method == "GET") {
        try {
            const usuarios = await getUsuarios();
            res.end(JSON.stringify(usuarios));
        } catch (e) {
            res.statusCode = 500;
            res.end("ocurrio un error en el servidor" + e);
        }
    }
















    if (req.url.startsWith("/usuario?id") && req.method == "PUT") {
        let body = "";
        let { id } = url.parse(req.url, true).query;
        req.on("data", (chunk) => {
            body = chunk.toString();
        });
        console.log("en editar usuario")
        req.on("end", async () => {
           const usuario = JSON.parse(body);
           usuario.id = id; // agregar id a usuario 
           console.log(usuario)
            try {
                const result = await editarUsuario(usuario);
                res.statusCode = 200;
                res.end(JSON.stringify(result));
            } catch (e) {
                res.statusCode = 500;
                res.end("ocurrio un error" + e);
            }
        })
    }





    if (req.url.startsWith("/usuario?id") && req.method == "DELETE") {
        try {
            console.log("en eliminar");
            let { id } = url.parse(req.url, true).query;
            await eliminarUsuario(id);
            res.end("Usuario eliminado");
        } catch (e) {
            res.statusCode = 500;
            res.end("ocurrio un error en el servidor eliminar usuario" + e);
        }
    }






    if (req.url == "/transferencia" && req.method == "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body = chunk.toString();
        });
        console.log("guardar transferencia")
        req.on("end", async () => {
            const transferencia = JSON.parse(body);

            try {
                const result = await registroTransferencia(transferencia);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (e) {
                console.log("error" + e)
                res.statusCode = 500;
                res.end("ocurrio un error" + e);
            }
        })
    }





    if (req.url == "/transferencias" && req.method == "GET") {
        try {
            const transferencias = await getTransferencias();
            res.end(JSON.stringify(transferencias));
        } catch (e) {
            res.statusCode = 500;
            res.end("ocurrio un error en el servidor" + e);
        }
    }






}).listen(3000, console.log("SERVER ON"))