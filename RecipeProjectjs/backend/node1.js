
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
const mysql2 = require('mysql2/promise');
const session = require('express-session');


app.use(session({
  secret: 'ton_secret',      // clé pour signer la session (change-la)
  resave: false,              // ne pas sauvegarder si rien n’a changé
  saveUninitialized: true,    // sauvegarder les nouvelles sessions même si vides
  cookie: { maxAge: 3600000 } // durée de vie du cookie en ms (ici 1h)
}));


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

/*
pool= await startSQL2();
async function startSQL2() {
   try {
    // Création de la connexion
    const connection = await mysql2.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'recipeproject',
    });

    await connection.execute('SELECT 1');
    console.log('✅ Conneted MYSQL promises !');

    return connection;
  } catch (err) {
    console.error('❌ not connected to MYSQL promises2', err.message);
  }
}
  */

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

  


 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'frontend'));

 app.use(express.static(path.join(__dirname, '..', 'frontend')));

      let pseudo= '';

app.get('/', (req, res) => {
       pseudo = req.cookies.pseudo;

           connection.query('SELECT * FROM recipe ', function (error, result, fields) {
    if (error) throw error;
    // Neat!
        console.log(result);
        console.log(fields);
    res.render('home',{user : pseudo,recipes:result});
      
    });
});

app.get('/home', (req, res) => {
    const pseudo = req.cookies.pseudo;
  let recipes = req.session?.recipes ?? 0;
  let vide = req.session?.vide ?? false;
    if(vide===true){delete req.session.vide;res.render('home',{user : pseudo,recipes : null});}
    else{ 
    if(recipes!=0) res.render('home',{user : pseudo,recipes:req.session.recipes});
    else{
         connection.query('SELECT * FROM recipe ', function (error, result, fields) {
    if (error) throw error;
    // Neat!
        console.log(result);
        console.log(fields);
    
    res.render('home',{user : pseudo,recipes:result});

              });
     }
    }
});

/*
app.get('/recipe', async(req, res) => {
     let pseudo = req.cookies.pseudo;

     let recipeID= req.cookies.recipeID;
    if(!recipeID||recipeID==="")recipeID="174";
   let recipe;let steps; let ingredients;

    console.log(req.cookies.pseudo+ " : " + req.cookies.pseudoID );
    
    connection.query( `SELECT * FROM recipe WHERE id = ?; SELECT * FROM instructions WHERE recipeID = ?;
      SELECT * FROM liste_ingredients WHERE recipeID = ?;SELECT * FROM tagsList WHERE recipeID = ?;
      SELECT * FROM commentaires WHERE recipeID = ?;`, 
  [recipeID, recipeID, recipeID,recipeID,recipeID], function (error, result, fields) {
    if (error) throw error;
    recipe=result[0][0];
    steps=result[1];
    ingredients=result[2];
    tags=result[3];
    comment=result[4]
    console.log(recipe);console.log(steps);console.log(ingredients);console.log(tags);console.log(comment);

   res.render('recipe',{ title: 'Recipe page' ,user : pseudo, recipe : recipe,instructions : steps, ingredients:ingredients, tags:tags,commentaires : comment });
});
           

 


  });     
*/


