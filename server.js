const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressHbs = require('express-handlebars');
const connectMongoose = require('./config/dbconnection'); //importing db connect function


//live reload
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh('/');
    }, 100);
});


const app = express();

//making db connection
connectMongoose();

app.use(connectLivereload());

//handlebar configuration
const hbs = expressHbs.create({
    defaultLayout: false, extname: 'hbs', helpers: {
      ifCond : function (arg1, operator, arg2, options) {
          switch (operator) {
              case '==':
                  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
              case '===':
                  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
              case '!=':
                  return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
              case '!==':
                  return (arg1 !== arg2) ? options.fn(this) : options.inverse(this);
              case '<':
                  return (arg1 < arg2) ? options.fn(this) : options.inverse(this);
              case '<=':
                  return (arg1 <= arg2) ? options.fn(this) : options.inverse(this);
              case '>':
                  return (arg1 > arg2) ? options.fn(this) : options.inverse(this);
              case '>=':
                  return (arg1 >= arg2) ? options.fn(this) : options.inverse(this);
              case '&&':
                  return (arg1 && arg2) ? options.fn(this) : options.inverse(this);
              case '||':
                  return (arg1 || arg2) ? options.fn(this) : options.inverse(this);
              default:
                  return options.inverse(this);
          }
      },
        basicCalculation: function (arg1, operator, arg2, options) {
            switch (operator) {
                case '+':
                    return arg1+arg2;
                case '-':
                    return arg1-arg2;
                case '*':
                    return arg1*arg2;
                case '/':
                    return arg1/arg2;
            }
        }
    }
});


//app settings

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');


app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


//routing
app.use('/', require('./routes/index'));

//products page
app.use('/products', require('./routes/products'));


//generating error
app.use(function (req, res, next) {
    next(createError(404));
});


//error handler

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    //show error

    res.status(err.status || 500);
    res.render('error');
});


//creating server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
