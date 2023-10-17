const searchbox = document.querySelector('.searchBox');
const searchbtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipe_details_content =document.querySelector('.recipe-details-content'); 
const recipe_close_btn = document.querySelector('.recipe-close-Btn');

// fucntion to get recipes

const fetchrecipe =async (query) =>{
    recipeContainer.innerHTML = "<h2>Fetching Recipe...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response =await data.json();
        recipeContainer.innerHTML = "";
        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p> Belongs to <span>${meal.strCategory}</span> Category</p>
            `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // addding event listener to recipe
            button.addEventListener('click',()=>{
                openRecipePopUp(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });
    } 
    catch (error) {
        recipeContainer.innerHTML = "<h2>Error in fetching  Recipes...</h2>";

    }
//  console.log(response.meals[0]);
}


// function to fetch ingredients and measurments

const fetchIngredient = (meal) => {
    // console.log(meal);
    let ingredientsList = "";
    for(let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList +=`<li> ${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}



const openRecipePopUp = (meal) =>{
    recipe_details_content.innerHTML = `
    <h2 class="recipeName"> ${meal.strMeal} </h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredient(meal)}</ul>
    <div class="recipeInstructions">
        <h3>Instruction : </h3>
        <p>${meal.strInstructions} </p>
    </div>
    `
    
    recipe_details_content.parentElement.style.display ="block";

}

recipe_close_btn.addEventListener('click',()=>{
    recipe_details_content.parentElement.style.display = "none";
});

searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`
        returnb;
    }
    fetchrecipe(searchInput);
    // console.log("Btn clicked");
});