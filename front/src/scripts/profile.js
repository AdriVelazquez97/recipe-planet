(function authenticated() {
  if (!localStorage.getItem('token')) {
    location.href = './index.html'
  }
})()

const createDivRecipe = (recipe, divUserRecipes) => {
  const pTitle = document.createElement('P');
  const pDescription = document.createElement('P');
  const textTitle = document.createTextNode(recipe.name);
  const textDescription = document.createTextNode(recipe.description);
  pTitle.appendChild(textTitle)
  pDescription.appendChild(textDescription)
  divUserRecipes.appendChild(pTitle)
  divUserRecipes.appendChild(pDescription)
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