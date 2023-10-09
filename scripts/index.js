// Original 6 Card Data //

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

// Elements //

// Buttons
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#profile-close-modal"
);
const profileSaveButton = document.querySelector("#profile-modal-save-button");
const addCardButton = document.querySelector("#add-card-button");
const addButtonCloseModal = document.querySelector("#add-button-close-modal");
const previewImageCloseModal = document.querySelector(
  "#preview-image-close-modal"
);

// Profile
const profileTitle = document.querySelector("#prof-title");
const profileDescription = document.querySelector("#prof-description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

// Cards
const cardTitleInput = document.querySelector("#add-card-title-input");
const cardImageInput = document.querySelector("#add-card-image-input");

const cardListEl = document.querySelector("#cards-list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addCardModal = document.querySelector("#add-card-modal");

// Modals
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addButtonForm = addCardModal.querySelector(".modal__form");

// Images
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImageText = document.querySelector(
  ".modal__container-preview-image-text"
);

// Functions //

// Manage Cards
function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector("#card-image");
  const cardTitleEl = cardElement.querySelector("#card-title");

  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__trash-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button-active");
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewImageModal);
    const previewImage = previewImageModal.querySelector("#preview-image");
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewImageText.textContent = cardData.name;
  });

  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  return cardElement;
}

// Modal Open
function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.focus();
  document.addEventListener("keydown", closeModalOnEsc);
  document.addEventListener("click", closeModalOnClickOutside);
}

// Modal Close
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalOnEsc);
  document.removeEventListener("click", closeModalOnClickOutside);
}

// Esc Key
function closeModalOnEsc(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

// Click outside modal close
function closeModalOnClickOutside(event) {
  if (event.target.classList.contains("modal")) {
    closeModal(event.target);
  }
}

// Profile Changes Save
function handleProfileSaveSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

// Add New Card Save
function handleCardSaveSubmit(event) {
  event.preventDefault();
  const name = cardTitleInput.value;
  const link = cardImageInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);

  event.target.reset();
}

// Create Card
function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// Event Listeners //

// Profile
// Profile Edit Modal Open
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

// Profile Edit Modal Close
profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

// Profile Edit Modal Save
profileEditForm.addEventListener("submit", handleProfileSaveSubmit);

// Add New Card
// Add New Card Modal Open
addCardButton.addEventListener("click", () => openModal(addCardModal));

// Add New Card Modal Close
addButtonCloseModal.addEventListener("click", () => closeModal(addCardModal));

// Add New Card Modal Save
addButtonForm.addEventListener("submit", handleCardSaveSubmit);

// Preview Image
// Preview Image Close
previewImageCloseModal.addEventListener("click", () => {
  closeModal(previewImageModal);
});

// Setup //
// Generate Initial 6 cards
initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
