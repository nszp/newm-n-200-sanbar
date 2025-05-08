import { getResources } from "./services.js";
import { redirect } from "./utilities.js";

let currentEditId = null;

function renderCard(relic, isLocalStorage = false) {
  const card = document.createElement("div");
  card.className = "card";
  card.id = `card-${relic.id}`;
  if (!isLocalStorage)
    card.addEventListener("click", () =>
      redirect(`./relic.html?id=${relic.id}`)
    );

  const name = document.createElement("h2");
  name.textContent = relic.name;
  card.appendChild(name);

  const img = document.createElement("img");
  img.src = relic.image;
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
      currentEditId = relic.id;
      const form = document.getElementById("addRelicForm");
      form.name.value = relic.name;
      form.image.value = relic.image;
      form.querySelector('button[type="submit"]').textContent = "Update";
    });
    buttons.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      const localStorageData = JSON.parse(localStorage.getItem("relics")) || [];
      const updatedData = localStorageData.filter(
        (item) => item.id !== relic.id
      );
      localStorage.setItem("relics", JSON.stringify(updatedData));
      if (relic.id === currentEditId) {
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

async function renderRelics() {
  const apiRelics = await getResources("relics");
  const localStorageRelics = JSON.parse(localStorage.getItem("relics")) || [];

  for (const relic of apiRelics) {
    document.querySelector("main").appendChild(renderCard(relic));
  }

  for (const relic of localStorageRelics) {
    document.querySelector("main").appendChild(renderCard(relic, true));
  }
}

renderRelics();

const form = document.getElementById("addRelicForm");

// TODO: HIDE FORM IF USER IS NOT LOGGED IN AND SHOW WHEN LOGGED IN

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Add to localstorage
  const formData = new FormData(form);
  const localStorageData = JSON.parse(localStorage.getItem("relics")) || [];

  if (currentEditId) {
    const relicIndex = localStorageData.findIndex(
      (relic) => relic.id === currentEditId
    );
    if (relicIndex !== -1) {
      localStorageData[relicIndex].name = formData.get("name");
      localStorageData[relicIndex].image = formData.get("image");
      localStorage.setItem("relics", JSON.stringify(localStorageData));
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

  const newRelic = {
    id: localStorageData.length + 1,
    name: formData.get("name"),
    image: formData.get("image"),
  };

  localStorageData.push(newRelic);
  localStorage.setItem("relics", JSON.stringify(localStorageData));

  // Add to the page
  const card = renderCard(newRelic, true);

  document.querySelector("main").appendChild(card);
  form.reset();
});
