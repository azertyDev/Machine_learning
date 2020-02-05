const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const config = require('../config/config').db;

// Connect to db
function handleDisconnect() {
    connection = mysql.createConnection(config); 
    connection.connect(function(err) {
        if(err) {
            console.log('error when connecting to db');
            setTimeout(handleDisconnect, 604800);
        }
        connection.on('error', function(err) {
            if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
                handleDisconnect();
            } else {
                throw err;
            }
        });
    })
}
handleDisconnect();

router.get('/', (req, res, release) => {
    connection.query('SELECT * FROM red_wine', (err, data) => {
        if (err) {
            console.log("Error in the query");
        } else {
            res.render('./pages/wine', {title: 'Wine dataset', result: data, condition: true});
        }
    });
});

module.exports = router;