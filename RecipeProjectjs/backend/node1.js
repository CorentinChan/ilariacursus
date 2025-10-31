
var http = require('http');
let url = require('url');
const fsp = require('fs').promises;
let express=require("express");
const bcrypt = require('bcryptjs');
let app=express();
let ejs = require('ejs');
const cookieParser = require('cookie-parser');
const path = require('path'); 
const bodyParser = require('body-parser')
var mysql      = require('mysql2'); 



app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

 let pseudo = "";
  

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'recipeproject',
  multipleStatements: true
});
 
connection.connect(err => {
  if (err) {
    console.error('❌ Erreur de connexion à MySQL :', err.message);
  } else {
    console.log('✅ Connecté à la base MySQL !');
  }
});


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend'));

 app.use(express.static(path.join(__dirname, '..', 'frontend')));


app.get('/', (req, res) => {
        res.render('home',{user : 'user'});
        

});
app.get('/home', (req, res) => {

         connection.query('SELECT * FROM recipe ', function (error, result, fields) {
    if (error) throw error;
    // Neat!
        console.log(result);
        console.log(fields);

    res.render('home',{user : pseudo});

              });

    
});

app.get('/recipe', (req, res) => {
     pseudo = req.cookies.pseudo;

     let recipeID= req.cookies.recipeID;

   let recipe;let steps; let ingredients;

    console.log(req.cookies.pseudo+ " : " + req.cookies.pseudoID );
    connection.query( `SELECT * FROM recipe WHERE id = ?; SELECT * FROM instructions WHERE recipeID = ?;
      SELECT * FROM liste_ingredients WHERE recipeID = ?;SELECT * FROM tagsList WHERE recipeID = ?;SELECT * FROM commentaires WHERE recipeID = ?;`,
  [recipeID, recipeID, recipeID,recipeID,recipeID], function (error, result, fields) {
    if (error) throw error;
    recipe=result[0][0];
    steps=result[1];
    ingredients=result[2];
    tags=result[3];
    comment=result[4]
    console.log(recipe);console.log(steps);console.log(ingredients);console.log(tags);console.log(comment);
     
  res.render('recipe',{ title: 'Recipe page' ,user : pseudo, recipe : recipe,instructions : steps,
    ingredients:ingredients, tags:tags,commentaires : comment });

  });     
 

});

app.get('/recipeform', (req, res) => {
       pseudo = req.cookies.pseudo;
           connection.query('SELECT * FROM category ', function (error, result, fields) {
    if (error) throw error;
            
            console.log(result)
            res.render('recipeForm',{ title: 'Recipe page' ,user : pseudo, category : result});
            
            });

});


    
app.get('/search', (req, res) => {
       pseudo = req.cookies.pseudo;

       connection.query('SELECT * FROM recipe ', function (error, result, fields) {
    if (error) throw error;
    // Neat!
        console.log(result);
        console.log(fields);


   res.render('search', { 
  title: 'Recipe page',user : pseudo ,
  recipes : result
   });        

    
});        

});

app.get('/login', (req, res) => {
  console.log("login");
        if(!pseudo) res.render('login',{user : pseudo, erreur : ""});
        
});

app.get('/contact', (req, res) => {
        res.render('contact',{user : pseudo, erreur : ""});
        
});



app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});




app.post('/signup', (req, res) => {
    console.log(req.body);
    
const salt = bcrypt.genSaltSync(10);
const hashmdp = bcrypt.hashSync(req.body.password, salt);


    let post  = {
        pseudo: req.body.pseudo,
        mail: req.body.mail,
        mdp:  hashmdp,
       
    }; 
    var query = connection.query('INSERT INTO users SET ?', post, function (error, results, fields) {
    if (error) throw error;
    // Neat!
    });
    console.log(query.sql); // INSERT INTO contact SET `id` = 1, `title` = 'Hello MySQL'
   res.redirect('/');

    //res.redirect('/contact?form=ok&email='+req.body.email);
    //res.render('contact');
});

app.post('/logout', (req, res) => {
    res.clearCookie('pseudo');
    res.clearCookie('pseudoID');
    console.log('Cookie "pseudo" supprimé ✅');
 res.redirect(req.get('referer'));
});

app.post('/signin', (req, res) => {
    console.log(req.body);
    let mail=req.body.mail;
      let mdp=req.body.password;
    connection.query('SELECT * FROM users WHERE mail = ?',[mail], function (error, result, fields) {
    if (error) throw error;
    // Neat!
        
      if(result&&result.length>0){
          hash=result[0].mdp;
            console.log(result[0].pseudo + result[0].id); 
            let pseudoBDD=result[0].pseudo;
            let pseudoIDBDD=result[0].id;
                      bcrypt.compare(mdp, hash, (err, result) => {
                          if (err) {
                              // Handle error
                              console.error('Error comparing passwords:', err);
                              return;
                          }

                      if (result) {
                          console.log('Passwords match! User authenticated.');
                              res.cookie('pseudo', pseudoBDD, {
                              maxAge: 3600000,   // expire dans 1h
                              httpOnly: true,    // inaccessible côté client (document.cookie)
                              secure: false,     // true si HTTPS
                            });

                            res.cookie('pseudoID', pseudoIDBDD, {
                              maxAge: 3600000,   // expire dans 1h
                              httpOnly: true,    // inaccessible côté client (document.cookie)
                              secure: false,     // true si HTTPS
                            });

                             res.redirect('/profil');

                      } else {
                          // Passwords don't match, authentication failed
                          console.log('Passwords do not match! Authentication failed.');
                          res.render('login',{user : pseudo, erreur : "mdp"});
                      }
                      });

      }
     
      
app.get('/profil', (req, res) => {
    // Lire le cookie nommé "pseudo"
    const pseudo = req.cookies.pseudo;

    if (pseudo) {
       console.log(`Bonjour ${pseudo} 👋`);
    } else {
        console.log('Aucun cookie "pseudo" trouvé');
    }
    res.send(`<script>    const iframe = window.parent.document.getElementById('overlay1'); 
      if(iframe) iframe.style.display = 'none';window.parent.location.reload(); </script>`);
  

});

   // if(bcrypt.compareSync(mdp, hash))   console.log("connexté!")
      
      //res.redirect(req.get('referer')); 
    //res.redirect('/contact?form=ok&email='+req.body.email);
    //res.render('contact');

    });

    

});


