
recipesJSON = {};



function recipeSearch_start(){

let tag=document.getElementById("textSearch").value;

if (tag==="") alert("no recipe found");
else {
searchRecipeAll(tag);
}

}


// search recipes from TheMealDB API
//searchRecipe("chicken")

let count = 0;
let nbSlide = 1;  
let recipeCarousel = document.querySelector(".carousel-inner");
let numeroCarousel = document.querySelector(".numeroButton");
let contenuNumero="";
let contenuCarousel = ``;

function searchRecipeAll(tag){
 count = 0;
nbSlide = 1;  

    contenuCarousel = `    <div class="carousel-item active"> <div class="row g-3">`;
    //recipeCarousel.innerHTML = `    <div class="carousel-item active"> <div class="row g-3">`;

    contenuNumero = `     <button type="button" data-bs-target="#cardCarousel" data-bs-slide-to="0" class="active bg-white text-black-50" href="#cardCarousel">1</button>`;

    searchRecipe('i='+tag);
    searchRecipe('c='+tag);
    searchRecipe('a='+tag);


    console.log("nbslide"+nbSlide);

               for (let i = 1; i < nbSlide; i++) {
     contenuNumero += `  <button type="button" class=" bg-white text-black-50" data-bs-target="#cardCarousel" data-bs-slide-to="${i}"  href="#cardCarousel">${i+1}</button>`;
                  }

      contenuCarousel += `</div></div>`;

      console.log(contenuNumero);
      recipeCarousel.innerHTML = contenuCarousel;
      numeroCarousel.innerHTML = contenuNumero;
 }

 function searchRecipe(tag){
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?"+tag;
          fetch(url)
            .then(response => response.json())
            .then(json => {
              console.log(json);

              if (json.meals) {
                 json.meals.forEach(meal=> {
                    console.log(count);
                  if (count > 11) {
                    count = 0;
                    nbSlide++;
                    contenuCarousel += `</div></div><div class="carousel-item"><div class="row g-3">`;
                  }

                  contenuCarousel += `   <div class="col-6 col-lg-4">
                    <div class="card shadow-sm h-100" onclick="setStorage("APImealDB",'${meal.idMeal}'); window.location.href='recipe.html';">
                      <img src="${meal.strMealThumb}" class="card-img-top" alt="Card 1">
                      <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">Description carte 1.</p>
                      </div>
                    </div>
                  </div>`;
                  count++;
                  });
                  console.log(contenuCarousel);
                    recipeCarousel.innerHTML += contenuCarousel;

                }
            })
            .catch(err => console.error("Erreur :", err));
      
            }


            function searchRecipeGen(tag){
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?"+tag;
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

                  let recipeCarousel = document.querySelector(".carousel-inner");
                  let numeroCarousel = document.querySelector(".numeroButton");
                    recipeCarousel.innerHTML ="";
                  let contenuCarousel = `    <div class="carousel-item active"> <div class="row g-3">`;
                  let contenuNumero = `     <button type="button" data-bs-target="#cardCarousel" data-bs-slide-to="0" class="active bg-white text-black-50" href="#cardCarousel">1</button>`;

                  let count = 0;
                  let nbSlide = 1;
                        recipesJSON.meals.forEach(meal=> {

                  if (count > 11) {
                    count = 0;
                    nbSlide++;
                    contenuCarousel += `</div></div><div class="carousel-item"><div class="row g-3">`;
                  }

                  contenuCarousel += `   <div class="col-6 col-lg-4">
                    <div class="card shadow-sm h-100" onclick="setStorage("APImealDB",'${meal.idMeal}'); window.location.href='recipe.html';">
                      <img src="${meal.strMealThumb}" class="card-img-top" alt="Card 1">
                      <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">Description carte 1.</p>
                      </div>
                    </div>
                  </div>`;
                  count++;
                  });
                  for (let i = 1; i < nbSlide; i++) {
                    contenuNumero += `     <button type="button" class=" bg-white text-black-50" data-bs-target="#cardCarousel" data-bs-slide-to="${i}"  href="#cardCarousel">${i+1}</button>`;
                  }
                  console.log(contenuCarousel);
                   contenuCarousel += `</div></div>`;
                  recipeCarousel.innerHTML = contenuCarousel;
                  numeroCarousel.innerHTML = contenuNumero;
      
            })
            .catch(err => console.error("Erreur :", err));
        
   

      
            }


            //search recipes from Spoonacular API
           // searchRecipe2("rice");
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


            //get recipe details from Spoonacular API
  //getRecipeDetails("52772");
            async function getRecipeDetails(id) {
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

   // setStorage("635675");
    function setStorage(type,data){
      localStorage.setItem('recipeID', data);
      localStorage.setItem('type', type);    
    }

      getStorage();
      function getStorage(){
      let data= localStorage.getItem("recipeID");
      console.log(data); 
      return   data;}

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