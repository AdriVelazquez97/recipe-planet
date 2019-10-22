const cors = require('cors');
const express = require('express');
const morgan = require('morgan')

const apiRouter = require('./routes');
const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipe-planet', {useNewUrlParser: true});

app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

app.use('/api', apiRouter);


// Init server
app.listen(8080, (err) => {
  console.info('\n\n' + '>'.repeat(40));
  console.info(`💻  Reboot Server Live`);
  console.info(`📡  PORT: http://localhost: 8080`);
  console.info(">".repeat(40) + "\n\n");
})