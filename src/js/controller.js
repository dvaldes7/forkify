import * as model from "./models/model"
import recipeView from "./views/recipeView"
import searchView from "./views/searchView";
import resultsView from "./views/resultsView";
import bookmarksView from "./views/bookmarksView";
import paginationView from "./views/paginationView";
import addRecipeView from "./views/addRecipeView";
import "core-js/stable";
import "regenerator-runtime/runtime"

// https://forkify-api.herokuapp.com/v2


const controlGetRecipe = async () =>{
  try {
    const id = window.location.hash.slice(1);
    if(!id) return;
    recipeView.renderSpinner();
    //Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmark)
    //Loading recipe
    await model.loadRecipe(id);
    //render recipe
    recipeView.render(model.state);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
}


const controlSearchRecipes = async()=>{
  try{
    const query = searchView.getQuery();
    resultsView.renderSpinner();
    await model.searchRecipes(query);
    resultsView.render(model.getSearchResultsPage());//Render results of search
    paginationView.render(model.state.search); //Render if have others page
  }catch(e){
    console.log("error: "+e);
  }
}


const controlClickPagination = (goToPage)=>{
  try {
    //Render results
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
  } catch (error) {
    
  }
}

const controlUpdateServing = (updateTo) =>{
  model.updateServing(updateTo);
  //recipeView.render(model.state);
  recipeView.update(model.state);
}

const controlAddBookmark = () =>{
  //add/remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.removeBookmark(model.state.recipe.id);
  //console.log(model.state.recipe)
  //Update recipe view
  recipeView.update(model.state);
  //Render bookmarks
  bookmarksView.render(model.state.bookmark)
  //bookmarksView.render);

}

const controlBookmarks = function () {
  console.log(model.state.bookmark);
  bookmarksView.render(model.state.bookmark);
};


const controlUploadRecipe = async function(data){
  try{
    //console.log(data);
    //upload new recipe
    addRecipeView.renderSpinner();
    await model.uploadRecipe(data);
    //render new recipe
    recipeView.render(model.state);
    //render bookmark
    bookmarksView.render(model.state.bookmark)
    //message succesfull
    addRecipeView.renderMessage()
    //change url
    window.history.pushState(null,"",`#${model.state.recipe.id}`);
    //hidden form
    setTimeout(() => {
      addRecipeView._toggleButton()
    }, 2500);
  }catch(e){
    console.log("ERRRORRRRR");
    addRecipeView.renderError(e.message);
  }
}
const init = ()=>{
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlGetRecipe)
  recipeView.addHandlerUpdateServing(controlUpdateServing);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchRecipes);
  paginationView.addHandlerClickButtonPage(controlClickPagination);
  addRecipeView.addHandlerUploadButton(controlUploadRecipe)
}
init();