export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    // opens popups
    this._popupElement.classList.add("modal_opened");
    this._popupElement.focus();

    document.addEventListener("click", this._handleClickOutside);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    // closes popups
    this._popupElement.classList.remove("modal_opened");

    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("click", this._handleClickOutside);
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
  }

  // click outside to close
  _handleClickOutside = (event) => {
    if (
      this._popupElement.classList.contains("modal_opened") &&
      event.target.classList.contains("modal_opened")
    ) {
      this.close();
    }
  };
}
