const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session)
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const serviceRouter = require('./routes/services_routes');
const authRouter = require("./routes/auth_routes");

// Handled By Heroku 
const port = process.env.PORT || 3003

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(session({
    // resave and saveUninitialized set to false for deprecation warnings
    secret: "Express is awesome",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

require("./config/passport");
app.use(passport.initialize());
app.use(passport.session());

// .env Handled by Heroku 
const dbConn = process.env.DBURL ? process.env.DBURL : 'mongodb://localhost/refcon_group'
// Set four properties to avoid deprecation warnings:
mongoose.connect(dbConn, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    },
    (err) => {
        if (err) {
            console.log('Error connecting to database', err);
        } else {
            console.log('Connected to database!');
        }
    });

// Routing
// Testing Connection to Heroku
app.get('/', (req, res) => {
    console.log(res);
    console.log(req);
    res.send('got your request');
});

app.use('/services', serviceRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
	console.log(`REFCON group MERN app listening on port ${port}`)
})