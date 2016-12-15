var express = require('express'),
    bodyParser = require('body-parser'),
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

app.get('/search', function (req, res) {
  res.send('gonna do a search for: ' + req.query.q);
})

app.get('/new', function (req, res) {
  var compiled = ejs.compile(fs.readFileSync(__dirname + '/new.ejs', 'utf8'))
  var html = compiled()
  res.send(html)
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/new', function (req, res) {
  console.log(req.body.name, req.body.url)

  var playlist  = {name: req.body.name, url: req.body.url}
  var query = connection.query('INSERT INTO playlists SET ?', playlist, function(err, result) {

  })
  console.log(query.sql)

  res.redirect('/')
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Apple Music Playlists running on %s', port)
})
