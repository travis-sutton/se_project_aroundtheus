// ******************************  Imports ****************************** //
import Card from "../Components/Card.js";
import FormValidator from "../Components/FormValidator.js";
import Section from "../Components/Section.js";
import PopupWithForm from "../Components/PopupWithForm.js";
import PopupWithImage from "../Components/PopupWithImage.js";
import PopupWithSubmit from "../Components/PopupWithSubmit.js";
import UserInfo from "../Components/UserInfo.js";
import Api from "../Components/Api.js";
import "./index.css";

import headerSrc from "../images/logo.svg";
const headerImg = document.getElementById("header-img");
headerImg.src = headerSrc;

import avatarSrc from "../images/jacques-cousteau.jpg";
const avatarImg = document.getElementById("avatar-image");
avatarImg.src = avatarSrc;

import {
  formSettings,
  addButtonForm,
  profileEditForm,
  editAvatarForm,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
} from "../Utils/constants.js";

// ********************************* API ******************************** //

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "16b910f9-e28d-483c-ac51-2ec35ebc8735",
    "Content-Type": "application/json",
  },
});

let userInfoInstance;

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
      cardSection.renderItems(res);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const renderCard = (card) => {
  const cardInstance = new Card(
    card,
    "#card-template",
    handleImageClick,
    handleDeleteIconClick,
    api
  );

  return cardInstance.generateCard();
};

const cardSection = new Section(
  {
    items: [],
    renderer: (card) => {
      const cardElement = renderCard(card);
      cardSection.addItem(cardElement);
    },
  },
  "#cards-list"
);

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

  const newInfo = {
    name: inputValues.title,
    about: inputValues.description,
  };

  saveButton.textContent = "Saving...";

  apiUpdateProfileInfo(newInfo)
    .then((res) => {
      console.log(res);
      userInfoInstance.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
      });
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      saveButton.textContent = "Save";
    });
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
  const avatarLink = formData.url;
  avatarImg.src = avatarLink;

  saveButton.textContent = "Saving...";

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
    .then((res) => {
      console.log("New Card:", cardInfo);
      const cardElement = renderCard(res);
      cardSection.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((error) => {
      console.error("API Error:", error);
    })
    .finally(() => {
      saveButton.textContent = "Save";
    });
}

// *************************** Delete Card  ************************** //
const confirmDeletePopup = new PopupWithSubmit({
  popupSelector: "#delete-card-modal",
});

const confirmDeleteButton = document.querySelector(
  "#confirm-delete-modal-button"
);

confirmDeletePopup.setEventListeners();

function handleDeleteIconClick(card) {
  confirmDeletePopup.open(card);
  confirmDeleteButton.focus();
  confirmDeletePopup.setSubmit(() => {
    card
      .deleteCard()
      .then(() => {
        this._element.remove();
        this._element = null;
        confirmDeletePopup.close();
      })
      .catch((error) => {
        console.error(`Error deleteing card: ${error}`);
      });
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

// ************************* Form Validation ************************* //

const profileFormValidator = new FormValidator(formSettings, profileEditForm);
const addCardFormValidator = new FormValidator(formSettings, addButtonForm);
const editAvatarFormValidator = new FormValidator(formSettings, editAvatarForm);

profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
editAvatarFormValidator.enableValidation();
