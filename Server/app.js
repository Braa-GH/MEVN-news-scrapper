const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const middlewares = require('./middlewares')

const app = express();
app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false,
}));

middlewares.global(app)
routes(app)


module.exports = app;