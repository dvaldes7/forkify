import View from './view';
import icons from "url:../../img/icons.svg";
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');


  addHandlerClickButtonPage(handler){
    this._parentElement.addEventListener("click",(e)=>{
      const btn = e.target.closest(".btn--inline");
      if(!btn) return;
      const goToPage = +btn.dataset.goto
      handler(goToPage)
    })
  }

  _generateMakeUp(){
    const currentPage = this._data.page;
    const pages = Math.ceil(this._data.results.length / this._data.resultPerPage) //Cuantas paginas tiene, Redondea al entero más grande
    //page 1 and there are other pages
    if(currentPage === 1 && pages > currentPage){
        return this._generateNextButton(currentPage);
    }
    
    //last page
    if(currentPage === pages && pages > 1){
        return this._generatePreviousButton(currentPage);
    }
    
    //other page
    if(currentPage < pages){
        return `${this._generatePreviousButton(currentPage)} ${this._generateNextButton(currentPage)}`
    }
    //page 1 and there are NO other pages
    return "";
  }

  _generateNextButton(currentPage){
    return `
        <button data-goto=${currentPage + 1} class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
  }

  _generatePreviousButton(currentPage){
    return `
        <button data-goto=${currentPage - 1} class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
    `;
  }
}

export default new PaginationView();