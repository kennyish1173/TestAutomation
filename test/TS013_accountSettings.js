
const hooks = require('./utility/hooks')
const helper = require('./utility/helper')
const onBoardingPage = require('./ui-objects/onboardingPage')
const loginPage = require('./ui-objects/loginPage')
const currentRoomWindow = require('./ui-objects/currentRoomWindow')
const roomListWindow = require('./ui-objects/roomListWindow')
const testData = require('./test_data/testdata')
//const onboarding = require('./ui-objects/onboardingPage')
const settingsWindow = require('./ui-objects/settingsWindow')
const accountSettingsWindow = require('./ui-objects/accountSettingsWindow')
const manageRoomWindow= require('./ui-objects/manageRoomPopup')
const closeWindow = require('./ui-objects/closeWindow')
const myStatusWindow = require('./ui-objects/myStatusWindow')
const appSettingsWindow = require('./ui-objects/appSettingsWindow')

const assert = require('assert')
const expect = require('chai').expect
const { systemPreferences, app } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const passwordResetPage = require('./ui-objects/passwordResetPage')
const { passwordResetEmailTextField, passwordResetStatusParagraph } = require('./ui-objects/passwordResetPage')
const manageRoomPopup = require('./ui-objects/manageRoomPopup')
const testdata = require('./test_data/testdata')

//const path = require('path')
//const date = require('Date')

var selectedRoom
var currentRoom
var roomA
var roomB
var micStatus
var screenShareStatus
var currentStatus
var currentTimerValue
var avatarHtml

