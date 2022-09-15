import View from './view';
import icons from "url:../../img/icons.svg";
import previewView from './previewView';
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _messageError = "Recipe not found for you query, please try again ;)";
  _generateMakeUp() {
    return this._data.map( recp =>previewView.render(recp,false)).join("")

  }

  _generateElementLi(result){
    const id = window.location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${(result.id === id) ? "preview__link--active" : ""}" href="#${result.id}">
            <figure class="preview__fig">
                <img src="${result.imageUrl}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
            </div>
            </a>
        </li>
        `;
  }
}

export default new ResultsView();
