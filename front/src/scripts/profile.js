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
  return api.get(`users/${id}/img`)
}

document.addEventListener("DOMContentLoaded", async () => {

  const inputUserName = document.getElementById('userName')
  const divUserRecipes = document.getElementById('userRecipes')
  const inputUserFollowing = document.getElementById('userFollowing')
  const imgUserImg = document.getElementById('userImg')

  const userDataNoParse = await getUserData()
  const userDataParse = userDataNoParse.data[0]

  const userRecipes = await getUserRecipes(userDataParse._id)

  userRecipes.data.forEach(recipe => {
    const pTitle = document.createElement('P');
    const pDescription = document.createElement('P');
    const textTitle = document.createTextNode(recipe.name);
    const textDescription = document.createTextNode(recipe.description);
    pTitle.appendChild(textTitle)
    pDescription.appendChild(textDescription)
    divUserRecipes.appendChild(pTitle)
    divUserRecipes.appendChild(pDescription)
  });

  inputUserName.setAttribute('value', userDataParse.name)
  inputUserFollowing.innerHTML = userDataParse.following.length

  document.getElementById('btn-save-img').addEventListener('click', (event) => {

    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'ddhio8g1j', 
      uploadPreset: 'pgtjohuw'}, (error, result) => { 
        if (!error && result && result.event === "success") { 
          console.log('Done! Here is the image info: ', result.info); 
        }
      }
    )

    myWidget.open();
 
  }, false)

  // this is the navigation
  document.getElementById('btn-home').addEventListener('click', (event) => {
    location.href = './home.html'
  })
  document.getElementById('btn-profile').addEventListener('click', (event) => {
    location.href = './profile.html'
  })
  document.getElementById('btn-following').addEventListener('click', (event) => {
    location.href = './following.html'
  })
  document.getElementById('btn-logout').addEventListener('click', (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    location.href = './index.html'
  })
  // ------------------

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