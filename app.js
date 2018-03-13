const express = require('express')
const path = require('path')
const hbs = require('hbs')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware')

const index = require('./routes/index')
const search = require('./routes/search')
const sfpsr = require('./routes/sfpsr')
const sfpsrList = require('./routes/sfpsr_list')
const sfpsrUpdate = require('./routes/sfpsr_update')
const sfpsrDelete = require('./routes/sfpsr_delete')
const pdf = require('./routes/pdf')
const viewPdf = require('./routes/view_pdf')
const legacySearch = require('./routes/legacy_search')
const addOffender = require('./routes/add_offender')
const addContact = require('./routes/add_contact')
const offenderDetails = require('./routes/offender_details')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/search', search);
app.use('/sfpsr', sfpsr);
app.use('/sfpsr_list', sfpsrList);
app.use('/sfpsr_update', sfpsrUpdate);
app.use('/sfpsr_delete', sfpsrDelete);
app.use('/pdf', pdf);
app.use('/view_pdf', viewPdf);
app.use('/legacy_search', legacySearch);
app.use('/add_offender', addOffender);
app.use('/add_contact', addContact);
app.use('/offender_details', offenderDetails);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found')
    err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
