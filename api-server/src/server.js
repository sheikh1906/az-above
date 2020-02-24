const app = require('./app');
const port = process.env.PORT || 5000;

var server = app.listen(port, function(){});

console.log('Az Above API Server started on port: ' + port);