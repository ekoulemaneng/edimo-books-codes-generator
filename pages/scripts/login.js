const usernameInputElement = document.getElementById('username')
const passwordInputElement = document.getElementById('password')
const submitButtonElement = document.getElementById('submit-credentials')
const inputsValidationElement = document.getElementById('inputs-validation')

const inputsValidator = () => {
    if (usernameInputElement.value.replaceAll(' ', '') === '') {
        inputsValidationElement.textContent = 'Vous devez fournir votre nom d\'utilisateur.'
        return false
    }
    else if (passwordInputElement.value.replaceAll(' ', '') === '') {
        inputsValidationElement.textContent = 'Vous devez fournir votre mot de passe.'
        return false
    }
    return true
}

const inputsHandler = async (e) => {
    try {
        e.preventDefault()
        if (inputsValidator()) {
            inputsValidationElement.textContent = ''
            const username = usernameInputElement.value.trim()
            const password = passwordInputElement.value.trim()
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            }
            const response = await fetch('/login', options)
            const payload = await response.json()
            if (!response.ok) inputsValidationElement.textContent = payload.data
            else window.location.replace(payload.redirect)
        }
    } 
    catch (error) {
        console.log(error)
    }
}

submitButtonElement.addEventListener('click',inputsHandler)