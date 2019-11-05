document.addEventListener("DOMContentLoaded", async () => {

  const recipeHome = document.getElementsByClassName('recipeHome')[0];
  

  const allrecipes = await api.getAllRecipes();


  allrecipes.data.forEach(recipe => {

    var recipeElem = document.createElement("div");
    recipeElem.setAttribute('class', 'containerRecipe col-3 mb-5 card card-adrian')
    recipeElem.innerHTML = `<div>
    <div class="card-img-top adrian-image" style="background-image: url('${recipe.img}')"></div>
      <div class="card-body">
        <h5 class="card-title">${recipe.name}</h5>
        <p class="card-text text-truncate">${recipe.description}</p>
      </div>
    </div>`

    recipeHome.appendChild(recipeElem)

  });

})
