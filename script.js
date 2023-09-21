document.addEventListener('DOMContentLoaded', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((res) => res.json())
        .then((sampleRecipe) => displaySample(sampleRecipe))
})

function displaySample(sampRec) {
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

const recipeUL = document.getElementById('recipe-results')
const recipeArr = []

document.getElementById('recipe-search').addEventListener('submit', (e) => {
    recipeUL.textContent = ""
    let mainIngredient = document.getElementById('main-ingredient').value
    fetch (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`)
        .then((res) => res.json())
        .then(mealsObj => mealsObj['meals'].forEach(meal => {
            displayMeals(meal)
        }));
    e.preventDefault()
})

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
    let likeBtn = document.createElement('button')
    likeBtn.textContent = "Like"
    likeBtn.addEventListener('click', () => {
        let liked = document.getElementById('liked-recipes')
        liked.append(mealDiv)
    })
    mealDiv.innerHTML += "<br>"
    mealDiv.innerHTML += "<br>"
    mealDiv.append(likeBtn)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then((res) => res.json())
        .then(recipe => {
            let mealInstr = document.createElement('p')
            mealInstr.textContent = recipe['meals'][0]['strInstructions']
            mealDiv.append(mealInstr)
            mealInstr.hidden = true
            mealDiv.addEventListener('mouseover', () => {
                mealInstr.hidden = false
            })
            mealDiv.addEventListener('mouseout', () => {
                mealInstr.hidden = true
            })
        })
    recipeUL.append(mealDiv)
}