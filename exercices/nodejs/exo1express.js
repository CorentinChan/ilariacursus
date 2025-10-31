
var http = require('http');
let url = require('url');
const fsp = require('fs').promises;
let express=require("express");
let app=express();

app.get('/', (req, res) => {
        res.end('Bienvenue\n');
});
app.get('/about', (req, res) => {
        res.end('Bienvenue\n');
});
app.get('/file', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
     fsp.readFile('exo1.txt', 'utf8')
        .then(content => {
            res.end(content);
        })
        .catch(err => {
            res.statusCode = 500;
            res.end('Erreur de lecture du fichier : ' + err.message);
        });
});
app.get('/user/:id', (req, res) => {
        res.end('Bienvenue\n');
});
app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});

