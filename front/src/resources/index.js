(function authenticated () {
  if (localStorage.getItem('token')) {
    console.log('user authenticated')
  } else {
    console.log('user not authenticated')
  }
})()

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 1000
});

document.getElementById('btn-signup').addEventListener('click', (event) => {
  const newUser = {
    userName:     document.getElementById("user_name").value,
    userEmail:    document.getElementById("user_email").value,
    userPassword: document.getElementById("user_password").value
  };

  api
    .post("auth/signup", newUser)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name",  response.data.name);
      localStorage.setItem("email", response.data.email);
    })
    .catch(function (error) {
      console.log(error.response);
    });
})

document.getElementById('btn-login').addEventListener('click', (event) => {

  const logUser = {
    userEmail:    document.getElementById("login_email").value,
    userPassword: document.getElementById("login_password").value
  };

  api
    .post("auth/login", logUser)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name",  response.data.username);
      localStorage.setItem("email", response.data.email);
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error.response);
    });
})

document.getElementById('btn-api').addEventListener('click', (event) => {
  api
    .get("whoami", { headers: { token: localStorage.getItem("token") }})
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error.response);
    });
})
