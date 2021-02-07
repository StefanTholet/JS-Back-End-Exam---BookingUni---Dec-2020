const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');

module.exports = (app) => {
    app.engine('.hbs', handlebars({ extname: '.hbs' }));

    app.set('view engine', '.hbs');

    app.use(express.static('public'));

    app.use(express.urlencoded({
        extended: true
    }));

    app.use(session( {
        secret: 'big secret',
        resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
    }))
}