function delay(interval) 
{
   return it('delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe('Test Account Settings', function () {
  this.timeout(60000)
  let app

  before(async () => {
    app = await hooks.startApp()
  })

  after(async() => {
    //await hooks.stopApp(app)
    //await app.stop();
  })
  
  beforeEach(async () => {
    //runs before each test in this block
  })

  afterEach(async() => {
    // runs after each test in this block
  })

  //Test cases from here
  it('Launches onboarding page', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(5)
    })
  })

  it('Click Next button in onboarding page', function(){
    return app.client.windowByIndex(onBoardingPage.windowIndex)
      //.getText('body').should.eventually.contain(onBoardingPage.messageText)
      .click(onBoardingPage.nextButton)
  })

  delay(testData.waitLongLoad)

  it('Shows Login page', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(6)
    })
  })

  it('Select Login with Existig Account', function (){
    return app.client.windowByIndex(loginPage.windowIndex)
      .click(loginPage.loginExistingAccount)
  })

  it('should login with email and password', function (){
    return app.client.windowByIndex(loginPage.windowIndex)
      .waitForEnabled(loginPage.emailTextField)
      .clearElement(loginPage.emailTextField)
      .setValue(loginPage.emailTextField,testData.emailAddress_02)
      .waitForEnabled(loginPage.passwordTextField)
      .clearElement(loginPage.passwordTextField)
      .setValue(loginPage.passwordTextField,testData.password_02)
      .click(loginPage.loginButton)
  })

  delay(testData.waitLogin)

  //Main Scenario
  it('Open Settings Window', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .click(currentRoomWindow.settingsMenuIcon)
  })

  it('Open Account Settings window', function (){
    return app.client.windowByIndex(settingsWindow.windowIndex)
      .click(settingsWindow.accountSettingsIcon)
  })

  delay(testData.waitScreen)
  
  // profile picture
  
  // Profile name
  // it('Click name text field', function (){
  //   return app.client.windowByIndex(settingsWindow.windowIndex)
  //     .click(accountSettingsWindow.nameTextField)
  // })

  // delay(testData.waitScreen)

  // it('Change account name', function (){
  //   return app.client.windowByIndex(accountSettingsWindow.windowIndex)
  //     .waitForEnabled(accountSettingsWindow.nameTextField)
  //     .clearElement(accountSettingsWindow.nameTextField)
  //     .setValue(accountSettingsWindow.nameTextField,testData.changeName)
  //     .click(accountSettingsWindow.saveNameButton)
  // })

  // delay(testData.waitScreen)

  // it('Test Case 74: Displays new account name', function (){
  //   return app.client.windowByIndex(accountSettingsWindow.windowIndex).getText(accountSettingsWindow.nameTextField).then(function (getNewName){
  //     console.log("email address: " + getNewName)
  //     expect(getNewName).to.equal(testData.changeName)
  //   })
  // })

  // it('Click name text field', function (){
  //   return app.client.windowByIndex(settingsWindow.windowIndex)
  //     .click(accountSettingsWindow.nameTextField)
  // })

  // delay(testData.waitScreen)

  // it('Change account name to null', function (){
  //   return app.client.windowByIndex(accountSettingsWindow.windowIndex)
  //     .waitForEnabled(accountSettingsWindow.nameTextField)
  //     .clearElement(accountSettingsWindow.nameTextField)
  //     //.setValue(accountSettingsWindow.nameTextField,'')
  //     .click(accountSettingsWindow.saveNameButton)
  // })

  // it('Close Account Settings window', function (){
  //   return app.client.windowByIndex(settingsWindow.windowIndex)
  //     .click(settingsWindow.closeButton)
  // })

  // delay(testData.waitScreen)

  // it('click profile avatar', function (){
  //   return app.client.windowByIndex(roomListWindow.windowIndex)
  //   .click(currentRoomWindow.avatar)
  // })

  // delay(testData.waitScreen)

  // it('Test Case 75: Account name should not change to null', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.name).then(function (getName) {
  //     console.log("default Status: " + getName)
  //     expect(getName).to.equal(testData.changeName)
  //   })
  // })

  // it('Open Settings Window', function (){
  //   return app.client.windowByIndex(currentRoomWindow.windowIndex)
  //     .click(currentRoomWindow.settingsMenuIcon)
  // })

  // it('Open Account Settings window', function (){
  //   return app.client.windowByIndex(settingsWindow.windowIndex)
  //     .click(settingsWindow.accountSettingsIcon)
  // })

  // it('Click name text field', function (){
  //   return app.client.windowByIndex(settingsWindow.windowIndex)
  //     .click(accountSettingsWindow.nameTextField)
  // })

  // delay(testData.waitScreen)

  // it('Change account name to whitespace', function (){
  //   return app.client.windowByIndex(accountSettingsWindow.windowIndex)
  //     .waitForEnabled(accountSettingsWindow.nameTextField)
  //     .clearElement(accountSettingsWindow.nameTextField)
  //     .setValue(accountSettingsWindow.nameTextField,' ')
  //     .click(accountSettingsWindow.saveNameButton)
  // })

  // delay(testData.waitScreen)
  
  // it('Close Account Settings window', function (){
  //   return app.client.windowByIndex(settingsWindow.windowIndex)
  //     .click(settingsWindow.closeButton)
  // })

  // delay(testData.waitScreen)

  // it('click profile avatar', function (){
  //   return app.client.windowByIndex(roomListWindow.windowIndex)
  //   .click(currentRoomWindow.avatar)
  // })

  // delay(testData.waitScreen)

  // it('Test Case 76: Account name should change to whitespace', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.name).then(function (getName) {
  //     console.log("default Status: " + getName)
  //     expect(getName).to.equal(' ')
  //   })
  // })

  // //change name back to original
  // it('Open Settings Window', function (){
  //   return app.client.windowByIndex(currentRoomWindow.windowIndex)
  //     .click(currentRoomWindow.settingsMenuIcon)
  // })

  // it('Open Account Settings window', function (){
  //   return app.client.windowByIndex(settingsWindow.windowIndex)
  //     .click(settingsWindow.accountSettingsIcon)
  // })

  // it('Click name text field', function (){
  //   return app.client.windowByIndex(settingsWindow.windowIndex)
  //     .click(accountSettingsWindow.nameTextField)
  // })

  // delay(testData.waitScreen)

  // it('Change account name back to original name', function (){
  //   return app.client.windowByIndex(accountSettingsWindow.windowIndex)
  //     .waitForEnabled(accountSettingsWindow.nameTextField)
  //     .clearElement(accountSettingsWindow.nameTextField)
  //     .setValue(accountSettingsWindow.nameTextField,testData.profileName)
  //     .click(accountSettingsWindow.saveNameButton)
  // })

  // Email address
  it('Test Case 77: Displays email address', function (){
    return app.client.windowByIndex(accountSettingsWindow.windowIndex).getText(accountSettingsWindow.emailAddressString).then(function (getEmailAddress){
      console.log("email address: " + getEmailAddress)
      expect(getEmailAddress).to.equal(testData.emailAddress_02)
    })
  })

  // Password Reset
  it('Open Account Settings window', function (){
    return app.client.windowByIndex(accountSettingsWindow.windowIndex)
      .click(accountSettingsWindow.passwordResetButton)
  })

  delay(testData.waitLoad)

  it('Test Case 79: Displays password reset mail sent notification', function (){
    return app.client.windowByIndex(accountSettingsWindow.notificationIndex).getText(accountSettingsWindow.passwordResetNotificationMessage).then(function (getNotificationMessage){
      console.log("email address: " + getNotificationMessage)
      expect(getNotificationMessage).to.equal(testData.resetPasswordSentNotificationString)
    })
  })

    
  
  //Closing
  it('Click Close button', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .click(currentRoomWindow.closeButton)
  })

  it('Click Shutdown App button', function (){
    return app.client.windowByIndex(closeWindow.windowIndex)
      .click(closeWindow.shutdownAppButton)
  })
 })
 