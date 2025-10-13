
recipesJSON = {};

// search recipes from TheMealDB API
searchRecipe("chicken")
 function searchRecipe(tag){
    let url = "https://www.themealdb.com/api/json/v1/1/filter.php?i="+tag;
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
        console.log("Aucune recette trouvée pour :", tag);
      }

            })
            .catch(err => console.error("Erreur :", err));

            }

            searchRecipe2("rice");
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

  getRecipeDetails("635675");
            async function getRecipeDetails(id) {
                  let APIKey="abccbe9f062c47618eceac3c27c0332f"
  let url = `https://api.spoonacular.com/recipes/635675/information?apiKey=${APIKey}`;
   fetch(url)
            .then(response => response.json())
            .then(json => {
              console.log(json);
              data = json;
          console.log("Nom :", data.title);
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