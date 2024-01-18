export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popups
    this._popupElement.classList.add("modal__opened");
    this._popupElement.focus();

    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popups
    this._popupElement.classList.remove("modal__opened");

    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    // listen for esc button
    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // click close button to close
    const closeButton = this._popupElement.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());
    document.addEventListener("click", this._handleClickOutside);
  }

  // click outside to close
  _handleClickOutside = (event) => {
    if (
      this._popupElement.classList.contains("modal__opened") &&
      event.target.classList.contains("modal__opened")
    ) {
      this.close();
    }
  };
}
