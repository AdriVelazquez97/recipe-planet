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

    document.getElementById('profilePage').style.display = 'none'
    document.getElementById('showRecipe').style.display = ''
    window.history.pushState('recipe-planet', 'Title', `/recipe-planet.html/${recipe._id}`);
  

    document.getElementById('recipeNameShow').value = recipe.name
    document.getElementById('recipeDescriptionShow').value = recipe.description
    console.log(recipe.img)
    if(recipe.img !== undefined){
      document.getElementById('recipeImgShow').style.backgroundImage = `url(${recipe.img})`
    }
  })
    divRecipes.appendChild(recipeElem)
}

document.addEventListener("DOMContentLoaded", async () => {

  const inputUserName = document.getElementById('userName')
  const divUserRecipes = document.getElementById('userRecipes')
  const inputUserFollowing = document.getElementById('userFollowing')
  
  const userDataNoParse = await api.getUserData()
  const userDataParse = userDataNoParse.data[0]
  
  
  const userImg = document.getElementById('userImg')
  userImg.style.backgroundImage = `url(${userDataParse.img})`
  
  const userRecipes = await api.getUserRecipes(userDataParse._id)
  userRecipes.data.forEach(recipe => {
    createDivRecipe(recipe, divUserRecipes)
  });

  inputUserName.setAttribute('value', userDataParse.name)
  inputUserFollowing.innerHTML = userDataParse.following.length

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