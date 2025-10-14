
recipesJSON = {};

/*default recipes on search*/
searchRecipeGen('a=chinese');

/*start search on button click*/
function recipeSearch_start() {

  let tag = document.getElementById("textSearch").value;

  if (tag === "") alert("no recipe found");
  else {
    searchRecipeAll(tag);
  }

}


/* search all sort of recipes with ingredient, category or area with mealDB API */
// search recipes from TheMealDB API

function searchRecipeAll(tag) {

  recipesJSON = {};

  contenuCarousel = `    <div class="carousel-item active"> <div class="row g-3">`;
  //recipeCarousel.innerHTML = `    <div class="carousel-item active"> <div class="row g-3">`;

  contenuNumero = `     <button type="button" data-bs-target="#cardCarousel" data-bs-slide-to="0" class="active bg-white text-black-50" href="#cardCarousel">1</button>`;


  searchRecipe('i=' + tag);
  setTimeout(() => { console.log(recipesJSON); }, 100);
  searchRecipe('c=' + tag);
  searchRecipe('a=' + tag);

  setTimeout(() => { recipesDisplay(tag); }, 100);



}

/*fetch recipes from mealDB API*/
async function searchRecipe(tag) {
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?" + tag;

  try {
    const response = await fetch(url);
    const json = await response.json();

    // affectation à la variable globale
    if (!recipesJSON.meals && json.meals) { recipesJSON = json; }
    else if (json.meals && recipesJSON.meals.length < json.meals.length) {
      recipesJSON = json;

      console.log("✅ Données récupérées :", recipesJSON);

    }


  } catch (error) {
    console.error("Erreur lors du fetch :", error);
  }


}

function recipesDisplay(tag) {

  /*check if there is recipes found*/
  if (!recipesJSON.meals) {
    alert("Aucune recette trouvée pour :", tag);
    return;
  }
  //search carrousel class to display recipes
  let recipeCarousel = document.querySelector(".carousel-inner");
  let numeroCarousel = document.querySelector(".numeroButton");
  recipeCarousel.innerHTML = "";
  let contenuCarousel = `    <div class="carousel-item active"> <div class="row g-3">`;
  let contenuNumero = `     <button type="button" data-bs-target="#cardCarousel" data-bs-slide-to="0" class="active bg-white text-black-50" href="#cardCarousel">1</button>`;

  let count = 0;
  let nbSlide = 1;
  recipesJSON.meals.forEach(meal => {

    //create a new slide every 12 recipes
    if (count > 11) {
      count = 0;
      nbSlide++;
      contenuCarousel += `</div></div><div class="carousel-item"><div class="row g-3">`;
    }

    //create recipe card
    contenuCarousel += `   <div class="col-6 col-lg-4">
                       <div class="card shadow-sm h-100" onclick="gotoRecipe('APImealDB','${meal.idMeal}')" >
                         <img src="${meal.strMealThumb}" class="card-img-top" alt="Card 1">
                      <div class="card-body pb-0">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <div class="d-flex justify-content-between pt-3 pb-0 mb-0"><span class=""><i class="fa-solid fa-star">N.C</i></span><span class="card-text">By mealDB API</p> </div>

                      </div>
                    </div>
                  </div>`;
    count++;
  });
  //create slide buttons
  for (let i = 1; i < nbSlide; i++) {
    contenuNumero += `     <button type="button" class=" bg-white text-black-50" data-bs-target="#cardCarousel" data-bs-slide-to="${i}"  href="#cardCarousel">${i + 1}</button>`;
  }
  console.log(contenuCarousel);
  contenuCarousel += `</div></div>`;

  //change html page to create carrousel 
  recipeCarousel.innerHTML = contenuCarousel;
  numeroCarousel.innerHTML = contenuNumero;


}


/* set storage id recipe and go to recipe page*/
function gotoRecipe(type, id) {
  setStorage(type, id);
  window.location.href = 'recipe.html';
}



/* search recipes from TheMealDB API with category or area*/
function searchRecipeGen(tag) {

  //fetch URL
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?" + tag;
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);

      
      if (json.meals) {
        recipesJSON = json;
        recipesJSON.meals.forEach(meal => {
          console.log(`Nom : ${meal.strMeal}`);
          console.log(`Image : ${meal.strMealThumb}`);
          console.log(`ID : ${meal.idMeal}`);
          console.log("--------------");
        });
      } else {
        alert("Aucune recette trouvée pour :", tag);
      }
