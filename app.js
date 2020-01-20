var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var cors = require("cors");

// Importaciones para ejecutar el cron
const Cronjob = require('./models/jobsModel');
const cron = require('node-cron');
const axios = require('axios');
const config = require('./config');

// End Importaciones para ejecutar el cron

/** Importación de las rutas */
var jobsRouter = require("./routes/jobs");

var app = express();

let crons = require('./controllers/cron');
// Conexión base de datos
let mongoose = require('./connection/mongo');

// Importar middleware para manejo de errores
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require("./middleware/errorHandlers");

// Middleware para 404
const notFoundHandler = require("./middleware/notFoundHandler");

// Importar body parser
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");


  next();
});

// Ejecutar crons desde la base de datos
Cronjob.find((err, data) => {

  let crons = {};

  for (d of data) {
    crons[d._id] = cron.schedule(d.cron, async () => {
      console.log(`Ejecutando: ${d.name} - Path: ${d.path} - Hora: ${new Date()}`);
      if (d.path) {
        try {
          await axios.get(d.path);
        } catch (error) {
          console.error(error);
          let url = `${config.url_servicio}/general/api/v1/system/addErrorLog`;
          let body = {
            "message": `Error al ejecutar el cron: ${d.name}`,
            "source": "cronjobs",
            "detail": error
          };

          try {
            axios.post(url, body).then(rta => {
              console.log('rt', rta);
              console.log('Error reportado');
            }).catch(error => {
              console.log(`message: "Error al obtener recurso externo " + ${url},
              error: ${error.response ? error.response.data : error}`);
            });
          } catch (error) {
            console.error(error);
          }

        }
      }
    });

    crons[d._id].start();

  }

  app.set('crons', crons);
})

// End Ejecutar crons desde la base de datos

// Rutas
app.use("/cronjobs/api/v1", jobsRouter);

// Capturar 404
app.use(notFoundHandler);

// Middleware para el manejo de errores
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.disable("x-powered-by");

module.exports = app;