/*

let prenom = "Corentin";
let age = 34;
let ville = "Paris"

console.log("je m'apelle "+prenom+",je suis de " +ville+ " et j'ai "+age+" ans")

let nb1=5;
let nb2=6;
console.log((nb1+nb2)/2);

let ageUser;

*/

/*
ageUser=prompt("quel ages as tu?");
if(ageUser>17)console.log("tu es majeur");
    else console.log("tu es mineur");
*/

/*
let conc1=5;
let conc2="mayo"

console.log(conc1+conc2)
*/


//exo6
/*
let prix;
let prixTTC;
prix=prompt("quel prix?");
if(prix>100)prixTTC=prix*1.05;
    else prixTTC=prix*1.2;
    console.log("le prix TTC : "+prixTTC+" euros")

*/

//exo7 et 8

/*
for(var i=0;i<=10;i++) {console.log(i);  }

for(var i=0;i<=30;i++) {
    console.log(i);
    if(i%3===0) console.log("fizz")  
    if(i%5===0) console.log("buzz")  

    }
*/
//exo 9
/*
let nbTable=0;


nbTable=prompt("Entrez un nb entre 1 et 10");
if(nbTable>0 && nbTable <=10 )
{console.log("nb compris entre 0 et 10")

    for(let i=1;i<=10;i++) console.log(nbTable+"x"+i+"="+nbTable*i);

}
else alert("nb non compris entre 0 et 10");

*/

/*
//exo 10 

function named(nom){

    console.log("bonjour"+nom)
}
named("eric");
named("jose");

//exo11

named("jose");



//exo12

function pseudoGen(nom,age){
return nom+"-"+age+ Math.floor(Math.random() * 100)
}

console.log(pseudoGen("gerard",45));

let nameTable=["gege","edward","herve","jessica","sophia"];
console.table(nameTable);

//for(i=0;i<nameTable.length;i++)[console.l];

//exo13
nameTable.push("Corentin");
nameTable.shift(); 
console.table(nameTable);
*/
//exo14
/*
noteTable=[14,15,16,14,15];
console.log("la moyenne est de "+moyenneTable(noteTable));

function moyenneTable(table){
let note=0;

    for(let i=0;i<table.length;i++){
    note= note+table[i];

    }

return note/table.length;
}
*/
//exo 15
const person = {
  name: "John",
  lastName: "Doe",
  age: 50
};

console.log(person.name+" "+person.lastName+" "+person.age+" ans");

//exo16
let personnes = [
  { name: "Alice",lastName :"durand", age: 25 },
  { name: "sofiane",lastName :"malakoff", age: 30 },
  { name: "kurtulus",lastName :"kus", age: 22 }
];

for(var i=0;i<personnes.length;i++){
console.log(personnes[i].name+" "+personnes[i].lastName+" " + personnes[i].age+" ans");

}



//exo17

/*
let bts = document.querySelectorAll(".btn");
bts[0].addEventListener("click", ()=>{console.log("hello world")});
*/

function afficherConsole(){
console.log("hello world");

}



//exo18
function afficherTexte(){
document.getElementById("resultat").innerHTML="Hello world!";

}
//exo19
    window.addEventListener("load", () => {
    const texteSauve = localStorage.getItem("texteSaved");
      document.getElementById("resultat2").textContent = texteSauve;
    });

//document.getElementById("button2").addEventListener("click", afficherTexte);
function save(){
    const input = document.getElementById("texteInput");
    localStorage.setItem("texteSaved", input.value);

}


//exo20
/*
    let taskTable=[];

   window.addEventListener("load", () => {
    const taskSauve = localStorage.getItem("taskSaved");
     taskTable=JSON.parse(taskSauve);
   
        let taskDisplay="<ul>";
    for(let i=0;i<taskTable.length;i++)
    {
        taskDisplay= taskDisplay+ "<li>" + "task "+(i+1)+" : "+taskTable[i]+"</li>";
    }
        taskDisplay=taskDisplay+"</ul>"
        document.getElementById("resultatTask").innerHTML=taskDisplay;

    });

function addTask(){
    const input2 = document.getElementById("taskInput");
     taskTable.push(input2.value);
    const taskJSON = JSON.stringify(taskTable);
    console.table(taskTable);
    localStorage.setItem("taskSaved", taskJSON);
}



function deleteTask(){
    const inputNumber = document.getElementById("taskNumber");
     //taskTable.pop();
     if(inputNumber.value-1<taskTable.length)taskTable.splice(inputNumber.value-1,1);
    else  alert("cette tache n'existe pas!")

    const taskJSON = JSON.stringify(taskTable);
    console.table(taskTable);
    localStorage.setItem("taskSaved", taskJSON);
}
*/

