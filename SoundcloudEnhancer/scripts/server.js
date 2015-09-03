var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var appServer = express();

//Defines a port we want to listen to
var PORT = 3000;

appServer.set('port', process.env.PORT || 3000);
appServer.set('views', __dirname + '/views');
appServer.set('view engine', 'jade');


appServer.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-type');
    next();
});

appServer.post('http://localhost:3000/users', function(req, res) {
    // Save to database
    var filename = 'usersDB.json';
    fs.readFile(filename, 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }
        var oldObject = JSON.parse(data) || '';
        var oldUsersArray = oldObject.users || [];
        var newEntries = req.body || [];
        var updatedUsersArray = oldUsersArray.concat(newEntries);
        oldObject.users = updatedUsersArray;
        fs.writeFile(filename, JSON.stringify(oldObject));
    });
    // 
});


//Create a server
var server = http.createServer(appServer);

//Lets start our server
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});
