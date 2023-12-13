// ******************************  Imports ****************************** //
import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import UserInfo from "../Components/UserInfo.js";

// **************************** FormSettings **************************** //
const formSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// ************************ Original 6 Card Data ************************ //

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg ",
  },
];

// **************************** Elements **************************** //

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardButton = document.querySelector("#add-card-button");

// Profile
const profileTitle = document.querySelector("#prof-title");
const profileDescription = document.querySelector("#prof-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Cards
const addCardModal = document.querySelector("#add-card-modal");

// Modals
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addButtonForm = addCardModal.querySelector(".modal__form");

// ************************** Profile Edit ************************** //

// Profile Edit Popup
const profileEditPopup = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleProfileSaveSubmit
);

profileEditPopup.setEventListeners();

// Profile Edit Popup Button
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditPopup.open();
});

// Profile Changes Save
function handleProfileSaveSubmit() {
  const inputValues = profileEditPopup._getInputValues();

  profileTitle.textContent = inputValues.title;
  profileDescription.textContent = inputValues.description;

  // User info as an object
  const userInfo = new UserInfo(profileTitle, profileDescription);
  const currentUserInfo = userInfo.getUserInfo();
  console.log(currentUserInfo);
}

// ************************ New Card Creation ************************ //

// Add Card Popup
const addCardPopup = new PopupWithForm(
  { popupSelector: "#add-card-modal" },
  handleCardSaveSubmit
);

addCardPopup.setEventListeners();

// Add Card Button
addCardButton.addEventListener("click", () => addCardPopup.open());

function handleCardSaveSubmit() {
  const inputValues = addCardPopup._getInputValues();

  // Create a new card instance
  const newCardInstance = new Card(
    {
      name: inputValues.title,
      link: inputValues.url,
    },
    "#card-template",
    handleImageClick
  );

  // Generate the card element
  const newCardElement = newCardInstance.generateCard();

  // Add the new card to the Section
  cardSection.addItem(newCardElement);

  // Reset the Input fields on the add card popup
  addCardFormValidator.resetValidation();
}

// ************************** Preview Image ************************** //

// Preview Image Popup
const previewImagePopup = new PopupWithImage({
  popupSelector: "#preview-image-modal",
});

// Clicking an Image to get the preview Image
function handleImageClick(cardData) {
  previewImagePopup.open(cardData);
}

previewImagePopup.setEventListeners();

// ************************ Inital Card Setup ************************ //
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      console.log("rendering card", cardData);

      const cardInstance = new Card(
        cardData,
        "#card-template",
        handleImageClick
      );

      const cardElement = cardInstance.generateCard();
      cardSection.addItem(cardElement);

      return cardElement;
    },
  },
  "#cards-list"
);

cardSection.renderItems();

// ************************ Validation ************************ //
const profileFormValidator = new FormValidator(formSettings, profileEditForm);
const addCardFormValidator = new FormValidator(formSettings, addButtonForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
