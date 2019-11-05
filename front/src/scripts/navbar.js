document.addEventListener("DOMContentLoaded", () => {
  const homePage = document.getElementById('homePage')
  const profilePage = document.getElementById('profilePage')
  const newRecipePage = document.getElementById('newRecipePage')
  const showRecipe = document.getElementById('showRecipe')

  function hideAllPages(current){
    window.history.pushState('recipe-planet', 'Title', `/recipe-planet.html`);
    homePage.style.display = 'none'
    profilePage.style.display = 'none'
    newRecipePage.style.display = 'none'
    showRecipe.style.display = 'none'

    current.style.display = ''
  }
  
  document.getElementById('btn-home').addEventListener('click', (event) => {
    hideAllPages(homePage);
  })
  document.getElementById('btn-profile').addEventListener('click', (event) => {
    hideAllPages(profilePage);
  })
  document.getElementById('btn-new-recipe').addEventListener('click', (event) => {
    hideAllPages(newRecipePage);
  })

  document.getElementById('btn-logout').addEventListener('click', (event) => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    location.href = './index.html'
  })

})