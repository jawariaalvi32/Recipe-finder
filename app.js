let mealCategory = document.getElementById('meal-category'); 
let mealRecipee = document.getElementById('meal-recipee'); 
let mealIngredients = document.getElementById('meal-ingredients'); 
let imgr = document.getElementById('single-meal-img');
let searchDiv = document.getElementById('search');

let searchRecipe = () => {
    clearDivs();

    let searchIp = document.getElementById('search-ip').value;
    let searchApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchIp}`;

    fetch(searchApi).then(api => api.json())
    .then((data) => {
        console.log(data)
        for (let index = 0; index < data.meals.length; index++) {
            let box = document.createElement('div');
            box.setAttribute('class','col-md-3 col-sm-6 col-xs-12 box m-1');
            box.setAttribute('id',data.meals[index].idMeal);
            let img = document.createElement('img');
            img.setAttribute('src', data.meals[index].strMealThumb)
            box.appendChild(img);
            searchDiv.appendChild(box);
            // searchDiv.addEventListener("click", searchRecipeById(data.meals[index].idMeal));
        }
    })
}

// let searchRecipeById = (e) => {

//     let searchApi = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${e}`
// console.log(searchApi)
//     fetch(searchApi).then(api => api.json())
//     .then((data) => {
//         console.log(data)
        
//     })
// }

searchDiv.addEventListener('click', e => {
    console.log(e.path);
    const mealInfo = e.path.find(item => {
        console.log(item.id)
      if (item.classList) {
        return item.classList.contains('meal-info');
      } else {
        return false;
      }
    });
  
    if (mealInfo) {
      const mealID = mealInfo.getAttribute('data-mealid');
      getMealById(mealID);
    }
    
  });

let searchRandom = () => {
    clearDivs();

    let randomApi = "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch(randomApi).then(api => api.json())
    .then((data) => {
        let h1 = document.createElement('h1');
        let h1Text = document.createTextNode(data.meals[0].strMeal)
        h1.appendChild(h1Text);
        imgr.appendChild(h1)

        let box = document.createElement('div');
        box.setAttribute('class','col-md-3 box');
        box.setAttribute('id',data.meals[0].idMeal);
        let img = document.createElement('img');
        img.setAttribute('src', data.meals[0].strMealThumb)
        box.appendChild(img);
        imgr.appendChild(box);

        let tags = (data.meals[0].strTags == null) ? 0 : data.meals[0].strTags.split(',');
        for (let index = 0; index < tags.length - 1; index++) {
            let p = document.createElement('p');
            let pText = document.createTextNode(tags[index])
            p.appendChild(pText);
            mealCategory.appendChild(p)
        }

        let pInstructions = document.createElement('p');
        let pInstructionsTxt = document.createTextNode(data.meals[0].strInstructions)
        pInstructions.appendChild(pInstructionsTxt);
        mealRecipee.appendChild(pInstructions);

        for (let index = 1; index < 20; index++) {
            let spIngredients = document.createElement('span');
            spIngredients.setAttribute('class', 'badge badge-secondary m-2')
            let pIngredientsTxt = document.createTextNode(data.meals[0][`strIngredient${index}`])
            spIngredients.appendChild(pIngredientsTxt);
            mealIngredients.appendChild(spIngredients)
        }
    })
}

let clearDivs = () => {
    searchDiv.innerHTML = '';
    imgr.innerHTML = '';
    mealRecipee.innerHTML = '';
    mealCategory.innerHTML = '';
    mealIngredients.innerHTML = '';
}