function Api () {

  this.api = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 1000,
    headers: {
      auth_token: localStorage.getItem('token')
    }
  });

  // AUTH API

  this.login = (logUser) => {
    return this.api
      .post("auth/login", logUser)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name",  response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);        
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  // USER API

  this.getUserData = () => {
    const requestBody = {
      searchParams: [{
        type: 'email',
        value: [localStorage.getItem('email')]
      }]
    }
    return this.api.post('users/searchWithFilters', requestBody)
  }

  this.getUserRecipes = (id) => {
    return this.api.get(`users/${id}/recipes`)
  }

  this.updateUserInfo = (id, newData) => {
    return this.api.put(`users/${id}`, newData)
  }

  this.getUserImg = (id) => {
    return this.api.get(`users/${id}/image`)
  }

  this.updateUserImg = (id, img) => {
    return this.api.put(`users/${id}/image`, {img})
  }

  this.updateUserRecipe = (idUser, idRecipe) => {
    return this.api.put(`users/${idUser}/recipes`,
      {recipe: idRecipe})
  }

  // RECIPE API
  
  this.createRecipe = (idUser, newRecipe) => {
    return this.api.post(`recipes/`, newRecipe)
      .then(recipe => {
        let recipeId = recipe.data.recipe._id
        this.updateUserRecipe(idUser, recipeId)
      })
  }

  this.getRecipeById = (recipeId) =>{
    return this.api.get(`recipes/${recipeId}`)
  }

  this.getAllRecipes = () => {
    return this.api.get('recipes/')
  }

  // INGREDIENTS

  this.getAllFoods = (id, img) => {
    return this.api.get(`foods/`)
  }

}

const api = new Api()
