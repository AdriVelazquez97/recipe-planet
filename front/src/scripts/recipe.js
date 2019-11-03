
const createLiInput = (inputClass) => {
  const li = document.createElement('li')
  const input = document.createElement("INPUT");
  input.setAttribute("type", "text");
  li.setAttribute('class', inputClass);
  li.appendChild(input);
  return li
}


document.addEventListener("DOMContentLoaded", function () {

  const recipeImg = document.getElementById('recipeImg')
  const ulIngredents = document.getElementById('ulIngredents')
  const ulSteps = document.getElementById('ulSteps')

  document.getElementById('btn-add-ingredent').addEventListener('click', (event) => {
    ulIngredents.appendChild(createLiInput('inputIngredent'))
  })
  
  document.getElementById('btn-delete-ingredent').addEventListener('click', (event) => {
    ulIngredents.removeChild(ulIngredents.lastElementChild)
  })

  document.getElementById('btn-add-step').addEventListener('click', (event) => {
    ulSteps.appendChild(createLiInput('inputStep'))
  })
  
  document.getElementById('btn-delete-step').addEventListener('click', (event) => {
    ulSteps.removeChild(ulSteps.lastElementChild)
  })

  recipeImg.addEventListener('click', (event) => {
    var myWidget = cloudinary.createUploadWidget({
      cloudName: 'ddhio8g1j', 
      uploadPreset: 'pgtjohuw'}, (error, result) => { 
        if (!error && result && result.event === "success" ) {
          const newUrl = result.info.url
          recipeImg.style.backgroundImage = `url(${newUrl})` 
        }
      }
    )

    myWidget.open();
  }, false)

  document.getElementById('btn-cretae-recipe').addEventListener('click', (event) => {
    const listOfIngredents = document.getElementById('ulIngredents')
    console.log(listOfIngredents.childNodes)
    // const arrayOfIngredents = listOfIngredents.map(ingredent => {
    //   return ingredent.value 
    // })


    // console.log(arrayOfIngredents)
  })

})