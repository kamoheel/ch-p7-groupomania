const express = require('express');
const path = require('path');
//helmet helps protect from a few vulnerabilities by setting up HTTP headers
const helmet = require('helmet');
//to put MongoDB access credentials in .env variable
require('dotenv').config({path: './config/.env'})
require('./config/db');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

const app = express();

//Uses the default Helmet options and adds the `crossOriginResourcePolicy` middleware that allows images
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
//to handle POST request, we need to extract the JSON body:
app.use(express.json());

//for CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//authentification routes
app.use('/api/auth', userRoutes);
//sauces routes
app.use('/api/posts', postRoutes);
//routing handler : indique notre app.js comment traiter les requêtes vers la route /images en randant le dossier images statique
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;