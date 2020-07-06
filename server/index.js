const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mainRoutes = require('./routes/main');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cors = require('cors');

// DB Setup
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(mainRoutes);

// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
