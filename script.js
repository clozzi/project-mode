document.getElementById('recipe-search').addEventListener('submit', (e) => {
    let mainIngredient = document.getElementById('main-ingredient').value
    fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`)
        .then((res) => res.json())
        .then(mealsObj => mealsObj['meals'].forEach(meal => {
            displayMeals(meal)
        }));
    e.preventDefault()
})

const mealIdArray = []
const recipeUL = document.getElementById('recipe-results')

function displayMeals (mealsArr) {
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
    likeBtn.addEventListener('click', () => {
        let liked = document.getElementById('liked-recipes')
        liked.append(mealDiv)
    })
    mealDiv.innerHTML += "<br>"
    mealDiv.innerHTML += "<br>"
    mealDiv.append(likeBtn)
    mealIdArray.push(mealID)
    // mealDiv.addEventListener('click', () => {
    //     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    //         .then((res) => res.json())
    //         .then(recipe => displayRecipes(recipe))
        //create copy of mealDiv
        //append to middle column
        //hide
        //likeRecipe
    //})
    recipeUL.append(mealDiv)
}

function likeRecipe() {
    console.log()
}

// function displayRecipes(recipe) {
//     console.log(recipe)
    //show recipe

//     //fetch using mealID and display recipe instructions and ingredients in recipe details ul
// }