const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const aspiranteRouters = require('./src/routes/aspiranteRoute');
const app = express();
const port = process.env.PORT || 9000;
const cors = require("cors");

const corsOptions = {
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/', aspiranteRouters);

// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlass'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Server listening on port',port));