//exo20 v2

    let taskTable=[];
    let btn ;

      

   window.addEventListener("load", () => {
    const taskSauve = localStorage.getItem("taskSaved");
     taskTable=JSON.parse(taskSauve);
         displayTask();

   });

       function displayTask(){
      let taskDisplay = "<ul>";
    for(let i=0;i<taskTable.length;i++)
    {
      //  taskDisplay +=   <li>task ${i + 1} : ${taskTable[i]}<button type="button" class="btn task-btn" data-index="${i}">close</button></li>;
        taskDisplay += `
  <li>
    task ${i + 1} : ${taskTable[i]}
    <button type="button" class="task-btn" data-index="${i}" id="btn${i}" onclick="deleteTask(${i})">close</button>
  </li>`;
    }
        document.getElementById("resultatTask").innerHTML+= taskDisplay+"</ul>";
 
}

function addTask(){
    const input2 = document.getElementById("taskInput");
     taskTable.push(input2.value);
    const taskJSON = JSON.stringify(taskTable);
    console.table(taskTable);
    localStorage.setItem("taskSaved", taskJSON);
    document.getElementById("resultatTask").innerHTML= "";
    displayTask();
}
/*
document.querySelectorAll(".task-btn").forEach(button => {
    button.addEventListener("click", () => {
        const index = button.dataset.index;  // ← Récupération ici
        console.log(`Bouton cliqué : tâche ${index}`);
        // 👉 Ici tu peux supprimer ou modifier la tâche
    });
});
*/


function deleteTask(){
    const inputNumber = document.getElementById("taskNumber");
     //taskTable.pop();
     if(inputNumber.value-1<taskTable.length)taskTable.splice(inputNumber.value-1,1);
    else  alert("cette tache n'existe pas!")

    const taskJSON = JSON.stringify(taskTable);
    console.table(taskTable);
    localStorage.setItem("taskSaved", taskJSON);
     document.getElementById("resultatTask").innerHTML= "";
    displayTask();
}

function deleteTask(index){
 if(index<taskTable.length)taskTable.splice(index,1);
    else  alert("cette tache n'existe pas!")

    const taskJSON = JSON.stringify(taskTable);
    console.table(taskTable);
    localStorage.setItem("taskSaved", taskJSON);
 document.getElementById("resultatTask").innerHTML= "";

    displayTask();
}

//ex20 par gilbert

/*
console.log("Coucou !");
 
// Accéder au champ texte
//let champ_new_tache = document.getElementById("champ_new_tache");
let champ_new_tache = document.querySelector("#champ_new_tache");
 
// Accéder au bouttnn
 
 
// Accéder à la futur liste
 
 
// Ecouter le champ texte
 
 
 
 
let add_new_tache = document.querySelector("#add_new_tache");
let resultats = document.querySelector("#resultats");
let nbel = 0;
 
add_new_tache.addEventListener("click", function(){
    // // Récupérer ce qui a été saisi dans le champs texte
    // let cequilyadanslechamps = champ_new_tache.value.trim();
 
    // // Si ce qui a été saisi n'est pas vide
    // if ( cequilyadanslechamps == "" ){
    //     console.log("Je suis parti avant !")
    //     return;
    // }
    // //console.log(cequilyadanslechamps);
 
    // // Ajouter un bouton "supprimer"
    // let champaintegrer = "<li>"+cequilyadanslechamps+" <button id='todelete"+nbel+"'> x </button></li>"
 
    // // Ajouter à la page HTML dans une liste
    // resultats.innerHTML += champaintegrer;
 
    // // Ajouter dans le localStorage*
 
 
    // nbel = nbel + 1; //nbel += 1;
 
 
});
*/