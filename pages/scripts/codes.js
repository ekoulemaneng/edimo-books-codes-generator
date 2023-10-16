const numberOfCodesInputElement = document.getElementById('numberOfCodes')
const cfRadioButtonInputElement = document.getElementById('cf')
const apRadioButtonInputElement = document.getElementById('ap')
const submitButtonElement = document.getElementById('submit')
const inputsValidationElement = document.getElementById('inputs-validation')
const logoutButtonElement = document.getElementById('logout')

const inputsValidator = () => {
    if (numberOfCodesInputElement.value.replaceAll(' ', '') === '') {
        inputsValidationElement.textContent = 'Vous devez fournir le nombre de codes que vous désirez.'
        return false
    }
    else if (Number.isNaN(parseInt(numberOfCodesInputElement.value))) {
        inputsValidationElement.textContent = 'Vous devez fournir un entier comme de nombre de codes.'
        return false
    }
    else if (!cfRadioButtonInputElement.checked && !apRadioButtonInputElement.checked) {
        inputsValidationElement.textContent = 'Vous devez fournir le type de livre (couleur ou noir/blanc).'
        return false
    }
    return true
}

const insertRows = (rows) => {
    const tableBodyElement = document.getElementById('tbody')
    tableBodyElement.textContent = ''
    const n = rows.length
    for (let i = 0; i < n; i++) {
        const rowElement = document.createElement('tr')
        const numberDataElement = document.createElement('td')
        numberDataElement.className = 'number'
        numberDataElement.textContent = i + 1
        rowElement.appendChild(numberDataElement)
        const codeDataElement = document.createElement('td')
        codeDataElement.className = 'code'
        codeDataElement.textContent = rows[i]
        rowElement.appendChild(codeDataElement)
        tableBodyElement.appendChild(rowElement)
    }
}

const inputsHandler = async (e) => {
    try {
        e.preventDefault()
        if (inputsValidator()) {
            inputsValidationElement.textContent = ''
            const numberOfCodes = parseInt(numberOfCodesInputElement.value)
            let short_title = 'cf'
            if (cfRadioButtonInputElement.checked) {}
            else if (apRadioButtonInputElement.checked) short_title = 'ap'
            const options = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            console.log(short_title)
            const response = await fetch(`/items?n=${numberOfCodes}&title=${short_title}`, options)
            const payload = await response.json()
            if (response.ok) insertRows(payload.data)
            else window.location.replace('/')
        }
    } 
    catch (error) {
        console.error(error)
    }
}

const logoutHandler = async () => {
    try {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = await fetch('/logout', options)
        console.log(response)
        const payload = await response.json()
        window.location.replace(payload.redirect)
    } 
    catch (error) {
        console.error(error)
    }
}

submitButtonElement.addEventListener('click',inputsHandler)

logoutButtonElement.addEventListener('click',logoutHandler)