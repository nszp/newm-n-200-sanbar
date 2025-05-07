import { getResources } from "./services.js";
import { redirect } from "./utilities.js";

let currentEditId = null;

function renderCard(creature, isLocalStorage = false) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = `card-${creature.id}`;
  if (!isLocalStorage) {
    card.addEventListener("click", () =>
      redirect(`./creature.html?id=${creature.id}`)
    );
  }

  const name = document.createElement("h2");
  name.textContent = creature.name;
  card.appendChild(name);

  const img = document.createElement("img");
  img.src = creature.image;
  img.alt = creature.name;
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
      currentEditId = creature.id;
      const form = document.getElementById("addCreatureForm");
      form.name.value = creature.name;
      form.image.value = creature.image;
      form.querySelector('button[type="submit"]').textContent = "Update";
    });
    buttons.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const localStorageData =
        JSON.parse(localStorage.getItem("creatures")) || [];
      const updatedData = localStorageData.filter(
        (item) => item.id !== creature.id
      );
      localStorage.setItem("creatures", JSON.stringify(updatedData));
      if (creature.id === currentEditId) {
        currentEditId = null;
        const form = document.getElementById("addCreatureForm");
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

async function renderCreatures() {
  const apiCreatures = await getResources("creatures");
  const localStorageCreatures =
    JSON.parse(localStorage.getItem("creatures")) || [];

  for (const creature of apiCreatures) {
    document.querySelector("main").appendChild(renderCard(creature));
  }

  for (const creature of localStorageCreatures) {
    document.querySelector("main").appendChild(renderCard(creature, true));
  }
}

renderCreatures();

const form = document.getElementById("addCreatureForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const localStorageData = JSON.parse(localStorage.getItem("creatures")) || [];

  if (currentEditId) {
    const creatureIndex = localStorageData.findIndex(
      (creature) => creature.id === currentEditId
    );
    if (creatureIndex !== -1) {
      localStorageData[creatureIndex].name = formData.get("name");
      localStorageData[creatureIndex].image = formData.get("image");
      localStorage.setItem("creatures", JSON.stringify(localStorageData));
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

  const newCreature = {
    id: localStorageData.length + 1,
    name: formData.get("name"),
    image: formData.get("image"),
  };

  localStorageData.push(newCreature);
  localStorage.setItem("creatures", JSON.stringify(localStorageData));

  const card = renderCard(newCreature, true);
  document.querySelector("main").appendChild(card);
  form.reset();
});