app.post('/createRecipe', (req, res) => {
    console.log(req.body);
 
if(pseudo){
    let post  = {
        title: req.body.title,
        description: req.body.description,
        image:  req.body.image,
        totalTime:  req.body.toamTime,
        activeTime:  req.body.activeTime,
        auteur : req.body.auteur,
        categoryID : req.body.category,
    }; 

     
        let step = req.body.step.filter(item => item !== null); 
        let tag = req.body.tag.filter(item => item !== null); 
      console.log(tag);
         /*
        let ingredient = req.body.ingredient.filter(item => item !== "");  
         let measure = req.body.measure.filter(item => item !== null);  
         */
        
            // On filtre les deux tableaux en même temps :

            let ingredient = req.body.ingredient;
            let measure = req.body.measure;

            // On filtre les deux tableaux en même temps :
            let filtered = ingredient
              .map((ing, index) => ({ ingredient: ing, measure: measure[index] }))
              .filter(item => item.ingredient && item.ingredient.trim() !== ""); // garde seulement si ingredient non vide

            // Puis on sépare à nouveau :
            ingredient = filtered.map(item => item.ingredient);
            measure = filtered.map(item => item.measure);

            console.log(ingredient);console.log(measure);
    
    
    var query = connection.query('INSERT INTO recipe SET ?', post,
       function (error, results, fields) {
    if (error) throw error;
    const recipeID = results.insertId;  // ← récupère l’ID auto-incrémenté
    console.log('Dernier recipeID inséré =', recipeID);

            const stepPost = step.map(txt=> [ txt, recipeID ]);
          /*  const ing = ingredient.map(txt=> [ txt, recipeID ]);
            const ingPost= measure.map(txt=> [ txt, ing ]);*/
            const ingPost = ingredient.map((ingTexte, index) => {
            const measureTexte = measure[index];      // correspondante
            return [ ingTexte, measureTexte, recipeID ];
          });
           if(tag.length>0){  const tagPost = tag.map(txt=> [ txt, recipeID ]); }

         listPost = {
          recipeID : recipeID,
          userID : req.cookies.pseudoID,
          type : 'ownrecipe',
         }

         if(step.length>0){
   connection.query('INSERT INTO instructions (instruction, recipeID) VALUES ?', [ stepPost ], (err2) => {
        console.log("instructions insert");
    if (err2) throw err2;});
   }
            if(ingredient.length>0){ 
              connection.query('INSERT INTO liste_ingredients ( ingredient, measure, recipeID) VALUES ?',[ ingPost ], (err3) => {
                               console.log("ingredients insert");

                if (err3) throw err3; });
            }

            if(tagP.length>0){ 
                    connection.query('INSERT INTO tagslist (tag, recipeID) VALUES ?', [ tagPost ], (err4) => {
                                            console.log("tag insert");

                      if (err4) throw err4; });
                    }

            if(recipeID!=''){
           connection.query('INSERT INTO recipe_list SET ?', listPost, (err4) => {           
             console.log("list insert");
        if (err4) throw err4; });
           }
    });
    console.log(query.sql); // INSERT INTO contact SET `id` = 1, `title` = 'Hello MySQL'
  }
  else console.log("not connected!")
   res.redirect('/');

});



app.post('/goRecipe', (req, res) => {
        console.log("url "+req.body.recipeID);
          res.clearCookie('recipeID');
        res.cookie('recipeID', req.body.recipeID, {
          maxAge: 3600000,   // expire dans 1h
          httpOnly: true,    // inaccessible côté client (document.cookie)
          secure: false,     // true si HTTPS
        });

  console.log(" recipe ID = " + req.body.recipeID);
  res.redirect('/recipe');
});


app.post('/searchRecipes', (req, res) => {

        res.cookie('searchKey', req.body.textSearch, {
          maxAge: 3600000,   // expire dans 1h
          httpOnly: true,    // inaccessible côté client (document.cookie)
          secure: false,     // true si HTTPS
        });
         let filter="";

         //differentes options du sortby form-select
         switch (req.body.searchFilter) {
  case '':
    filter="";
    break;
  case 'title':
    filter=" ORDER BY title ASC";
    break;
  case 'date':
   filter=" ORDER BY date DESC";
    break;
  default:
     filter="";
}

         connection.query(`SELECT * FROM RECIPE WHERE title LIKE ?  ${filter}  `, [`%${req.body.textSearch}%`], function (error, result, fields) {
        if (error) throw error;
                  console.log(" searchKey = " + req.body.textSearch);
                  console.log(result);
      res.render('search', { 
      title: 'Recipe page',user : pseudo ,
      recipes : result
      });        
    });
         });




