/*jslint devel:true, node: true */
'use strict';
var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// serve everything in /public folder as static content
app.use(express.static('public'));

// configure view tempalte engine
app.set('views', './src/views');

// jade config
//app.set('view engine', 'jade');

// handlebars
//var handlebars = require('express-handlebars');
//app.engine('.hbs', handlebars({extrem: '.hbs'}));
//app.set('view engine', '.hbs');

// ejs
app.set('view engine', 'ejs');

var nav = [
  {link: '/books', text: 'Books'},
  {link: '/authors', text: 'Authros'}
];

// book route
var booksRouter = require('./src/routes/bookRoute')(nav);
app.use('/books', booksRouter);

// route '/'  to index
app.get('/', function (req, res) {
  res.render('index', {title: 'title goes here', nav: nav});
});

app.listen(port, function (err) {
  if (err) {
    console.log('Error:', err);
  }
  console.log('running server on port ' + port);
});
