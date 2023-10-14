exports.loginValidator = (username, password) => {
    const result = []
    if (username.replaceAll(' ', '') === '') result.push('Vous devez fournir votre nom d\'utilisateur.')
    if (password.replaceAll(' ', '') === '') result.push('Vous devez fournir votre mot de passe.')
    return result
}