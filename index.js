const express = require('express')
const db = require('./config/database');

const app = express()

app.disable('x-powered-by');

// BODY PARSER
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// STATIC
app.use(express.static(__dirname + '/public'));

// ROUTES
app.use('/todos', require('./routes/todos'));

app.listen(3000)