//display recipes in carrousel
      let recipeCarousel = document.querySelector(".carousel-inner");
      let numeroCarousel = document.querySelector(".numeroButton");
      recipeCarousel.innerHTML = "";
      let contenuCarousel = `    <div class="carousel-item active"> <div class="row g-3">`;
      let contenuNumero = `     <button type="button" data-bs-target="#cardCarousel" data-bs-slide-to="0" class="active bg-white text-black-50" href="#cardCarousel">1</button>`;

      let count = 0;
      let nbSlide = 1;

      json.meals.forEach(meal => {
        //create a new slide every 12 recipes
        if (count > 11) {
          count = 0;
          nbSlide++;
          contenuCarousel += `</div></div><div class="carousel-item"><div class="row g-3">`;
        }
        //create recipe card
        contenuCarousel += `   <div class="col-6 col-lg-4">
                       <div class="card shadow-sm h-100" onclick="gotoRecipe('APImealDB','${meal.idMeal}')" >
                         <img src="${meal.strMealThumb}" class="card-img-top" alt="Card 1">
                      <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">Description carte 1.</p>
                      </div>
                    </div>
                  </div>`;
        count++;
      });
      //create slide buttons
      for (let i = 1; i < nbSlide; i++) {
        contenuNumero += `     <button type="button" class=" bg-white text-black-50" data-bs-target="#cardCarousel" data-bs-slide-to="${i}"  href="#cardCarousel">${i + 1}</button>`;
      }
      console.log(contenuCarousel);
      contenuCarousel += `</div></div>`;
      //create carrousel in html page
      recipeCarousel.innerHTML = contenuCarousel;
      numeroCarousel.innerHTML = contenuNumero;

    })
    .catch(err => console.error("Erreur :", err));
}




//let tagRecipe = "c=pasta";
//setRecipeVideo(tagRecipe);
/* search recipes from TheMealDB API with category or area*/
function setRecipeVideo(tag) {

  //fetch URL
  let url = "https://www.themealdb.com/api/json/v1/1/filter.php?" + tag;
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);

      if (json.meals) {
        recipesJSON = json;
        recipesJSON.meals.forEach(meal => {
          console.log(`Nom : ${meal.strMeal}`);
          console.log(`Image : ${meal.strMealThumb}`);
          console.log(`ID : ${meal.idMeal}`);
          console.log("--------------");
        });
      } else {
        alert("Aucune recette trouvée pour :", tag);
      }
//display recipes in carrousel
         const chemin = window.location.pathname;
      const urlActive= chemin.substring(chemin.lastIndexOf('/') + 1);
      console.log(urlActive);

      let recipeContainer = document.getElementById("videos-container");
      let recipeContainer2 = document.getElementById("videos-container2");

      recipeContainer.innerHTML = "";
      let contenuContainer = `    `;
      let contenuContainer2 = `    `;
      let count = 0;

   

      json.meals.forEach(meal => {
        if (count <4 &&  urlActive==="recipe.html"  ) {
          contenuContainer += `<div class="card shadow-sm h-100" onclick="gotoRecipe('APImealDB','${meal.idMeal}')" >
                         <img src="${meal.strMealThumb}" class="card-img-top" alt="Card 1">
                      <div class="card-body pb-0">
                        <h5 class="card-title text-black-50">${meal.strMeal}</h5>
                        <div class="d-flex justify-content-between pt-3 pb-0 mb-0"><span class=""><i class="fa-solid fa-star">N.C</i></span><span class="card-text">By mealDB API</p> </div>

                      </div>
                    </div>`;
        }
                if (count <4 &&  urlActive==="home.html"  ) {
          contenuContainer += `<div class="card" >
                              <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                              <div class="card-body">
                                <h5 class="card-title">${meal.strMeal}</h5>
                                <p class="card-text text-black-50">By mealDB API</p>
                              </div>
                            </div>`;
        }

        if (count >4 && count<9 && urlActive==="recipe.html" ) {
       contenuContainer2 += `<div class="card shadow-sm h-100" onclick="gotoRecipe('APImealDB','${meal.idMeal}')" >
                         <img src="${meal.strMealThumb}" class="card-img-top" alt="Card 1">
                      <div class="card-body pb-0">
                        <h5 class="card-title text-black-50">${meal.strMeal}</h5>
                        <div class="d-flex justify-content-between pt-3 pb-0 mb-0"><span class=""><i class="fa-solid fa-star">N.C</i></span><span class="card-text">By mealDB API</p> </div>

                      </div>
                    </div>`;
        }
              console.log(contenuContainer);
        count++;
        if (count>6 ) return;

      });
      //create slide buttons
      
      console.log(contenuContainer2);
      //create container in html page
      recipeContainer.innerHTML = contenuContainer;
       if(urlActive==="recipe.html")recipeContainer2.innerHTML = contenuContainer2;

    })
    .catch(err => console.error("Erreur :", err));

}



