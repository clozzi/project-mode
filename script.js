document.addEventListener('DOMContentLoaded', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
        .then((sampleRecipe) => displaySample(sampleRecipe))
})

function displaySample(sampRec) {
    console.log(sampRec["meals"][0]['strMeal'])
    let sampleName = document.createElement('h3')
    let sampleImg = document.createElement('img')
    sampleName.textContent = sampRec['meals'][0]['strMeal']
    sampleImg.src = sampRec['meals'][0]['strMealThumb']
    sampleImg.width = 125
    sampleImg.height = 125
    let sampleDiv = document.getElementById('sample-recipe')
    sampleDiv.append(sampleName)
    sampleDiv.append(sampleImg)
}


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
    mealImg.width = 150
    mealImg.height = 150
    mealDiv.append(mealImg)
    let mealID = mealsArr['idMeal'] 
    mealDiv.id = mealID
    mealDiv.innerHTML += "<br>"
    // let recipeLink = document.createElement('a')
    // recipeLink.href = (`\nhttps://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    // recipeLink.textContent = "Find instructions here!"
    // recipeLink.target = '_blank'
    // mealDiv.append(recipeLink)
    let likeBtn = document.createElement('button')
    likeBtn.textContent = "Like"
    likeBtn.addEventListener('click', () => {
        let liked = document.getElementById('liked-recipes')
        let clonedMealDiv = mealDiv.cloneNode(true)
        liked.append(clonedMealDiv)
    })
    mealDiv.innerHTML += "<br>"
    mealDiv.innerHTML += "<br>"
    mealDiv.append(likeBtn)
    mealIdArray.push(mealID)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => res.json())
        .then(recipe => {
            let mealInstr = document.createElement('p')
            mealInstr.textContent = recipe['meals'][0]['strInstructions']
            let details = document.getElementById('recipe-details')
            details.append(mealInstr)
        })
    //mealDiv.addEventListener('mouseover', fetchRecipe)
    //mealDiv.addEventListener('mouseout', hideRecipe)
    recipeUL.append(mealDiv)
}

// function fetchRecipe(e) {
//     let clickedID = e.target.parentNode.id
//     console.log(clickedID)
//     fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${clickedID}`)
//         .then((res) => res.json())
//         .then(recipe => displayRecipe(recipe))
// }

function displayRecipe() {

}

function hideRecipe() {

}