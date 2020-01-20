const mongoose = require('mongoose');
const db = 'jobs';

if (process.env.ENV == 'dev') {
  connectionString = `mongodb://mongo-database:27017`;
} else if (process.env.ENV == 'prod') {
  connectionString = `mongodb://mongo-database:27017`;
} else {
  connectionString = `mongodb://localhost:27017`;
}

mongoose
  .connect(connectionString, {
    dbName: db,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Ingresando a la base de datos <<${db}>> con éxito`);
  })
  .catch(err => {
    console.log(`Error de conexión: ${err}`);
    next(err);
  })