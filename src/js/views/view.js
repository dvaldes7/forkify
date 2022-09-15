import icons from "url:../../img/icons.svg";
export default class View {
    _data;

    /**
     * Render to recive object to the DOM
     * @param {Object | Array<Object>} data the data to be rendered, e.g recipe
     * @param {boolean} [render = true] If is false, create markup string instace of rendering to the DOM
     * @returns {undefined | string} a string markup if render is false
     * @this {Object} View instance
     * @autor Diego Valdes
     */
    render(data, render = true){
        if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
        this._data = data;
        const markup = this._generateMakeUp();
        if (!render) return markup;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markup)
        console.log(this._parentElement);
    }

    update(data){
      //if(!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
      this._data = data;
      console.log(this._data);
      const makup = this._generateMakeUp();//crea un nuevo makeup con los nuevos datos
      const dom = document.createRange().createContextualFragment(makup); //Trae el dom con los datos que se están mostrando en la web
      const newElements = Array.from(dom.querySelectorAll("*")); //Obtiene todos los elementos, individualmente en una lista
      const oldElements = Array.from(this._parentElement.querySelectorAll("*"));//Obtiene todos los elementos, individualmente en una lista
      //console.log("up "+data);

      //NodeValue = nodeValue sera nulo o vacio si el nodo es un element, si es text obtendremos el valor en el Text
      newElements.forEach((newEl,i) =>{
        //Comparar los elementos
        //Update change TEXT  
        const oldEl = oldElements[i];
        
        if(!oldEl.isEqualNode(newEl) && oldEl.firstChild?.nodeValue.trim() !== ""){ //Si el nodo es distinto y el primer hijo es un textoDirecto, es decir nodeValue sera nulo o vacio si el nodo es un elemento y no un texto
          oldEl.textContent = newEl.textContent
          //console.log(oldEl.firstChild.nodeValue);
        }
        //Update change ATTRIBUTES
        if(!oldEl.isEqualNode(newEl)){
          Array.from(newEl.attributes).forEach(attr =>{
            //Copiar los atributos de los nuevos elementos al actual elemento
            oldEl.setAttribute(attr.name,attr.value);
          });
        }
      })

    }

    renderSpinner(){
        const makup = `
        <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div>
      `
      this._parentElement.innerHTML = ""
      this._parentElement.insertAdjacentHTML("afterbegin",makup)
    }

    _clear(){
        this._parentElement.innerHTML="";
    }

    renderError(message= this._messageError){
        const markeup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markeup);
      }
  
      renderMessage(message= this._message){
        const markeup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markeup);
      }

}