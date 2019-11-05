const createLiInput = (inputClass, placeholder='Introduce un paso') => {
  const li = document.createElement('li')
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.setAttribute("class", 'form-control');
  input.setAttribute("placeholder", placeholder);
  li.setAttribute('class', inputClass);
  li.appendChild(input);
  return li
}

const createInputAndSelect = (countIngredients) => {
  const li = createLiInput('inputIngredient form-group', 'Introduce la cantidad')
  const input = document.createElement('input')
  input.setAttribute('id', `ingredient${countIngredients}` )
  input.setAttribute("placeholder", 'Introduce el nombre del ingrediente');
  input.setAttribute('class', `form-control` )
  li.appendChild(input)
  return li
}

const takeIngredientsValue = () => {
  const ingredientsValues = document.querySelectorAll('.inputIngredient > input ')
  let arrayOfIngredients = []

  for(let i = 0; i < ingredientsValues.length; i++){
    if(ingredientsValues[i].value.length > 0 && ingredientsValues[i].value.length > 0){
      let newObjectIngredient = {
        cuantity: ingredientsValues[i].value,
        food: ingredientsValues[i+1].value
      }
      arrayOfIngredients.push(newObjectIngredient)
      i++
    }
  }
  return arrayOfIngredients
}

const takeStepsValue = () => {
  const stepsValues = document.querySelectorAll('.inputStep > input ')
  const arrayOfValues = [];
  for (let i = 0; i < stepsValues.length; i++) {
    arrayOfValues.push(stepsValues[i].value);
  }
  return arrayOfValues
}

document.addEventListener("DOMContentLoaded", async () => {

  const recipeImg = document.getElementById('recipeImg')
  const ulIngredents = document.getElementById('ulIngredients')
  const ulSteps = document.getElementById('ulSteps')
  let newRecipe = {}
  let countIngredients = 0

  const ingredients = await api.getAllFoods()
  const ingredientsNames = ingredients.data.map(ingredient => ingredient.name)
  
  const newChild = createInputAndSelect(countIngredients)
  ulIngredents.appendChild(newChild)
  $(`#${newChild.children[1].id}`).autocomplete({
    source: ingredientsNames
  });
  ulSteps.appendChild(createLiInput('inputStep'))


  document.getElementById('btn-add-ingredient').addEventListener('click', (event) => {
    countIngredients++
    const newChild = createInputAndSelect(countIngredients)
    ulIngredents.appendChild(newChild)
    $(`#${newChild.children[1].id}`).autocomplete({
      source: ingredientsNames
    });
  })
  
  document.getElementById('btn-delete-ingredient').addEventListener('click', (event) => {
    ulIngredents.removeChild(ulIngredents.lastElementChild)
    countIngredients--
  })

  document.getElementById('btn-add-step').addEventListener('click', (event) => {
    ulSteps.appendChild(createLiInput('inputStep'))
  })
  
  document.getElementById('btn-delete-step').addEventListener('click', (event) => {
    ulSteps.removeChild(ulSteps.lastElementChild)
  })

  recipeImg.addEventListener('click', (event) => {
    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'ddhio8g1j', 
      uploadPreset: 'pgtjohuw'}, (error, result) => { 
        if (!error && result && result.event === "success" ) {
          const newUrl = result.info.url
          recipeImg.style.backgroundImage = `url(${newUrl})`
          newRecipe.img = newUrl
        }
      }
    )

    myWidget.open();
  }, false)

  document.getElementById('btn-cretae-recipe').addEventListener('click', async () => {
    newRecipe.name = document.getElementById('recipeName').value
    newRecipe.description = document.getElementById('recipeDescription').value
    newRecipe.ingredients = takeIngredientsValue()
    newRecipe.steps = takeStepsValue()
    newRecipe.owner = localStorage.getItem('id')
  
    await api.createRecipe(localStorage.getItem('id'), newRecipe)

    document.getElementById('userRecipes').innerHTML = ''

    const divUserRecipes = document.getElementById('userRecipes')
    const userRecipes = await api.getUserRecipes(localStorage.getItem('id'))
    userRecipes.data.forEach(recipe => {
      createDivRecipe(recipe, divUserRecipes)
    });
  
    document.getElementById('recipeName').value = ""
    document.getElementById('recipeDescription').value = ""
    document.getElementById('recipeImg').style.backgroundImage = 'url(./src/img/add.png)';

    ulIngredents.innerHTML = ''
    ulSteps.innerHTML = ''

    document.getElementById('newRecipePage').style.display = 'none'
    document.getElementById('profilePage').style.display = ''
    
    const newChild = createInputAndSelect(countIngredients)
    ulIngredents.appendChild(newChild)
    $(`#${newChild.children[1].id}`).autocomplete({
      source: ingredientsNames
    });
    ulSteps.appendChild(createLiInput('inputStep'))


  })

})