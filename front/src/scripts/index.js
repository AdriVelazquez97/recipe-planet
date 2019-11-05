  (function authenticated () {
  if (localStorage.getItem('token')) {
    location.href = './recipe-planet.html'
  }
})()

document.addEventListener("DOMContentLoaded", () => {
  
  document.getElementById('btn-login').addEventListener('click', async (event) => {
    event.preventDefault();
    const logUser = {
      userEmail:    document.getElementById("inputEmail").value,
      userPassword: document.getElementById("inputPassword").value
    };
    await api.login(logUser)
    location.href = `./recipe-planet.html`
  })

  document.getElementById('btn-signup').addEventListener('click', (event) => {
    location.href = './signup.html'
  })
})