app.get('/recipe', async (req, res) => {
    try {
    // Connect to the database using promises
    const pool = await mysql2.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'recipeproject',
    });

    const pseudo = req.cookies.pseudo;
    const pseudoID = req.cookies.pseudoID;
    let recipeID = req.cookies.recipeID;

    if (!recipeID || recipeID === "") recipeID = "174";

    console.log(`${pseudo} : ${pseudoID} (recipeID = ${recipeID})`);

    const [recipeResult]  = await pool.execute('SELECT * FROM recipe WHERE id = ?', [recipeID]);
    const [steps]       = await pool.execute('SELECT * FROM instructions WHERE recipeID = ?', [recipeID]);
    const [ingredients] = await pool.execute('SELECT * FROM liste_ingredients WHERE recipeID = ?', [recipeID]);
    const [tags]        = await pool.execute('SELECT * FROM tagsList WHERE recipeID = ?', [recipeID]);
    const [comment]     = await pool.execute('SELECT * FROM commentaires WHERE recipeID = ?', [recipeID]);
    const [notes]     = await pool.execute('SELECT * FROM notes WHERE recipeID = ?', [recipeID]);

    const recipe = recipeResult[0];
    let recipesID=[];
        if (tags.length > 0) {
            for (const tagObj of tags) {
            const [recipesIDres] = await pool.execute('SELECT recipeID FROM tagsList WHERE tag = ?',
              [tagObj.tag] );
              recipesID.push(...recipesIDres.map(r => r.recipeID));
          }
          console.log("recipefromtaf"+recipesID);
        }
      
        let recipesForU = [];
        let i=0;
        for (const recipeID of recipesID) {
          const [rows] = await pool.execute('SELECT * FROM recipe WHERE id = ?',[recipeID]);
          recipesForU.push(...rows);
                    i++;
          if (i>7)break;
        }

        console.log(recipesForU);


   res.render('recipe',{ title: 'Recipe page' ,user : pseudo, recipe : recipe,
    instructions : steps, ingredients:ingredients, tags:tags,commentaires : comment,notes : notes,recipesForU : recipesForU });


  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).send('Erreur serveur');
  }
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


   res.render('search', { title: 'Recipe page',user : pseudo ,recipes : result });        

    
});        

});

app.get('/login', (req, res) => {
  console.log("login");
        if(!pseudo) res.render('login',{user : pseudo, erreur : ""});
        
});

/*
app.get('/account', (req, res) => {
  console.log("pseudo"+pseudo)
  if(!pseudo)res.redirect('/');
  else{  
  console.log("login");
  let pseudoID= req.cookies.pseudoID;

       connection.query(`SELECT recipeID FROM recipe_list WHERE userID = (?) AND type="favoris";
        SELECT recipeID FROM recipe_list WHERE userID = (?) AND type="ownRecipe";
        SELECT * notes WHERE userID = (?)"; `
        , [pseudoID,pseudoID,pseudoID], function (error, results, fields) {
        if (error) {console.log("erreur account1 " +error);}
  
          notes=results[3];
           const recipesIDfav = results[0].map(row => row.recipeID);
           console.log(recipesIDfav);
           if(recipesIDfav.length===0)recipesIDfav[0]="0";

           const recipesIDcreat = results[1].map(row => row.recipeID);
                      console.log(recipesIDcreat);

         if(recipesIDcreat.length===0)recipesIDcreat[0]="0";
           console.log("recipecreatedid"+recipesIDcreat)

      connection.query(`SELECT * FROM recipe WHERE id IN (?);SELECT * FROM recipe WHERE id IN (?);
        SELECT * FROM users WHERE id IN (?);`,
      [recipesIDfav,recipesIDcreat,req.cookies.pseudoID], function (error, result, fields) {
        if (error) {console.log(error);}

        let fav=result[0]; let created=result[1]; let userInfo=result[2][0];
            console.log("recipe created"+created);
        if(  userInfo.image===null||userInfo.image==="")userInfo.image="https://picsum.photos/400/250?random=1";
        console.log(userInfo.image);
            res.render('account', { 
            title: 'My Account',user : pseudo , userInfo : userInfo,
            recipes : fav, ownRecipes : created,
      });                  
 
      });    
      
    //}

      });    
    }    
    });

     */


