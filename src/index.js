const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4001;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "netflix",
  });
  await connection.connect();
  return connection;
}

server.get("/api/movies", async (req, res) => {
  /*
      Conectarme a la base de datos
      Consulta a la base de datos: obtener las estudiantes (SELECT)
      Cerrar la conexión con la base de datos
      Envio la respuesta con los datos de las estudiantes en formato json
  */

  const connection = await getDBConnection();
  // escribir la query
  const sqlQuery = "SELECT * FROM movies";
  // ejecutar la query
  const [moviesResult] = await connection.query(sqlQuery);
  // const studentsResult = result[0];
  // result es un array que tiene dentro dos arrays, me interesa solo el primer array
  connection.end();

  if (moviesResult.length === 0) {
    res.status(404).json({
      status: "error",
      message: "No se encontraron peliculas",
    });
  } else {
    res.status(200).json({
      status: "success",
      message: moviesResult,
    });
  }
});

server.get("/api/movies", (req, res) => {
  res.status(200).json({
    success: true,
    movies: moviesResult,
  });
});


server.get('/movie/:id', async(req, res) => { 

  const connection = await getDBConnection();
console.log()

 });