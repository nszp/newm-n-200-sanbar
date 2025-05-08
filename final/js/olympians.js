import { getResources } from "./services.js";
import { redirect } from "./utilities.js";

let currentEditId = null;

function renderCard(olympian, isLocalStorage = false) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = `card-${olympian.id}`;
  if (!isLocalStorage)
    card.addEventListener("click", () =>
      redirect(`./olympian.html?id=${olympian.id}`)
    );
  const name = document.createElement("h2");
  name.textContent = olympian.greekName;
  card.appendChild(name);
  const img = document.createElement("img");
  img.src = olympian.image;
  card.appendChild(img);
  if (!isLocalStorage) {
    const a = document.createElement("a");
    a.textContent = "Learn More";
    card.appendChild(a);
  } else {
    const buttons = document.createElement("div");
    buttons.className = "buttons";
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", (event) => {
      event.stopPropagation();
      currentEditId = olympian.id;
      const form = document.getElementById("addOlympianForm");
      form.name.value = olympian.name;
      form.image.value = olympian.image;
      form.querySelector('button[type="submit"]').textContent = "Update";
    });
    buttons.appendChild(editButton);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const localStorageData =
        JSON.parse(localStorage.getItem("olympians")) || [];
      const updatedData = localStorageData.filter(
        (item) => item.id !== olympian.id
      );
      localStorage.setItem("olympians", JSON.stringify(updatedData));
      if (olympian.id === currentEditId) {
        currentEditId = null;
        form.querySelector('button[type="submit"]').textContent = "Add";
        form.reset();
      }
      card.remove();
    });
    buttons.appendChild(deleteButton);
    card.appendChild(buttons);
  }
  return card;
}

async function renderOlympians() {
  const olympians = await getResources("olympians");
  const localStorageOlympians =
    JSON.parse(localStorage.getItem("olympians")) || [];
  for (const olympian of olympians) {
    document.querySelector("main").appendChild(renderCard(olympian));
  }
  for (const olympian of localStorageOlympians) {
    document.querySelector("main").appendChild(renderCard(olympian, true));
  }
}

renderOlympians();

const form = document.getElementById("addOlympianForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const localStorageData = JSON.parse(localStorage.getItem("olympians")) || [];

  if (currentEditId) {
    const olympianIndex = localStorageData.findIndex(
      (olympian) => olympian.id === currentEditId
    );
    if (olympianIndex !== -1) {
      localStorageData[olympianIndex].name = formData.get("name");
      localStorageData[olympianIndex].image = formData.get("image");
      localStorage.setItem("olympians", JSON.stringify(localStorageData));
      const card = document.getElementById(`card-${currentEditId}`);
      card.querySelector("h2").textContent = formData.get("name");
      card.querySelector("img").src = formData.get("image");
      card.querySelector("img").alt = formData.get("name");
    }
    currentEditId = null;
    form.querySelector('button[type="submit"]').textContent = "Add";
    form.reset();
    return;
  }

  const newOlympian = {
    id: localStorageData.length + 1,
    name: formData.get("name"),
    image: formData.get("image"),
  };

  localStorageData.push(newOlympian);
  localStorage.setItem("olympians", JSON.stringify(localStorageData));
  const card = renderCard(newOlympian, true);
  document.querySelector("main").appendChild(card);
  form.reset();
});
