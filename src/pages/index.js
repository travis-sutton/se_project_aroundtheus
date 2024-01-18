// ******************************  Imports ****************************** //
import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import Popup from "../Components/Popup.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import UserInfo from "../Components/UserInfo.js";
import Api from "../Components/api.js";
import "./index.css";

import headerSrc from "../images/logo.svg";
const headerImg = document.getElementById("header-img");
headerImg.src = headerSrc;

import avatarSrc from "../images/jacques-cousteau.jpg";
const avatarImg = document.getElementById("avatar-image");
avatarImg.src = avatarSrc;

// **************************** Elements **************************** //

const addCardModal = document.querySelector("#add-card-modal");
const addButtonForm = addCardModal.querySelector(".modal__form");

const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");

const editAvatarModal = document.querySelector("#avatar-edit-modal");
const editAvatarForm = editAvatarModal.querySelector(".modal__form");

// Profile
const profileTitle = document.querySelector("#prof-title");
const profileDescription = document.querySelector("#prof-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// ********************************* API ******************************** //

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "16b910f9-e28d-483c-ac51-2ec35ebc8735",
    "Content-Type": "application/json",
  },
});

let userInfoInstance;

// Initialiize, Generate User Profile and Cards on Load
api
  .getUserInfo()
  .then((userInfo) => {
    const { name, about, avatar } = userInfo;
    userInfoInstance = new UserInfo(
      profileTitle,
      profileDescription,
      avatarImg
    );

    userInfoInstance.setUserInfo({
      name,
      job: about,
      avatar: avatar,
    });
    api.getInitialCards().then((res) => {
      console.log(res);
      res.forEach((item) => {
        renderCard(item);
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Edit User Profile
const apiUpdateProfileInfo = (newInfo) => {
  return api
    .editUserInfo(newInfo)
    .then((updatedInfo) => {
      profileTitleInput.value = updatedInfo.name;
      profileDescriptionInput.value = updatedInfo.about;

      return updatedInfo;
    })
    .catch((error) => {
      console.error(error);
    });
};

// ************************** Profile Edit ************************** //

// Profile Edit Popup
const profileEditPopup = new PopupWithForm(
  { popupSelector: "#profile-edit-modal" },
  handleProfileSaveSubmit
);

profileEditPopup.setEventListeners();

// Profile Edit Popup Button
const profileEditButton = document.querySelector("#profile-edit-button");

profileEditButton.addEventListener("click", () => {
  if (userInfoInstance) {
    const userInfoData = userInfoInstance.getUserInfo();

    profileTitleInput.value = userInfoData.name;
    profileDescriptionInput.value = userInfoData.job;

    profileFormValidator.resetValidation();
    profileEditPopup.open();
  }
});

function handleProfileSaveSubmit(inputValues) {
  const saveButton = document.getElementById("profile-modal-save-button");

  saveButton.textContent = "Saving...";

  userInfoInstance.setUserInfo({
    name: inputValues.title,
    job: inputValues.description,
    avatar: avatarImg.src,
  });

  const newInfo = {
    name: inputValues.title,
    about: inputValues.description,
    avatar: avatarImg.src,
  };

  apiUpdateProfileInfo(newInfo).then(() => (saveButton.textContent = "Save"));
}

// *********************** Profile Avatar Edit *********************** //

const avatarModal = new PopupWithForm(
  {
    popupSelector: "#avatar-edit-modal",
  },
  handleAvatarFormSubmit
);

avatarModal.setEventListeners();

const avatarEditButton = document.getElementById("avatar-image");

avatarEditButton.addEventListener("click", () => {
  editAvatarFormValidator.resetValidation();

  avatarModal.open();
});

function handleAvatarFormSubmit(formData) {
  const saveButton = document.getElementById("avatar-modal-save-button");

  saveButton.textContent = "Saving...";

  const avatarLink = formData.url;

  const avatarImg = document.getElementById("avatar-image");
  avatarImg.src = avatarLink;

  api
    .updateAvatar(avatarLink)
    .then((updatedInfo) => {
      userInfoInstance.setUserInfo({
        name: updatedInfo.name,
        job: updatedInfo.about,
        avatar: updatedInfo.avatar,
      });

      avatarModal.close();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      saveButton.textContent = "Save";
      addCardPopup.close();
    });
}

// ************************ New Card Creation ************************ //

// Add Card Popup
const addCardPopup = new PopupWithForm(
  { popupSelector: "#add-card-modal" },
  handleCardSaveSubmit
);

addCardPopup.setEventListeners();

// Add Card Button
const addCardButton = document.querySelector("#add-card-button");

addCardButton.addEventListener("click", () => {
  addCardFormValidator.resetValidation();

  addCardPopup.open();
});

// Create a new card
function handleCardSaveSubmit(inputValues) {
  const saveButton = document.getElementById("add-card-save-button");

  saveButton.textContent = "Saving...";

  const cardInfo = {
    name: inputValues.title,
    link: inputValues.url,
  };

  api
    .addNewCard(cardInfo)
    .then(() => {
      console.log("New Card:", cardInfo);
      renderCard(cardInfo);
    })
    .catch((error) => {
      console.error("API Error:", error);
    })
    .finally(() => {
      saveButton.textContent = "Save";
      addCardPopup.close();
    });
}

// *************************** Delete Card  ************************** //
const confirmDeletePopup = new Popup({ popupSelector: "#delete-card-modal" });
const confirmDeleteButton = document.querySelector(
  "#confirm-delete-modal-button"
);

confirmDeletePopup.setEventListeners();

function handleDeleteClick(cardData) {
  console.log(cardData);
  confirmDeletePopup.open(cardData);

  confirmDeleteButton.addEventListener("click", () => {
    console.log(cardData);
    cardData._deleteCard();
    confirmDeletePopup.close();
  });
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

const renderCard = (card) => {
  const cardInstance = new Card(
    card,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    api
  );

  const cardElement = cardInstance.generateCard();
  cardSection.addItem(cardElement);
};

// ************************* Validation ************************* //
const formSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const profileFormValidator = new FormValidator(formSettings, profileEditForm);
const addCardFormValidator = new FormValidator(formSettings, addButtonForm);
const editAvatarFormValidator = new FormValidator(formSettings, editAvatarForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();

// ************************ Card Renderer ************************ //

// Renders cards on the page
const cardSection = new Section(
  {
    items: [],
    renderer: renderCard,
    handleFormSubmit: (item) => {
      renderCard(item);
    },
  },
  "#cards-list"
);

cardSection.renderItems();
