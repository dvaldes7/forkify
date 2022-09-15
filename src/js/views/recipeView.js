"use strict"
import icons from "url:../../img/icons.svg";
import {Fraction} from "fractional"
import View from "./view";
class RecipeView extends View {
    _parentElement = document.querySelector('.recipe');
    _messageError = "Recipe not founded, please try another";
    _message = "Start by searching for a recipe or an ingredient. Have fun!"


    addHandlerRender(handler){
      ["load","hashchange"].forEach(ev => window.addEventListener(ev,handler))
    }

    addHandlerUpdateServing(handler){
      this._parentElement.addEventListener("click",(e) =>{
        const btn = e.target.closest(".btn--tiny");
        if(!btn) return;
        //console.log(btn);
        const updateTo = +btn.dataset.updateTo;
        if(updateTo > 0) handler(updateTo);
      });
    }

    addHandlerAddBookmark(handler){
      //Como la clase btn--bookmark aun no existe cuando se inicia la app, se delega el evento
      this._parentElement.addEventListener("click", (e)=>{
        const btn  = e.target.closest(".btn--bookmark");
        if(!btn) return;
        handler();
      }); 
    }

    _generateMakeUp(){
      console.log("makeup"+ this._data.recipe);
        return `<figure class="recipe__fig">
        <img src="${this._data.recipe.imageUrl}" alt="${this._data.recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${this._data.recipe.title}</span>
        </h1>
      </figure>
  
      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${this._data.recipe.cookingTime}</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${this._data.recipe.servings}</span>
          <span class="recipe__info-text">servings</span>
  
          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--update-servings" data-update-to = ${this._data.recipe.servings - 1}>
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--update-servings" data-update-to = ${this._data.recipe.servings + 1}>
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
  
        <div class="recipe__user-generated ${this._data.recipe.key ? "" : "hidden"}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round btn--bookmark">
          <svg class="">
            <use href="${icons}#icon-bookmark${this._data.recipe.bookmarked ? "-fill" : ""}"></use>
          </svg>
        </button>
      </div>
  
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.recipe.ingredients.map(this._generateMakeUpIngredient).join("")}
        </ul>
      </div>
  
      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${this._data.recipe.publisher}</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
      `;
    }

    _generateMakeUpIngredient({quantity,unit,description}){
        return `
        <li class="recipe__ingredient">
        <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${new Fraction(quantity).toString()}</div>
        <div class="recipe__description">
            <span class="recipe__unit">${unit}</span>
            ${description}
        </div>
        </li>
            `;
    }
}

export default new RecipeView();