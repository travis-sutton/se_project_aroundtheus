export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick, api) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._api = api;
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
      this._handleDeleteClick(this);
    });
  }

  _deleteCard() {
    const cardId = this._data._id;

    this._api
      .deleteCard(cardId)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch((error) => {
        console.error(`Error deleteing card: ${error}`);
      });
  }

  _toggleLike() {
    const cardId = this._data._id;

    if (this._data.isLiked === false) {
      this._api
        .addLike(cardId)
        .then(() => {
          this._likeButton.classList.add("card__like-button-active");
          this._data.isLiked = true;
        })
        .catch((error) => {
          console.error(`Error liking card: ${error}`);
        });
    } else {
      this._api
        .removeLike(cardId)
        .then(() => {
          this._likeButton.classList.remove("card__like-button-active");
          this._data.isLiked = false;
        })
        .catch((error) => {
          console.error(`Error liking card: ${error}`);
        });
    }
  }

  generateCard() {
    this._element = this._getInfo();
    this._setEventListeners();

    this._element.querySelector(".card__title").textContent = this._data.name;

    this._cardImageElement.src = this._data.link;
    this._cardImageElement.alt = this._data.name;

    if (this._data.isLiked) {
      this._likeButton.classList.add("card__like-button-active");
    } else {
      this._likeButton.classList.remove("card__like-button-active");
    }

    return this._element;
  }
}
