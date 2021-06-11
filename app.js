var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fetch = require('node-fetch');


const cors = require('cors');

// Routes
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var udemyRouter = require('./routes/udemyApi').router;
var youtubePlaylistsRouter = require('./routes/youtubePlaylists');
var udacityRouter = require('./routes/udacityApi').router;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, './frontend/build')));


// All other GET requests not handled before will return our React app
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/udemyApi', udemyRouter);
app.use('/youtubePlaylists', youtubePlaylistsRouter);
app.use('/udacityApi', udacityRouter);

let youtubeOutput = '';
app.post('/courseYoutubeQuery', (req,res)=>{
  var course = req.body.courseQuery;
  fetch('http://localhost:5000/youtubePlaylists?query=' + course ).then(res => res.json()).then(function(data) {
    youtubeOutput = data;
    res.send(youtubeOutput);
  });
  //res.json({'courseQuery' : course});
});

let udacityOutput = '';
app.post('/courseUdacityQuery', (req,res)=>{
  var course = req.body.courseQuery;
  fetch('http://localhost:5000/udacityApi?search=' + course ).then(res => res.json()).then(function(data) {
    udacityOutput  = data;
    res.send(udacityOutput);
  });
  //res.json({'courseQuery' : course});
});

let udemyOutput = '';
app.post('/courseUdemyQuery', (req,res)=>{
  var course = req.body.courseQuery;
  fetch('http://localhost:5000/udemyApi?search=' + course ).then(res => res.json()).then(function(data) {
    udemyOutput  = data;
    res.send(udemyOutput);
    console.log(data);
  });
  //res.json({'courseQuery' : course});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
