/*
req is an object containing information about the HTTP request that raised the event
In response to req, you use res to send back the desired HTTP response
*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

// Display all Devices in localhost:8080/devices
app.get('/devices', function(req, res, next) { // If I change /devices for /devicestest, everything will be printed in /devicestest
    /*devices = [
        { 
            'id': 1, 
            'name': 'Lampara 1', 
            'description': 'Luz living', 
            'state': 0, 
            'type': 1, 
        },
        { 
            'id': 2, 
            'name': 'Ventilador 1', 
            'description': 'Ventilador Habitacion', 
            'state': 1, 
            'type': 2, 
        },
    ]
    res.send(JSON.stringify(devices)).status(200);*/
    utils.query("SELECT * FROM Devices", function(err, answer){
        if (err){
            answer.send(err).status(400);
            return;
        }
        res.send(answer).status(200);
    });
});

app.get("devices/:id", function(req, res, next){
    utils.query("SELECT * FROM Devices WHERE id=?", [req.params.id], function(err, answer){
        if (err){
            res.send(err).status(400);
            return;
        }
        res.send(answer).status(200);
    });
});


// POST
app.post('/devices', function(req, res, next){
    console.log("entro a app.post");
    console.log("req.body: ", req.body);
    id = req.body.id.split("_")[1]; //device_i
    current_status = req.body.state;
    console.log("STATUSSSS: ", current_status);
    console.log("id: ", id);
    name1 = req.body.name;

    console.log("req.body.id", req.body.id);
    
    utils.query('UPDATE Devices SET state=? WHERE id=?', [current_status,id], function(err, answer, field){
        if (err){
            res.send(err).status(400);
            console.log("Error updating Devices");
            return;
        }
        res.send(JSON.stringify(req.body));
    });
    //res.send(JSON.stringify(req.body));
    //console.log("End");
});

// Let's listen out to the port, so we know that everything is working OK
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly in port " + PORT);
});

//=======[ End of file ]=======================================================