//search recipes from Spoonacular API
// searchRecipe2("rice");
/*
function searchRecipe2(tag){
let APIKey="abccbe9f062c47618eceac3c27c0332f"
const url = `https://api.spoonacular.com/recipes/complexSearch?query=${tag}&number=20&apiKey=${APIKey}`;
console.log(url);
fetch(url)
 .then(response => response.json())
 .then(json => {
   console.log(json);

       recipesJSON = json;
recipesJSON.results.forEach(recipe => {
console.log(`Nom : ${recipe.title}`);
console.log(`Image : ${recipe.image}`);
console.log(`ID : ${recipe.id}`);
console.log("--------------");
});
 

 })
 .catch(err => console.error("Erreur :", err));

 }
*/

//get recipe details 
//getRecipeDetails("52772");
/*   async function getRecipeDetails(id) {
let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
fetch(url)
   .then(response => response.json())
   .then(json => {
     console.log(json);
     data = json.meals[0];
 console.log("Nom :", data.strMeal);

let fin = false;
console.log("Ingrédients :");
for(let i=1; i<20  && fin===false; i++){
let ingredient = data[`strIngredient${i}`];
 if (ingredient === "") {
       fin = true;
     }
 else
 {
 console.log(`Ingredient ${i} :` + ingredient+ ", measure : "+ data[`strMeasure${i}`]);
 }
}

console.log("\nÉtapes :");
 
console.log(` ${data.strInstructions}`);
 
});
}
*/
 //setStorage("mealDB","52837");
function setStorage(type, data) {
  localStorage.setItem('recipeID', data);
  localStorage.setItem('type', type);
}

function getStorageData() {
  let data = localStorage.getItem("recipeID");
  console.log("idstorage "+data);
  return data;
}




setRecipeDetails(getStorageData());
/* search recipes from TheMealDB API with category or area*/
function setRecipeDetails(id) {

  //fetch URL
  let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id;
  console.log("url recipe detail : " +url)
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
        let recipeJSON = json.meals[0];

     
//display 
      let contenuIngredients="";
      
      let ingredientsDisplay= document.querySelector(".ingredientsList");
      let instructionsDiplay=document.querySelector(".instructionsList")



  //display measure and ingredients
      let fin = false;
    for(let i=1; i<20  && fin===false; i++){
    let ingredient = recipeJSON[`strIngredient${i}`];
    let measure = recipeJSON[`strMeasure${i}`];

    if (ingredient === "") {
          fin = true;
        }
    else
    {
    contenuIngredients+= ` <li class="list-group-item border-0 border-bottom" > ${measure}  ${ingredient}</li>`
    }
    }

    // display instructions on thml
      console.log("instruc : " + json.meals[0].strInstructions);
      instructionsDiplay.innerHTML=json.meals[0].strInstructions;
      ingredientsDisplay.innerHTML=contenuIngredients;

      document.querySelector(".recipePhoto").src= recipeJSON.strMealThumb;
      document.querySelector(".descriptionRecipe h1").innerText=recipeJSON.strMeal;
      document.querySelector(".descriptionRecipe p").innerHTML=`<a href="${recipeJSON.strYoutube}"><i class="fa-brands fa-youtube fs-1"></i></a>`;
      document.getElementById("activeTime").innerText="N.C"
      document.getElementById("totalTime").innerText="N.C"
      document.getElementById("yield").innerText="N.C"
      document.getElementById("author").innerText="MealDB API"
      document.getElementById("nbRecipes").innerText="Many Recipes"

      tagsDisplay=document.querySelector(".tags");

      let tagsText=`      
      <span class="badge text-bg-primary m-2 fs-5">${recipeJSON.strCategory}</span>
      <span class="badge text-bg-primary m-2 fs-5">${recipeJSON.strArea}</span>` 
  ;


      tagsDisplay.innerHTML=tagsText;
      setRecipeVideo('c='+recipeJSON.strCategory);

    })
    .catch(err => console.error("Erreur :", err));

}


//get recipe details from Spoonacular API
//getRecipeDetails2("635675");
async function getRecipeDetails2(id) {
  let url = ``;
  fetch(url)
    .then(response => response.json())
    .then(json => {
      console.log(json);
      data = json;
      console.log("Nom :", data.title);
      console.log(`Image : ${data.image}`);

      console.log("Ingrédients :");
      data.extendedIngredients.forEach(ing => console.log("-", ing.original));

      console.log("\nÉtapes :");
      if (data.analyzedInstructions.length > 0) {
        data.analyzedInstructions[0].steps.forEach(step =>
          console.log(`${step.number}. ${step.step}`)
        );
      } else {
        console.log("Aucune instruction disponible.");

      }

    });
}