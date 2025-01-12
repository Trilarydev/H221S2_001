var express = require('express');
 
 
var app = express();
 
 
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
 
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});
 
app.get('/login', function (req, res) {
    res.sendFile(__dirname + "/login.html");
});
 
const puerto = process.env.PUERTO || 3000;
 
app.listen(puerto, function () {
  console.log("Servidor funcionando en puerto: " + puerto);
});
 
//Recursos
app.use(express.static(__dirname+'/'));
 
 
 
 
var mysql = require("mysql");
 
var cors = require("cors");
 
app.use(express.json());
app.use(cors());
 
var conexion = mysql.createConnection({
  host: "44.213.9.117",
  user: "valery",
  password: "valery",
  database: "formulario2",
});
 
conexion.connect(function (error) {
    if (error) {
      throw error;
    } else {
      console.log("Conexión exitosa");
    }
  });
 
 
 
app.post("/api/pedido", (req, res) => {
    let data = {
        userped: req.body.USERPED,
        emausped: req.body.EMAUSPED,
        foodped: req.body.FOODPED,
        msgped: req.body.MSGPED
    };
    let sql = "INSERT INTO pedido SET ?";
    conexion.query(sql, data, function (error, results) {
    if (error) {
        throw error;
    } else {
        console.log(data);
        res.send(data);
    }
    });
  });