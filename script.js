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
    mealDiv.innerHTML += "<br>"
    let recipeLink = document.createElement('a')
    recipeLink.href = (`\nhttps://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    recipeLink.textContent = "Find instructions here!"
    recipeLink.target = '_blank'
    mealDiv.append(recipeLink)
    let likeBtn = document.createElement('button')
    likeBtn.textContent = "Like?"
    mealDiv.innerHTML += "<br>"
    mealDiv.innerHTML += "<br>"
    mealDiv.append(likeBtn)
    mealDiv.addEventListener('click', displayRecipes)  
    recipeUL.append(mealDiv)
}

function displayRecipes() {
    console.log('hi')
    //fetch using mealID and display recipe instructions and ingredients in dropdown/next to the div (if so change to 3 column layout...might be less visibly offensive to the user)
}