app.get('/account', async (req, res) => {
  const pseudo = req.cookies.pseudo;
  //if (!pseudo) return res.redirect('/');

  const pseudoID = req.cookies.pseudoID;

  try {
    // Connect to the database using promises
    const pool = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'recipeproject',
      multipleStatements: true

    });
    console.log(pseudoID)

    // get recipe ID 
const [favIDResults] = await pool.query( 'SELECT recipeID FROM recipe_list WHERE userID = ? AND type = "favoris"',[pseudoID]);
const [ownIDResults] = await pool.query(  'SELECT recipeID FROM recipe_list WHERE userID = ? AND type = "ownRecipe"',[pseudoID]);
  // get notes


    const recipesIDfav = favIDResults.map(r => r.recipeID);
    const recipesIDcreat = ownIDResults.map(r => r.recipeID);

    // security for empty values
    if (recipesIDfav.length === 0) recipesIDfav.push(null);
    if (recipesIDcreat.length === 0) recipesIDcreat.push(null);

    // Récupérer les recettes et info utilisateur
    const [recipeResults] = await pool.query(`
      SELECT * FROM recipe WHERE id IN (?);SELECT * FROM recipe WHERE id IN (?);SELECT * FROM users WHERE id = ?;
    `, [recipesIDfav, recipesIDcreat, pseudoID]);

    const fav = recipeResults[0];
    const created = recipeResults[1];
    const userInfo = recipeResults[2][0];

    const [notesResults] = await pool.query('SELECT n.*, r.title FROM notes n JOIN recipe r ON n.recipeID = r.id WHERE n.userID = ?;',[pseudoID]);
    const notes = notesResults;

    const [commentsResults] = await pool.query('SELECT n.*, r.title FROM commentaires n JOIN recipe r ON n.recipeID = r.id WHERE n.userID = ?;',[pseudoID]);
    const comments = commentsResults;

    if (!userInfo.image) userInfo.image = "https://picsum.photos/400/250?random=1";

    // Rendu de la page account
           res.render('account', { 
            title: 'My Account',user : pseudo , userInfo : userInfo,
            recipes : fav, ownRecipes : created,
            notes : notes, commentaires : comments,
      }); 


  } catch (err) {
    console.error('Erreur MySQL:', err);
    res.status(500).send('Erreur serveur');
  }
});

// Route /contact séparée
app.get('/contact', (req, res) => {
  const pseudo = req.cookies.pseudo;
  res.render('contact', { user: pseudo, erreur: "" });
});
   

        



app.get('/contact', (req, res) => {
      const pseudo = req.cookies.pseudo;
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
    res.send(`
      
      <script>   
              if( navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
        ){window.location.href = '/';}
        else{
     const iframe = window.parent.document.getElementById('overlay1'); 
      if(iframe) iframe.style.display = 'none';window.parent.location.reload();
          }
 </script>`);
  

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
        totalTime:  req.body.totalTime,
        yield:  req.body.yield,
        activeTime:  req.body.activeTime,
        auteur : req.body.auteur,
        categoryID : req.body.category,
    }; 

     
        let step = req.body.step.filter(item => item !== null && item !== ""); 
        let tag = req.body.tag.filter(item => item !== null && item !== ""); 
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
                const tagPost = tag.map(txt=> [ txt, recipeID ]); 
          
            
                    connection.query('INSERT INTO tagslist (tag, recipeID) VALUES ?', [ tagPost ], (err4) => {
                                            console.log("tag insert");

                      if (err4) console.log(err4) ; });
                    

           
           connection.query('INSERT INTO recipe_list SET ?', listPost, (err4) => {           
             console.log("list insert");
        if (err4) throw err4; });
           
    });
    console.log(query.sql); // INSERT INTO contact SET `id` = 1, `title` = 'Hello MySQL'
  }
  else console.log("not connected!")
  res.send(`<script>     
      window.close;window.parent.location.reload(); </script>`)
res.redirect('/account')  

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

app.post('/addList', (req, res) => {
    if(!pseudo)res.redirect('/recipe');
        console.log("url "+req.cookies.recipeID);
        if(req.cookies.pseudoID&&req.cookies.recipeID) 
        var query = connection.query('INSERT INTO recipe_list(`recipeID`, `userID`, `type`) VALUES (?, ?, ?)'
          , [req.cookies.recipeID,req.cookies.pseudoID,"favoris"], function (error, results, fields) {
      if (error) {
      console.error('Erreur MySQL:', error.message);
      return;
    }
    console.log("donnée insérée :",results)
    res.redirect('/recipe');
    });

});

app.post('/deleteFav', (req, res) => {
    if(!pseudo)res.redirect('/');
    else{ 
          console.log(req.body.deleteFav);
        var query = connection.query(`DELETE FROM recipe_list WHERE recipeID = ? AND userID = ? AND type = 'favoris' `
          , [req.body.deleteFav,req.cookies.pseudoID], function (error, results, fields) {
    
        if (error) throw error;
     
    console.log("supprimée :",results)
    res.redirect('/account#fav');
    });
  }
});


