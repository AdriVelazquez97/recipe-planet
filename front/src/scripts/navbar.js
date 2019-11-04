document.addEventListener("DOMContentLoaded", () => {
  const homePage = document.getElementById('homePage')
  const profilePage = document.getElementById('profilePage')
  const followingPage = document.getElementById('followingPage')
  const newRecipePage = document.getElementById('newRecipePage')

  function hideAllPages(current){
    homePage.style.display = 'none'
    profilePage.style.display = 'none'
    followingPage.style.display = 'none'
    newRecipePage.style.display = 'none'
    current.style.display = ''
  }
  
  document.getElementById('btn-home').addEventListener('click', (event) => {
    hideAllPages(homePage);
  })
  document.getElementById('btn-profile').addEventListener('click', (event) => {
    hideAllPages(profilePage);
  })
  document.getElementById('btn-following').addEventListener('click', (event) => {
    hideAllPages(followingPage);
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