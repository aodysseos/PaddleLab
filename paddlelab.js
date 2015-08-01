var express        = require('express');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var expressSession = require('express-session');
var methodOverride = require('method-override');
var path           = require('path');
var slashes        = require('connect-slashes');
var logger         = require('morgan');
var multer         = require('multer');
var mongoStore     = require('connect-mongo')({session: expressSession});
var mongoose       = require('mongoose');
					 require('./models/users_model.js');
					 require('./models/trainings_model.js');
var conn           = mongoose.connect('mongodb://localhost/paddlelab');

var users = require('./routes/users');
var trainings = require('./routes/trainings');

var app = express();

app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(slashes(false));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

/*Configure the multer.*/
app.use(multer({ dest: './temp/',
	rename: function (fieldname, filename) {
		return filename + Date.now();
	},
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is starting ...')
	},
	onFileUploadComplete: function (file) {
		console.log(file.fieldname + ' uploaded to  ' + file.path)
		done = true;
	}
}).single('trainingFile'));

app.use(cookieParser());
app.use(expressSession({ 
	secret: 'SECRET',
	cookie: {maxAge: 60*60*1000},
	store: new mongoStore({
		mongooseConnection: mongoose.connection,
		collection: 'sessions'
	}),
	proxy: true,
	resave: true,
	saveUninitialized: true
}));

app.use('/', users);
app.use('/', trainings);

module.exports = app;