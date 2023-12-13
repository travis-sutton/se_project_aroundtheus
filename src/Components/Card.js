export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getInfo() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImageElement = cardElement.querySelector(".card__image");

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._data);
    });

    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });
  }

  _toggleLike() {
    this._likeButton.classList.toggle("card__like-button-active");
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getInfo();
    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._data.name;

    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;

    return this._element;
  }
}
