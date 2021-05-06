module.exports = {
    windowIndex: 4,
    loginTitle: '#welcomeMessageText', // not used
    welcomeMessage: '#welcomMessageText',
    loginExistingAccount: '#mainpage > div > div > div > div > button.btn.btn--flat.primary--text',
    //emailTextField: '#loginEmailTextField',
    //emailTextField: '#mainpage > div.application--wrap > div > div > div.flex.xs12.sm8.md8.align-center > div.mb-5 > div.layout.mt-5.align-center > div.flex.md8 > div > div:nth-child(1) > div.input-group__input > input[type=text]',　//old
    emailTextField: '#mainpage > div > div > div > div > div.login_form > div:nth-child(1) > div.input-group__input > input[type=text]',
    passwordTextField: '#password',
    //loginButton: '#mainpage > div.application--wrap > div > div > div.flex.xs12.sm8.md8.align-center > div.mb-5 > button.btn.primary > div', //old
    loginButton: '#mainpage > div > div > div > div > div.login_form > button',
    //forgotPasswordLink: '#mainpage > div.application--wrap > div > div > div.flex.xs12.sm8.md8.align-center > div.mb-5 > div.mt-2 > a:nth-child(1)', //old
    forgotPasswordLink: '#mainpage > div > div > div > div > div.login_form > div:nth-child(5) > a',
    //confirmationExpiredLink: '#mainpage > div.application--wrap > div > div > div.flex.xs12.sm8.md8.align-center > div.mb-5 > div.mt-2 > a:nth-child(3)', //old
    confirmationExpiredLink: '#mainpage > div > div > div > div > div.login_form > div:nth-child(5)',
    //loginGoogleButton: '#mainpage > div.application--wrap > div > div > div.flex.xs12.sm8.md8.align-center > div.mb-5 > button.btn.white > div',
    loginGoogleButton: '#mainpage > div > div > div > div > button',
    //chatSupportLink: '#mainpage > div.application--wrap > div > div > div.flex.xs12.sm8.md8.align-center > div.mb-5 > div:nth-child(9) > a' //old,
    createNewAccount: '#mainpage > div > div > div > div > div:nth-child(6) > button > div'
}