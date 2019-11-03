function Api () {

  this.api = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 1000,
    headers: {
      auth_token: localStorage.getItem('token')
    }
  });

  // AUTH API

  this.login = async (logUser) => {
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

  this.getUserData = async () => {
    const requestBody = {
      searchParams: [{
        type: 'email',
        value: [localStorage.getItem('email')]
      }]
    }
    return this.api.post('users/searchWithFilters', requestBody)
  }

  this.getUserRecipes = async (id) => {
    return this.api.get(`users/${id}/recipes`)
  }

  this.updateUserInfo = async (id, newData) => {
    return this.api.put(`users/${id}`, newData)
  }

  this.getUserImg = async (id) => {
    return this.api.get(`users/${id}/image`)
  }

  this.updateUserImg = async (id, img) => {
    return this.api.put(`users/${id}/image`, {img})
  }

  // RECIPE API

}

const api = new Api()
