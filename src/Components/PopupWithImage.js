import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
  }

  open({ name, link }) {
    super.open();

    const previewImage = this._popupElement.querySelector("#preview-Image");
    const previewImageText = this._popupElement.querySelector(
      "#preview-Image-Text"
    );

    previewImage.alt = name;
    previewImage.src = link;
    previewImageText.textContent = name;
  }

  close() {
    super.close();
  }
}
