
const setButtonsToDisplayNone = () => {
  document.getElementById('btn-add-ingredient-show').style.display = 'none'
  document.getElementById('btn-delete-ingredient-show').style.display = 'none'
  document.getElementById('btn-add-step-show').style.display = 'none'
  document.getElementById('btn-delete-step-show').style.display = 'none'
  // document.getElementById('btn-update-recipeshow').style.display = 'none'
}




document.addEventListener("DOMContentLoaded", async () => {
  setButtonsToDisplayNone();


  const divShowRecipe = document.getElementById('showRecipe').sty

  document.getElementById('btn-update-recipeshow').addEventListener('click', async () =>{
    const urlSplited = window.location.href.split('/')
    const recipeId = urlSplited[urlSplited.length-1]
    
    await api.getRecipeById(recipeId)
      .then(recipe => console.log(recipe))
      .catch(err => console.log(err))
  })
})
