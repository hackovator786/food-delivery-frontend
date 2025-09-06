function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\+\d{1,3}\s\d{4,}$/;
    return phoneRegex.test(phoneNumber);
}

function isValidName(name) {
    let nameRegex = /^[A-Za-z\s]{1,30}$/;
    return nameRegex.test(name);
}

function isValidAddress(address) {
    let addressRegex = /^[A-Za-z0-9\s,.'\-/]{1,100}$/;
    return addressRegex.test(address);
}

const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()-_=+{}\[\]\|\\:;"'<,>.?\/])[A-Za-z\d`~!@#$%^&*()-_=+{}\[\]\|\\:;"'<,>.?\/]{8,}$/;
    return passwordRegex.test(password);
};

const isValidUsername = (emailPhno) => {
    return isValidEmail(emailPhno);
}

module.exports = { isValidEmail, isValidPhoneNumber, isValidName, isValidAddress, isPasswordValid, isValidUsername };