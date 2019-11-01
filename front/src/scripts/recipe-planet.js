(function authenticated() {
  if (!localStorage.getItem('token')) {
    location.href = './index.html'
  }
})()

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 1000,
  headers: {
    auth_token: localStorage.getItem('token')
  }
});

const getUserData = async () => {
  const requestBody = {
    searchParams: [{
      type: 'email',
      value: [localStorage.getItem('email')]
    }]
  }
  return api.post('users/searchWithFilters', requestBody)
}

const getUserRecipes = async (id) => {
  return api.get(`users/${id}/recipes`)
}

const updateUserInfo = async (id, newData) => {
  return api.put(`users/${id}`, newData)
}

const getUserImg = async (id) => {
  return api.get(`users/${id}/image`)
}

const updateUserImg = async (id, img) => {
  return api.put(`users/${id}/image`, {img})
}

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
  const imgUserImg = document.getElementById('userImg')

  const userDataNoParse = await getUserData()
  const userDataParse = userDataNoParse.data[0]

  const userRecipes = await getUserRecipes(userDataParse._id)
  imgUserImg.setAttribute('src', userDataParse.img)
  userRecipes.data.forEach(recipe => {
    createDivRecipe(recipe, divUserRecipes)
  });

  inputUserName.setAttribute('value', userDataParse.name)
  inputUserFollowing.innerHTML = userDataParse.following.length

  document.getElementById('btn-save-img').addEventListener('click', (event) => {

    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'ddhio8g1j', 
      uploadPreset: 'pgtjohuw'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          // Continuar aqui, axios para actualizar la foto del usuario 
          const newUrl = result.info.url
          console.log(newUrl)
          updateUserImg(userDataParse._id, newUrl)
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
      updateUserInfo(userDataParse._id, { name: newName })
      inputUserName.setAttribute('readonly', '')
      btnEdit.innerHTML = 'Edit'
    }
  })

})