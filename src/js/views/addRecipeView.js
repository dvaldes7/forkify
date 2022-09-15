import View from './view';
import icons from "url:../../img/icons.svg";
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = "Recipe upload successful!";
  _overlay = document.querySelector(".overlay");//fondo en modo blur
  _window = document.querySelector(".add-recipe-window");
  _btnClose = document.querySelector(".btn--close-modal");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");

    constructor(){
        super();
        this._addHandlerAddRecipe();
        this._addHandlerCloserButton();
    }


    _toggleButton(){
        this._window.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden")
    }
    _addHandlerAddRecipe(){
        this._btnOpen.addEventListener("click", this._toggleButton.bind(this))
    }
    
    _addHandlerCloserButton(){
        this._btnClose.addEventListener("click", this._toggleButton.bind(this))
        this._overlay.addEventListener("click", this._toggleButton.bind(this))

    }

    addHandlerUploadButton(handler){
        this._parentElement.addEventListener("submit", function(e){
            e.preventDefault();
            const dataArr = new FormData(this);
            const data = Object.fromEntries(dataArr);
            handler(data);
        })
    }


    _generateMakeUp() {
        return this._data.map(this._generateElementLi).join("")

    }




}

export default new AddRecipeView();
