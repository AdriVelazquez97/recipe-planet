const Recipe = require('../models/recipeModel');

function getAllRecipes(req, res){
  Recipe.find()
    .then(response => res.json(response))
    .catch(err => handdleError(err, res))
}

function getRecipeById(req, res){
  const recipeId = req.params.id;
  Recipe.findById({_id: recipeId})
    .then(recipe => res.json(recipe))
    .catch(err => handdleError(err, res))
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
  const recipeId = req.params.id;
  const recipeUpdate = req.body
  Recipe.findByIdAndUpdate({_id: recipeId},
    recipeUpdate,
    {new: true})
    .then(recipe => res.json({
      msg: 'Updated',
      recipe,
    }))
    .catch(err => handdleError(err, res))
}

function deleteRecipe(req, res){
  const recipeId = req.params.id;
  Recipe.findByIdAndRemove({_id: recipeId})
    .then(recipe => res.json({
      msg: 'Deleted',
      recipe,
    }))
    .catch(err => handdleError(err, res))
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