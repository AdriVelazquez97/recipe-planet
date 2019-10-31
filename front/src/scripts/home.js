(function authenticated () {
  if (!localStorage.getItem('token')) {
    location.href = './index.html'
  }
})()


document.addEventListener("DOMContentLoaded", function () {

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


})