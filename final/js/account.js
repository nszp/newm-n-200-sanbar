document.querySelectorAll('a[href$="account.html"]').forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    showModal();
  });
});

if (!localStorage.getItem('activeUser')) {
    document.querySelectorAll('form').forEach(form => form.style.display = 'none');
}

function showModal() {
  const dialog = document.createElement("dialog");
  dialog.id = "account-modal";

  let activeUser = JSON.parse(localStorage.getItem("activeUser") || "{}");
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const title = document.createElement("h2");
  title.textContent = "Account";
  title.classList.add("modal-header");
  dialog.appendChild(title);

  const cancel = document.createElement("button");
  cancel.textContent = "Cancel";
  cancel.classList.add("modal-button");
  cancel.addEventListener("click", () => {
    dialog.close();
    // Remove modal from DOM
    dialog.remove();
  });

  if (activeUser?.username) {
    const welcome = document.createElement("p");
    welcome.textContent =
      "Welcome! You are logged in as " + activeUser.username;
    welcome.classList.add("welcome-message");

    const logout = document.createElement("button");
    logout.textContent = "Log Out";
    logout.classList.add("modal-button");
    logout.addEventListener("click", () => {
      // Log out of account here
      localStorage.removeItem("activeUser");
      document.querySelectorAll('form').forEach(form => form.style.display = 'none');


      // Close modal
      dialog.close();
      // Remove modal from DOM
      dialog.remove();
    });

    const buttons = document.createElement("div");
    buttons.classList.add("modal-buttons");
    buttons.append(cancel, logout);

    dialog.append(welcome, buttons);
  } else {
    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.placeholder = "Username";
    usernameInput.id = "username";
    usernameInput.classList.add("modal-input");
    usernameInput.required = true;

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.placeholder = "Password";
    passwordInput.id = "password";
    passwordInput.classList.add("modal-input");
    passwordInput.required = true;

    const error = document.createElement("p");
    error.id = "error-message";
    error.classList.add("error-message");
    error.textContent = "Invalid username or password";
    error.style.display = "none";


    const login = document.createElement("button");
    login.textContent = "Login";
    login.classList.add("modal-button");
    login.addEventListener("click", async () => {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      // Log in to account
      let userFound = false;
      let correctPassword = false;

      for (let i = 0; i < users.length; i++) {
        const currentUser = users[i];
        if (currentUser.username === username) {
          userFound = true;
          if (currentUser.password === password) {
            correctPassword = true;
          }
        }
      }

      if (userFound === false) {
        error.textContent = "User not found";
        error.style.display = "block";
      } else if (correctPassword === false) {
        error.textContent = "Incorrect password";
        error.style.display = "block";
      } else {
        activeUser = {username: username};
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
        document.querySelectorAll('form').forEach(form => form.style.display = 'flex');

        // Close modal
        dialog.close();
        // Remove modal from DOM
        dialog.remove();
      }
    });

    const register = document.createElement("button");
    register.textContent = "Register";
    register.classList.add("modal-button");
    register.addEventListener("click", async () => {
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      // Register new account

      if (!username || !password) {
        error.textContent = "Please fill in all fields";
        error.style.display = "block";
        return;
      }

      // Check if username already exists
      if (users.find(user => user.username === username)) {
        error.textContent = "Username already exists";
        error.style.display = "block";
        return;
      }

      users.push({username: username, password: password});
      localStorage.setItem("users", JSON.stringify(users));

      activeUser = {username: username};
      localStorage.setItem("activeUser", JSON.stringify(activeUser));
      document.querySelectorAll('form').forEach(form => form.style.display = 'flex');


      // Close modal
      dialog.close();
      // Remove modal from DOM
      dialog.remove();
    });

    const buttons = document.createElement("div");
    buttons.classList.add("modal-buttons");


    buttons.append(cancel, login, register);

    dialog.append(usernameInput, passwordInput, error, buttons);
  }

  document.body.appendChild(dialog);
  dialog.showModal();
}
