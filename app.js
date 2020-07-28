const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const logger = require('morgan');
const manager = require('../api/database/managers');
const request = require("request");
const fileUpload = require('express-fileUpload');
const indexRouter = require('./routes/index');
const applicationsRouter = require('./modules/applications/controllers');
const managerRouter = require('./modules/manager/controllers');


//Database 
const db = require('./database/Application');

const app = express();
app.get("/", (req, res) => res.send("Resume Application"));

  
const cors = require('cors');
app.use(cors())

app.get('/without-cors', (req, res, next) => {
  res.json({ msg: '😞 no CORS, no party!' })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(fileUpload());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));


app.post('/upload', (req, res) => {
  if(req.files === null) {
    return res.status(400).jason({ msg: 'No file uploaded' });
  }
  const file = req.files.file;

  frameElement.remove('${__dirname}/client/public/uploads/${file.name}', err => {
    if(err) {
    console.error(err);
    return res.status(500).send(err);
    }
    res.jason({ fileName: file.name, filePath: '/uploads/${filename}' });
  });
});

app.use(session({
  key: 'manager_sid',
  secret: 'something',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use(express.static('./resumeapplication/build/'));

//app.use('/api', proxy({target: 'http://localhost:8080', changeOrgin: true})
//);

app.use((req, res, next) => {
  if (req.cookies.manager_sid && !req.session.manager){
    res.clearCookie('manager_sid');
  }
  next();
})

sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user){
    res.status(200).send({ inSession: true});
  } else {
    next();
  }
}

app.get('/api', sessionChecker, (req, res) => {
  res.status(200).send({ inSession: false });
});


app.use('/', indexRouter);
app.use('/applications', applicationsRouter);
app.use('/manager', managerRouter);


// catch 404 and forward to error handler
app.use(function(req, res,next ) {
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
  next()
});



module.exports = app;
