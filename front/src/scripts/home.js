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

    recipeElem.addEventListener('click', async () => {
      document.getElementById('homePage').style.display = 'none'
      document.getElementById('profilePage').style.display = 'none'
      document.getElementById('showRecipe').style.display = ''
      window.history.pushState('recipe-planet', 'Title', `/recipe-planet.html/${recipe._id}`);
    
  
      document.getElementById('recipeNameShow').value = recipe.name
      document.getElementById('recipeDescriptionShow').value = recipe.description
      if(recipe.img !== undefined){
        document.getElementById('recipeImgShow').style.backgroundImage = `url(${recipe.img})`
      } else {
        document.getElementById('recipeImgShow').style.backgroundImage = "url('./src/img/add.png')" 
      }

      document.getElementById('ulIngredientsShow').innerHTML = ''      
      recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li')      
        const input = document.createElement('input')
        const input2 = document.createElement('input')
  
        input.setAttribute("type", "text");
        input.setAttribute("class", 'form-control');
        input.setAttribute('readonly', '');
        input.value = ingredient.cuantity
  
        input2.setAttribute("type", "text");
        input2.setAttribute("class", 'form-control');
        input2.setAttribute('readonly', '');
        input2.value = ingredient.food
        
  
        li.append(input)
        li.append(input2)
        document.getElementById('ulIngredientsShow').appendChild(li)      
  
      })
  
      document.getElementById('ulStepsShow').innerHTML = ''  
      recipe.steps.forEach(step => {
        const input = document.createElement('input')
        const li = document.createElement('li')
        input.setAttribute("type", "text");
        input.setAttribute("class", 'form-control');
        input.setAttribute('readonly', '');
        input.value = step
        li.append(input)
        document.getElementById('ulStepsShow').appendChild(li)      
      });
  
    })




    recipeHome.appendChild(recipeElem)

  });

})
