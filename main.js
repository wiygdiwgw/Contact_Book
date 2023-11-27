let contacts = [];
let nextContactId = 1;

function renderContactList() {
  const contactListElement = document.getElementById("contact-list");
  contactListElement.innerHTML = "";

  contacts.forEach((contact) => {
    const contactCard = createContactCard(contact);
    contactListElement.appendChild(contactCard);
  });
}

function createContactCard(contact) {
  const contactCard = document.createElement("div");
  const contactImage = document.createElement("img");
  const contactDetails = document.createElement("div");
  const contactName = document.createElement("p");
  const contactPhone = document.createElement("p");
  const contactActions = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  contactCard.classList.add("contact-card");

  contactImage.src = contact.image;
  contactImage.alt = contact.name;

  contactDetails.classList.add("contact-details");

  contactName.classList.add("contact-name");
  contactName.textContent = contact.name;

  contactPhone.classList.add("contact-number");
  contactPhone.textContent = contact.phone;

  contactActions.classList.add("contact-actions");

  editButton.classList.add("edit-button");
  editButton.textContent = "Edit";

  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";

  contactActions.appendChild(editButton);
  contactActions.appendChild(deleteButton);

  contactDetails.appendChild(contactName);
  contactDetails.appendChild(contactPhone);

  contactCard.appendChild(contactImage);
  contactCard.appendChild(contactDetails);
  contactCard.appendChild(contactActions);

  editButton.addEventListener("click", () => {
    showEditForm(contact.id);
  });

  deleteButton.addEventListener("click", () => {
    deleteContact(contact.id);
  });

  return contactCard;
}

function addContact(event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const imageInput = document.getElementById("image");

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const image = imageInput.value.trim();

  if (name === "" || phone === "" || image === "") {
    alert("Fill in everything!");
    return;
  }

  const newContact = {
    id: nextContactId++,
    name,
    phone,
    image,
  };

  contacts.push(newContact);
  renderContactList();

  nameInput.value = "";
  phoneInput.value = "";
  imageInput.value = "";
}

function deleteContact(contactId) {
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts.splice(index, 1);
    renderContactList();
  }
}

function showEditForm(contactId) {
  const editForm = document.getElementById("edit-contact-form");
  const cancelEditButton = document.getElementById("cancel-edit");

  const editNameInput = document.getElementById("edit-name");
  const editPhoneInput = document.getElementById("edit-phone");
  const editImageInput = document.getElementById("edit-image");

  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  editNameInput.value = contacts[contactIndex].name;
  editPhoneInput.value = contacts[contactIndex].phone;
  editImageInput.value = contacts[contactIndex].image;

  editForm.style.display = "block";

  cancelEditButton.addEventListener("click", () => {
    editForm.style.display = "none";
  });

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newName = editNameInput.value.trim();
    const newPhone = editPhoneInput.value.trim();
    const newImage = editImageInput.value.trim();

    if (newName === "" || newPhone === "" || newImage === "") {
      alert("Fill in everything!");
      return;
    }

    contacts[contactIndex].name = newName;
    contacts[contactIndex].phone = newPhone;
    contacts[contactIndex].image = newImage;

    renderContactList();
    editForm.style.display = "none";
  });
}

const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", addContact);

renderContactList();

const changeColorButton = document.getElementById("change-color-button");

function changeBackgroundColor() {
  const randomColor = Math.floor(Math.random() * 16777214).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
}

changeColorButton.addEventListener("click", changeBackgroundColor);
