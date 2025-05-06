document.querySelectorAll('a[href$="account.html"]').forEach(el => {
    el.addEventListener('click', (e) => {
        e.preventDefault()
        showModal()
    })
})

function showModal() {
    const dialog = document.createElement('dialog')
    dialog.id = 'account-modal'

    // Check if we are logged in

    // const loggedIn = await checkLogin() // Check if user is logged in
    const loggedIn = false // For testing purposes, set to false
    const username = 'testuser' // For testing purposes, set to testuser

    const title = document.createElement('h2')
    title.textContent = 'Account'
    title.classList.add('modal-header')
    dialog.appendChild(title)

    if (loggedIn) {
        const welcome = document.createElement('p')
        welcome.textContent = 'Welcome! You are logged in as ' + username
        welcome.classList.add('welcome-message')

        const logout = document.createElement('button')
        logout.textContent = 'Log Out'
        logout.classList.add('modal-button')
        logout.addEventListener('click', () => {
            // Log out of account here

            // Close modal
            dialog.close()
            // Remove modal from DOM
            dialog.remove()
        })

        dialog.append(welcome, logout)
    } else {
        const usernameInput = document.createElement('input')
        usernameInput.type = 'text'
        usernameInput.placeholder = 'Username'
        usernameInput.id = 'username'
        usernameInput.classList.add('modal-input')
        usernameInput.required = true

        const passwordInput = document.createElement('input')
        passwordInput.type = 'password'
        passwordInput.placeholder = 'Password'
        passwordInput.id = 'password'
        passwordInput.classList.add('modal-input')
        passwordInput.required = true

        const error = document.createElement('p')
        error.id = 'error-message'
        error.classList.add('error-message')
        error.textContent = 'Invalid username or password'
        error.style.display = 'none'

        const cancel = document.createElement('button')
        cancel.textContent = 'Cancel'
        cancel.classList.add('modal-button')
        cancel.addEventListener('click', () => {
            dialog.close()
            // Remove modal from DOM
            dialog.remove()
        })

        const login = document.createElement('button')
        login.textContent = 'Login'
        login.classList.add('modal-button')
        login.addEventListener('click', async () => {
            const username = document.getElementById('username').value
            const password = document.getElementById('password').value
            // Log in to account

            document.getElementById('error-message').style.display = 'block' // Show error message if login fails
            // Hide error message if login succeeds
            // document.getElementById('error-message').style.display = 'none' // Hide error message if login succeeds
            // Can also change error text

            // Close modal
            dialog.close()
            // Remove modal from DOM
            dialog.remove()
        })

        const register = document.createElement('button')
        register.textContent = 'Register'
        register.classList.add('modal-button')
        register.addEventListener('click', async () => {
            const username = document.getElementById('username').value
            const password = document.getElementById('password').value
            // Register new account

            // Close modal
            dialog.close()
            // Remove modal from DOM
            dialog.remove()
        })

        const buttons = document.createElement('div')
        buttons.classList.add('modal-buttons')
        buttons.append(cancel, login, register)

        dialog.append(usernameInput, passwordInput, error, buttons)
    }

    document.body.appendChild(dialog)
    dialog.showModal()

}