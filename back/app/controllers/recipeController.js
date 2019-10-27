const Recipe = require('../models/recipeModel');

function getAllRecipes(req, res){
  Recipe.find()
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function getRecipeById(req, res){
  res.json('esta ruta es para recipes id')
}

function createRecipe(req, res){
  const newRecipe = req.body;

  Recipe.create(newRecipe)
    .then(response => res.json({
      msg: 'Created',
      recipe: response
    }))
    .catch(err => handdleError(err, res));
}

function updateRecipe(req, res){
  res.json('esta ruta es para update recipe')
}

function deleteRecipe(req, res){
  res.json('esta ruta es para delete recipe')
}

function handdleError(err, res) {
  return res.status(400).json(err);
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}