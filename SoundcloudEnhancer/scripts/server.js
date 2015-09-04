var express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var appServer = express();

//Defines a port we want to listen to
var PORT = 3000;

appServer.set('port', process.env.PORT || 3000);
appServer.set('views', __dirname + '/views');
appServer.set('view engine', 'jade');

appServer.use(bodyParser.json());

appServer.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-type');
    next();
});

appServer.post('/users', function (req, res) {
    // Save to database
    var filename = 'usersDB.json';

    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }   

        var oldObject = JSON.parse(data) || '';
        var oldUsersArray = oldObject.users || [];
        var newEntries = req.body || [];
        var updatedUsersArray = oldUsersArray.concat(newEntries);
        oldObject.users = updatedUsersArray;
        fs.writeFile(filename, JSON.stringify(oldObject));
        console.log('user saved!');
        var response = {
            status  : 200,
            success : 'User Added Successfully'
        };

        res.end(JSON.stringify(response));
    });
    // 
});


//Create a server
var server = http.createServer(appServer);

// starts server
server.listen(PORT, function() {
    //Callback triggered when server is successfully listening.
    console.log("Server listening on: http://localhost:%s", PORT);
});
