export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    // this.setEventListeners();
  }

  open() {
    // opens popups
    this._popupElement.classList.add("modal__opened");
    this._popupElement.focus();

    document.addEventListener("keydown", this._handleEscClose);

    console.log(`${this._popupElement.id} opened`);
  }

  close() {
    // closes popups
    this._popupElement.classList.remove("modal__opened");

    document.removeEventListener("keydown", this._handleEscClose);

    console.log(`${this._popupElement.id} closed`);
  }

  _handleEscClose = (event) => {
    // listen for esc button
    if (event.key === "Escape") {
      this.close();
      console.log("ESC closed the popup");
    }
  };

  setEventListeners() {
    // sets event listeners that adds a click event listener to the close icon
    // of the popup
    // The modal window should also close when users click on the shaded
    // area around the form.

    // click close button to close
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());
    document.addEventListener("click", this._handleClickOutside);
  }

  // click outside to close
  _handleClickOutside = (event) => {
    if (this._popupElement.classList.contains("modal__opened")) {
      if (event.target.classList.contains("modal__opened")) {
        this.close();
        console.log("Clicking outside the popup closed the popup");
      }
    }
  };
}
