import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  setSubmit(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    const formElement = this._popupElement.querySelector(
      "#confirm-delete-form"
    );

    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleSubmit();
    });

    super.setEventListeners();
  }
}
