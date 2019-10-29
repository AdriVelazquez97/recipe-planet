document.addEventListener("DOMContentLoaded", function () {

  (function authenticated () {
    if (localStorage.getItem('token')) {
      location.href = './main.html'
      console.log('user authenticated')
    } else {
      console.log('user not authenticated')
    }
  })()
  
  const api = axios.create({
    baseURL: "http://localhost:5000/api/",
    timeout: 1000
  });
  
  document.getElementById('btn-login').addEventListener('click', (event) => {
    event.preventDefault();
    const logUser = {
      userEmail:    document.getElementById("inputEmail").value,
      userPassword: document.getElementById("inputPassword").value
    };
  
    api
      .post("auth/login", logUser)
      .then(function (response) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name",  response.data.username);
        localStorage.setItem("email", response.data.email);
        location.href = './main.html'
      })
      .catch(function (error) {
        console.log(error.response);
      });
  })

  document.getElementById('btn-signup').addEventListener('click', (event) => {
    location.href = './signup.html'
  })
})