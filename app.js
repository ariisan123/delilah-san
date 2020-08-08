const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/index')

require('./dotenv')

const app = express();

require('./database/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter)




app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  console.log(`Conectado en puerto ${process.env.PORT}`);
})