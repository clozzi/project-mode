document.getElementById('recipe-search').addEventListener('submit', (e) => {
    let mainIngredient = document.getElementById('main-ingredient').value
    fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`)
        .then((res) => res.json())
        .then(mealsObj => mealsObj['meals'].forEach(meal => {
            displayMeals(meal)
        }));
    e.preventDefault()
})

function displayMeals (mealsArr) {
    const recipeUL = document.getElementById('recipe-results')
    let mealDiv = document.createElement('div')
    let mealName = document.createElement('h3')
    mealName.textContent = mealsArr["strMeal"]
    mealDiv.append(mealName)
    let mealImg = document.createElement('img')
    mealImg.src = mealsArr["strMealThumb"]
    let mealID = mealsArr['idMeal']
    mealImg.width = 150
    mealImg.height = 150
    mealDiv.append(mealImg) 
    mealDiv.id = mealID
    let lineBreak = document.createElement('br')
    mealDiv.append(lineBreak)
    let recipeLink = document.createElement('a')
    recipeLink.href = (`\nhttps://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    recipeLink.textContent = "Find instructions here!"
    recipeLink.target = '_blank'
    mealDiv.append(recipeLink)
    mealDiv.addEventListener('click', displayRecipes)  
    recipeUL.append(mealDiv)
}

function displayRecipes() {
    console.log('hi')
}