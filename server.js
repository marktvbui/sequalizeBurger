var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();
var PORT = process.env.PORT || 3030;
var db = require('./models');

app.use(express.static('assets'));

app.user(bodyParser.urlencoded({extended: true}));

app.use(methodOverride{'_method'});

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs([defaultLayout: 'main']));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burger_controller.js');
app.use('/', routes);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log('Big Brother is listening on port ' + PORT);
  });
});