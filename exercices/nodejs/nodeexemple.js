
/*
const fs = require('fs');

// Read file asynchronously with callback
fs.readFile('exo1.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File content:', data);
});
*/

let url = require('url');
let adr = 'http://localhost:8080/default.htm?year=2017&month=february';

let q = url.parse(adr, true);

console.log(q.host);
console.log(q.pathname);
console.log(q.search);

let qdata = q.query;
console.log(qdata.month);


const fs = require('fs');
const content = qdata.month + '\n' + qdata.year;

var http = require('http');
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Corentin!\n'+ content);
}) .listen(8888, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8888/');


try {
  fs.writeFileSync('exo1write.txt', content);
  // file written successfully

} catch (err) {
  console.error(err);
}




const content2 = q.host + q.pathname;

fs.appendFile('o1write.txt', content2, err => {
  if (err) {
    console.error(err);

    

  } else {
    // done!
  }
});

const fsp = require('fs').promises;

async function readFileExample() {
  try {
    const data = await fsp.readFile('exo1.txt', 'utf8');
    console.log('File content:', data);
  } catch (err) {
    console.error('Error reading file:', err);
  }
}
readFileExample();

const mod1=require('./module1');
mod1.printconsole(mod1.multiplier(2,5));



/*
async function callAPI() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json(); // It's cleaner to await here
    


  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

*/

/*
//call API with return
async function callAPI() {
  try {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json(); // on attend la réponse JSON
    return data; // ✅ on retourne la valeur ici
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

// Exemple d’utilisation :
(async () => {
  const resultat = await callAPI(); // on attend le retour de la fonction
  console.log(resultat); // on affiche le résultat
})();

*/