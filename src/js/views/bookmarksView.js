import View from './view';
import icons from "url:../../img/icons.svg";
import previewView from './previewView';
class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _messageError = "No bookmarks yet. Find a nice recipe and bookmark it";
  _generateMakeUp() {
    console.log(this._data);
    return this._data.map(bookmark => previewView.render(bookmark,false)).join("");
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

}

export default new BookmarksView();
