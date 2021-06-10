var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const cors = require('cors'); /*#7: schezfaz*/
const bodyParser =  require('body-parser'); /*#7: schezfaz*/
const fetch = require('node-fetch');

// Routes

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var udemyRouter = require('./routes/udemy-api').router;
var youtubePlaylistsRouter = require('./routes/youtubePlaylists');
 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//configuring the middleware
app.use(cors());

//setting bodyparser to convert data to json
app.use(bodyParser.json()); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/udemy-api', udemyRouter);
app.use('/youtubePlaylists', youtubePlaylistsRouter);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//setting custom routes
app.get('/', (req,res)=> {
  //res.send("hello world");
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
}) 


// app.get('/peepee', (req,res)=> {
//   console.log(req.query.query);
//   //res.send("hello world");
//   console.log("peepee");
// }) 

app.post('/courseQuery', (req,res)=>{
  console.log(req.body);
  var course = req.body.courseQuery;
  var youtubeOutput = '';
  fetch('http://localhost:3000/youtubePlaylists?query=' + course ).then(res => res.json()).then(function(data) {
    youtubeOutput = data;
    console.log(youtubeOutput);  //expecting array
  });


  //call youtube
  res.json({'courseQuery' : course});
})

const asciidoctor = require('asciidoctor')() ;
const content = 'http://asciidoctor.org[*Asciidoctor*] ' +
  'running on https://opalrb.com[_Opal_] ' +
  'brings AsciiDoc to Node.js!';
const html = asciidoctor.convert(content) ;
console.log(html);


// app.use('/', indexRouter);
// app.use('/users', usersRouter);



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
