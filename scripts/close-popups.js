let openModalElement = null; // Track the open modal

// Function to open the modal
function openModal(modal) {
  modal.classList.add("modal__opened");
  openModalElement = modal; // Set the open modal
  modal.focus();
}

// Function to close the modal
function closeModal(modal) {
  modal.classList.remove("modal__opened");
  openModalElement = null; // Reset the open modal
}

// Event listener for "Escape" key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && openModalElement) {
    closeModal(openModalElement); // Close the open modal when "Escape" is pressed
  }
});

// Event listeners for clicking outside the modal
document.addEventListener("click", (e) => {
  if (openModalElement && e.target === openModalElement) {
    closeModal(openModalElement); // Close the open modal when clicked outside
  }
});
