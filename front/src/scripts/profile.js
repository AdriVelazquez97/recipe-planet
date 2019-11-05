(function authenticated() {
  if (!localStorage.getItem('token')) {
    location.href = './index.html'
  }
})()

const createDivRecipe = (recipe, divRecipes) => {
  var recipeElem = document.createElement("div");
    recipeElem.setAttribute('class', 'containerRecipe col-4 mb-5 card card-adrian')
    recipeElem.innerHTML = `<div>
    <div class="card-img-top adrian-image" style="background-image: url('${recipe.img}')"></div>
    <div class="card-body">
      <h5 class="card-title">${recipe.name}</h5>
      <p class="card-text text-truncate">${recipe.description}</p>
    </div>
  </div>`


  recipeElem.addEventListener('click', async () => {
    document.getElementById('homePage').style.display = 'none'
    document.getElementById('profilePage').style.display = 'none'
    document.getElementById('showRecipe').style.display = ''
    window.history.pushState('recipe-planet', 'Title', `/recipe-planet.html/${recipe._id}`);
  

    document.getElementById('recipeNameShow').value = recipe.name
    document.getElementById('recipeDescriptionShow').value = recipe.description
    if(recipe.img !== undefined){
      document.getElementById('recipeImgShow').style.backgroundImage = `url(${recipe.img})`
    } else {
      document.getElementById('recipeImgShow').style.backgroundImage = "url('./src/img/add.png')" 
    }

    recipe.ingredients.forEach(ingredient => {
      const li = document.createElement('li')      
      const input = document.createElement('input')
      const input2 = document.createElement('input')

      input.setAttribute("type", "text");
      input.setAttribute("class", 'form-control');
      input.setAttribute('readonly', '');
      input.value = ingredient.cuantity

      input2.setAttribute("type", "text");
      input2.setAttribute("class", 'form-control');
      input2.setAttribute('readonly', '');
      input2.value = ingredient.food
      

      li.append(input)
      li.append(input2)
      document.getElementById('ulIngredientsShow').appendChild(li)      

    })


    recipe.steps.forEach(step => {
      const input = document.createElement('input')
      const li = document.createElement('li')
      input.setAttribute("type", "text");
      input.setAttribute("class", 'form-control');
      input.setAttribute('readonly', '');
      input.value = step
      li.append(input)
      document.getElementById('ulStepsShow').appendChild(li)      
    });

  })
    divRecipes.appendChild(recipeElem)
}

document.addEventListener("DOMContentLoaded", async () => {

  const inputUserName = document.getElementById('userName')
  const divUserRecipes = document.getElementById('userRecipes')
  
  const userDataNoParse = await api.getUserData()
  const userDataParse = userDataNoParse.data[0]
  
  const userImg = document.getElementById('userImg')
  if(userDataParse.img !== undefined){
    userImg.style.backgroundImage = `url(${userDataParse.img})`
  } else {
    userImg.style.backgroundImage = "url('./src/img/add.png')"  
  }
  
  const userRecipes = await api.getUserRecipes(userDataParse._id)
  userRecipes.data.forEach(recipe => {
    createDivRecipe(recipe, divUserRecipes)
  });

  inputUserName.setAttribute('value', userDataParse.name)

  userImg.addEventListener('click', (event) => {
    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'ddhio8g1j', 
      uploadPreset: 'pgtjohuw'}, (error, result) => { 
        if (!error && result && result.event === "success" ) {
          const newUrl = result.info.url
          api.updateUserImg(userDataParse._id, newUrl)
          userImg.style.backgroundImage = `url(${newUrl})`
        }
      }
    )

    myWidget.open();
  }, false)

  document.getElementById('btn-edit').addEventListener('click', (event) => {
    const inputUserName = document.getElementById('userName')
    const btnEdit = document.getElementById('btn-edit')

    if (inputUserName.hasAttribute('readonly')) {
      inputUserName.removeAttribute('readonly')
      btnEdit.innerHTML = 'Save'
    } else {
      const newName = inputUserName.value
      api.updateUserInfo(userDataParse._id, { name: newName })
      inputUserName.setAttribute('readonly', '')
      btnEdit.innerHTML = 'Edit'
    }
  })

})