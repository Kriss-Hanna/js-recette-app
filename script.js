const result = document.getElementById("result");
const form = document.querySelector("form");
const search = document.getElementById("search");

let meals = [];

async function fetchMeals(search) {

  await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + search )
  .then((res) => res.json())
  .then((data) => (meals = data.meals))

};

function mealsDisplay(){

  meals === null ? result.innerHTML = "<h2>Aucun résultat</h2>" :

  meals.length = 12

  result.innerHTML = meals.map((meal) => {
    let ingredients = [];

    for(i=1; i< 21; i++){
      if(meal[`strIngredient${i}`]){
        let ingredient = meal[`strIngredient${i}`]
        let mesure = meal[`strMeasure${i}`]

        ingredients.push(`<li>${ingredient} - ${mesure}</li>`)
      }
    }
    return `
    <li class="card">
      <h2>${meal.strMeal}</h2>
      <p>${meal.strArea}</p>
      <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}" />
      <ul>${ingredients.join("")}</ul>
    </li>
    `

  }
  ).join("")
};

search.addEventListener("input", (e) => {
  fetchMeals(e.target.value)
  .then(() => mealsDisplay())
});

form.addEventListener("submit" , (e) => {
  e.preventDefault()
  mealsDisplay()
});