//delete own recipe completely on database
app.post('/deleteOwn', (req, res) => {
  if (!pseudo) res.redirect('/');
  else{ 
  console.log(req.body.deleteOwn);
  var query = connection.query(`DELETE FROM recipe_list WHERE recipeID = ? AND userID = ? AND type = 'ownrecipe' `
    , [req.body.deleteOwn, req.cookies.pseudoID], function (error, results, fields) {
      if (error) throw error;

      console.log("supprimée :", results)
    
    });

  var query = connection.query(`DELETE FROM instructions WHERE recipeID= ?;DELETE FROM liste_ingredients WHERE recipeID= ?;
        DELETE FROM tagsList WHERE recipeID= ?;DELETE FROM recipe WHERE id= ?;
        DELETE FROM commentaires WHERE recipeID= ?;DELETE FROM notes WHERE recipeID= ?;`
    , [req.body.deleteOwn, req.body.deleteOwn, req.body.deleteOwn, req.body.deleteOwn, req.body.deleteOwn, req.body.deleteOwn], function (error, results, fields) {
      if (error) console.log(error);

      console.log("supprimée :", results)
      res.redirect('/account#ownrecipe');
    });


  }
});



//search a recipe from search bar
app.post('/searchRecipes', (req, res) => {

  res.cookie('searchKey', req.body.textSearch, {
    maxAge: 3600000,   // expire dans 1h
    httpOnly: true,    // inaccessible côté client (document.cookie)
    secure: false,     // true si HTTPS
  });
  let filter = "";

  //differentes options du sortby form-select
  switch (req.body.searchFilter) {
    case '':
      filter = "";
      break;
    case 'title':
      filter = " ORDER BY title ASC";
      break;
    case 'date':
      filter = " ORDER BY date DESC";
      break;
    default:
      filter = "";
  }

  connection.query(`SELECT recipeID FROM tagsList WHERE tag = ? ;SELECT id FROM category WHERE name = ? ;  `,
    [req.body.textSearch, req.body.textSearch], function (error, result, fields) {
      if (error) throw error;
      console.log(" searchKey = " + req.body.textSearch);
      console.log(result);

      const allRecipeIDs = [...result[0]];
      if (allRecipeIDs.length === 0) allRecipeIDs[0] = '0';
      const recipeIDs = allRecipeIDs.map(r => r.recipeID);
      const cleanRecipeIDs = [...new Set(recipeIDs)];

      let categoryID = result[1]?.[0]?.id || '0';

      connection.query(`SELECT * FROM RECIPE WHERE title LIKE ?  ${filter} OR id in (?) OR categoryID=?  `,
        [`%${req.body.textSearch}%`, cleanRecipeIDs, categoryID], function (error, result, fields) {
          if (error) throw error;
          console.log(" searchKey = " + req.body.textSearch);
          console.log(result);
          console.log(req.get('Referer'))
          res.render('search', {
            title: 'Recipe page', user: pseudo,
            recipes: result
          });
        });

    });

});


//search a recipe from search bar
app.post('/searchRecipeHome', (req, res) => {

  res.cookie('searchKey', req.body.textSearch, {
    maxAge: 3600000,   // expire dans 1h
    httpOnly: true,    // inaccessible côté client (document.cookie)
    secure: false,     // true si HTTPS
  });
  let filter = "";

  //differentes options du sortby form-select
  switch (req.body.searchFilter) {
    case '':
      filter = "";
      break;
    case 'title':
      filter = " ORDER BY title ASC";
      break;
    case 'date':
      filter = " ORDER BY date DESC";
      break;
    default:
      filter = "";
  }

  connection.query(`SELECT recipeID FROM tagsList WHERE tag = ? ;SELECT id FROM category WHERE name = ? ;  `,
    [req.body.textSearch, req.body.textSearch], function (error, result, fields) {
      if (error) throw error;
      console.log(" searchKey = " + req.body.textSearch);
      console.log(result);

      const allRecipeIDs = [...result[0]];
      if (allRecipeIDs.length === 0) allRecipeIDs[0] = '0';
      const recipeIDs = allRecipeIDs.map(r => r.recipeID);
      const cleanRecipeIDs = [...new Set(recipeIDs)];

      let categoryID = result[1]?.[0]?.id || '0';

      connection.query(`SELECT * FROM RECIPE WHERE title LIKE ?  ${filter} OR id in (?) OR categoryID=?  `,
        [`%${req.body.textSearch}%`, cleanRecipeIDs, categoryID], function (error, result, fields) {
          if (error) throw error;
          console.log(" searchKey = " + req.body.textSearch);
          console.log(result);
          console.log(req.get('Referer'))
  if(result){req.session.recipes = result; }

  if (result.length===0)req.session.vide = true;
  res.redirect('/home#searchResults');
        });

    });

});


