// Section Class - handles the rendering of the intitial cards, and adds new ones

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    // renders all elements on the page
    // iterate through the items array and call the renderer() fucntion on each item

    this._items.forEach(this._renderer);
  }

  addItem(element) {
    // takes DOM element and adds it to the container
    // called when adding an individual card to the DOM
    this._container.prepend(element);
    // console.log("Created from section class:", element);
  }
}
