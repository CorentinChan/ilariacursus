
var http = require('http');
let url = require('url');


const fsp = require('fs').promises;




http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
let q = url.parse(req.url, true);

     if (req.url === '/') {
        res.end('Bienvenue\n');

} else if (req.url === '/about') {
        res.end('<h1>About page</h1>')
    } 
  else if (q.pathname === '/default.htm') {
    let qdata = q.query;
    let text = qdata.info + ' ' + qdata.year;
        res.end(text);
    }   
    else if (req.url === '/file') {
         fsp.readFile('exo1.txt', 'utf8')
        .then(content => {
            res.end(content);
        })
        .catch(err => {
            res.statusCode = 500;
            res.end('Erreur de lecture du fichier : ' + err.message);
        });
 
          }
           else if (req.url === '/API') {
         fsp.readFile('exo1.txt', 'utf8')
        .then(content => {
            res.end(content);
        })
        .catch(err => {
            res.statusCode = 500;
            res.end('Erreur de lecture du fichier : ' + err.message);
        });
 
          }  
    else {

        res.end('page not found error 404')
    }    
}) .listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');






async function readFileExample() {
  try {
    const data =  await fsp.readFile('exo1.txt', 'utf8');

    setTimeout(() => {
  return data;
}, 2000);

  } catch (err) {
    res.end('Error reading file:', err);
  }
}