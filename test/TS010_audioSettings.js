
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

describe('Test Audio Settings', function () {
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

  it('Open App Settings window', function (){
    return app.client.windowByIndex(settingsWindow.windowIndex)
      .click(settingsWindow.appSettingsIcon)
  })

  delay(testData.waitScreen)

  it('Click audio settings', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.audio)
  })

  // speaker 
  it('Click speaker setting dropdown button', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.speakerSettingDropDown)
  })

  delay(testData.waitScreen)

  it('Test Case 62: Display available speakers', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.speakerItem_01).then(function (getSpeaker) {
      console.log("available speakers: " + getSpeaker)
      expect(getSpeaker).to.equal(testData.speaker)
    })
  })

  it('Select speaker', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.speakerItem_01)
  })

  delay(testData.waitScreen)

  it('Test Case 63: Able to set speaker', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.speakerSettingDropDown).then(function (getSpeaker) {
      console.log("current speaker: " + getSpeaker)
      expect(getSpeaker).to.equal(testData.speaker)
    })
  })
  
// mic 
it('Click mic setting dropdown button', function (){
  return app.client.windowByIndex(appSettingsWindow.windowIndex)
    .click(appSettingsWindow.micSettingDropDown)
})

delay(testData.waitScreen)

it('Test Case 64: Display available mic', function (){
  return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.micItem_01).then(function (getMic) {
    console.log("available mics: " + getMic)
    expect(getMic).to.equal(testData.mic)
  })
})

it('Select mic', function (){
  return app.client.windowByIndex(appSettingsWindow.windowIndex)
    .click(appSettingsWindow.micItem_01)
})

delay(testData.waitScreen)

it('Test Case 65: Able to set mic', function (){
  return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.micSettingDropDown).then(function (getMic) {
    console.log("current mic: " + getMic)
    expect(getMic).to.equal(testData.mic)
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
 