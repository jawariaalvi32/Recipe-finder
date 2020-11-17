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
            box.setAttribute('class','col-md-3 col-sm-4 col-xs-12 m-91 text-center');
            box.setAttribute('id',data.meals[index].idMeal);
            let img = document.createElement('img');
            img.setAttribute('src', data.meals[index].strMealThumb)
            img.setAttribute('class','meal');
            box.appendChild(img);
            searchDiv.appendChild(box);
        }
    })
}


searchDiv.addEventListener('click', e => {

    const mealInfo = e.path.find(item => {
      let apiById = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.id}`;

      fetch(apiById).then(api => api.json())
      .then((data) => {
        clearDivs();
        singleMeal(data);
      })

    });
  });

let searchRandom = () => {
    clearDivs();

    let randomApi = "https://www.themealdb.com/api/json/v1/1/random.php";

    fetch(randomApi).then(api => api.json())
    .then((data) => {
      singleMeal(data);
    })
  }

let singleMeal = (data) => {
  // Meal Heading
  let h1 = document.createElement('h1');
  let h1Text = document.createTextNode(data.meals[0].strMeal)
  h1.appendChild(h1Text);
  imgr.appendChild(h1)

  // Meal Image
  let box = document.createElement('div');
  box.setAttribute('class','col-md-3');
  box.setAttribute('id',data.meals[0].idMeal);
  let img = document.createElement('img');
  img.setAttribute('src', data.meals[0].strMealThumb)
  img.setAttribute('class','meal');
  box.appendChild(img);
  imgr.appendChild(box);

  // Meal Tags
  let tags = (data.meals[0].strTags == null) ? 0 : data.meals[0].strTags.split(',');
  for (let index = 0; index < tags.length - 1; index++) {
    let p = document.createElement('p');
    let pText = document.createTextNode(tags[index])
    p.appendChild(pText);
    mealCategory.appendChild(p)
  }

  // Meal Instructions
  let pInstructions = document.createElement('p');
  let pInstructionsTxt = document.createTextNode(data.meals[0].strInstructions)
  pInstructions.appendChild(pInstructionsTxt);
  mealRecipee.appendChild(pInstructions);

  // Meal Ingredients
  let h3 = document.createElement('h3');
  let h3Txt = document.createTextNode('INGREDIENTS');
  h3.appendChild(h3Txt);
  mealIngredients.appendChild(h3);
  for (let index = 1; index < 20; index++) {
     let ingrImg = `https://www.themealdb.com/images/ingredients/${data.meals[0][`strIngredient${index}`]}-Small.png`;
    if (data.meals[0][`strIngredient${index}`]) {
      let imgtag = document.createElement('img');
      imgtag.setAttribute('src', ingrImg)
      mealIngredients.appendChild(imgtag);
    }
  }
}

let clearDivs = () => {
    searchDiv.innerHTML = '';
    imgr.innerHTML = '';
    mealRecipee.innerHTML = '';
    mealCategory.innerHTML = '';
    mealIngredients.innerHTML = '';
}