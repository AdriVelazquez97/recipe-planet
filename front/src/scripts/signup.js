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
  
  document.getElementById('btn-signup').addEventListener('click', (event) => {
    event.preventDefault();
    const newUser = {
      userName:     document.getElementById("inputName").value,
      userEmail:    document.getElementById("inputEmail").value,
      userPassword: document.getElementById("inputPassword").value
    };
  
    api
      .post("auth/signup", newUser)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name",  response.data.userName);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("id", response.data.id);
        location.href = `./recipe-planet.html`
      })
      .catch(function (error) {
        console.log(error.response);
      });
  })
  
  document.getElementById('btn-login').addEventListener('click', (event) => {
    location.href = './index.html'
  })
})