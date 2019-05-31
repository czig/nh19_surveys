var express = require("express");

var app = express();

app.use(express.static('dist'))

app.use('/css', express.static(__dirname + '/dist/css'));
app.use('/js', express.static(__dirname + '/dist/js'));
app.use('/images', express.static(__dirname + '/dist/images'));

var server = app.listen(8081, function() {
    var port = server.address().port;
    console.log("Webserver started at http://localhost:%s", port);
})