app.post('/giveNote', async (req, res) => {
  console.log("note ; "+req.body.note + "id :" + req.cookies.pseudoID + " recipeid"+ req.cookies.recipeID);
  let note = parseInt(req.body.note);
  console.log("note"+note);
  try {
    // Connect to the database using promises
    const pool = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'recipeproject',
    });
let recipeID=req.cookies.recipeID;

const [existing] = await pool.execute(
  'SELECT note FROM notes WHERE userID = ? AND recipeID = ?',
  [req.cookies.pseudoID, recipeID]
);

if (existing.length > 0) {
  // La note existe → on met à jour
const [insertResult] = await pool.execute( 'UPDATE notes SET note = ? WHERE userID = ? AND recipeID = ?',
  [note,req.cookies.pseudoID, recipeID]);
} else {
  // La note n'existe pas → on insère
  await pool.execute(
    'INSERT INTO notes (userID, recipeID, note) VALUES (?, ?, ?)',
    [req.cookies.pseudoID, recipeID, note]
  );
}



    const [notesRes] = await pool.execute('SELECT SUM(note) AS somme,  COUNT(*) AS nbNotes FROM notes WHERE recipeID = ?',
       [recipeID]);

    noteMoy=notesRes[0].somme / notesRes[0].nbNotes;
    console.log(noteMoy);
    const [insertResult2] = await pool.execute('UPDATE recipe SET note = ? WHERE  id = ?',
       [noteMoy,recipeID]);
      res.redirect('recipe#comments');
  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).send('Erreur serveur');
  }
});
      
app.post('/addComment', async (req, res) => {
  console.log("comm :  "+req.body.comment + "   id :" + req.cookies.pseudoID + "   recipeid"+ req.cookies.recipeID);
  let comment = req.body.comment;
let recipeID=req.cookies.recipeID;
let pseudoID=req.cookies.pseudoID;
  try {
    // Connect to the database using promises
    const pool = await mysql2.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'recipeproject',
    });

const [existing] = await pool.execute('SELECT commentaire FROM commentaires WHERE userID = ? AND recipeID = ?',
  [req.cookies.pseudoID, recipeID]);

  
if (existing.length > 4) {
  // La note existe → on met à jour
  const [insertResult] = await pool.execute( 'UPDATE commentaires SET commentaire = ? WHERE userID = ? AND recipeID = ?',
  [comment,req.cookies.pseudoID, recipeID]);
  console.log('commentaire "'+comment+'" modifié');
} else {
  // La note n'existe pas → on insère
  await pool.execute(
    'INSERT INTO commentaires (userID, recipeID, commentaire) VALUES (?, ?, ?)',
    [pseudoID, recipeID, comment]);
    console.log('commentaire "'+comment+'" crée');

}
      res.redirect('recipe#comments');

  } catch (err) {
    console.error('Erreur MySQL :', err);
    res.status(500).send('Erreur serveur');
  }
});
 
//search recipes recommanded with tag
/*
app.post('/RecipeForU', (req, res) => {

      

         connection.query(`SELECT recipeID FROM tagsList WHERE tag =?  `, [tag1,tag2], function (error, result, fields) {
        if (error) throw error;
                  console.log(" searchKey = " + req.body.textSearch);
                  console.log(result);
                    connection.query(`SELECT * FROM recipe WHERE recupeID =?  `, [recipeIDtab], function (error, result, fields) {
              if (error) throw error;
                        console.log(" searchKey = " + req.body.textSearch);
                        console.log(result);
            
                        res.render('recipe', { 
            title: 'Recipe page',user : pseudo ,
            recipesForU : result
            });        
          });
                 
    });

         });

         */