export const isValidEmail = (email) => {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    console.log('email is ', email)
    return emailRegex.test(email);
}

export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export const difficultyOptions = ["easy","medium","hard"]
export const statusOptions = ["solved", "unsolved"]