var express = require('express'),
    app = express(),
    mysql = require('mysql'),
    fs = require('fs'),
    ejs = require('ejs'),
    conf = require ("./config"),
    connection = mysql.createConnection ({
      hostname: "localhost",
      port: conf.db_port,
      user:     "root",
      password: conf.db_password,
      database: "amp"
    })

app.get('/', function (req, res) {

  connection.query('SELECT * FROM playlists', function(err, rows) {
    if (err) {
      console.error('error connecting: ' + err.stack)
      return
    }

    var compiled = ejs.compile(fs.readFileSync(__dirname + '/index.ejs', 'utf8'))
    var html = compiled({rows: rows})
    res.send(html)
  })

})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Apple Music Playlists running on %s', port)
})
