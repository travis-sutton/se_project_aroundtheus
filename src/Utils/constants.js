const formSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addButtonForm = document.querySelector("#add-card-modal .modal__form");

const profileEditForm = document.querySelector(
  "#profile-edit-modal .modal__form"
);
const editAvatarForm = document.querySelector(
  "#avatar-edit-modal .modal__form"
);

// Profile
const profileTitle = document.querySelector("#prof-title");
const profileDescription = document.querySelector("#prof-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

export {
  formSettings,
  addButtonForm,
  profileEditForm,
  editAvatarForm,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
};
