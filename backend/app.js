const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
//helmet helps protect from a few vulnerabilities by setting up HTTP headers
const helmet = require('helmet');
//to put MongoDB access credentials in .env variable
require('dotenv').config({path: './config/.env'})
require('./config/db');

//Routes files
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

//Uses the default Helmet options and adds the `crossOriginResourcePolicy` middleware that allows images
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));
//to handle POST request, we need to extract the JSON body:
app.use(express.json());
app.use(cookieParser());

//for CORS errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    res.setHeader("Access-Control-Allow-Credentials", "true");
    //res.setHeader('Cache-Control', 'public, max-age=31536000' ) //mise en cache pour 1 an 60secs*60min*24heures*365jours
    next();
  });


  //routing handler : indique notre app.js comment traiter les requêtes vers la route /images en randant le dossier images statique
app.use('/images', express.static(path.join(__dirname, 'images'), { maxAge: 31536000}));

//authentification routes
app.use('/api/auth', userRoutes);
//posts routes
app.use('/api/posts', postRoutes);
//user profile routes
app.use('/api/comments', commentRoutes);


module.exports = app;