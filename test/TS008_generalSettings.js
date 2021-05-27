
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

describe('Test General Settings', function () {
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

  it('Test Case 49: Default shortcut settings should be \'Windows+Alt\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcutSetting).then(function (getDefaultShortcutSetting) {
      console.log("shortcut setting: " + getDefaultShortcutSetting)
      expect(getDefaultShortcutSetting).to.equal(testData.defaultShortcutSetting)
    })
  })

  it('Click shortcut setting dropdown button', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.shortcutSettingDropDown)
  })

  it('Test Case 52-1: shortcut option 1 \'right shift\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcut_rightShift).then(function (getShortcutSetting) {
      console.log("shortcut setting: " + getShortcutSetting)
      expect(getShortcutSetting).to.equal('右Shift')
    })
  })

  it('Test Case 52-2: shortcut option 2 \'right shift\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcut_leftShift).then(function (getShortcutSetting) {
      console.log("shortcut setting: " + getShortcutSetting)
      expect(getShortcutSetting).to.equal('左Shift')
    })
  })

  it('Test Case 52-3: shortcut option 3 \'right control\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcut_rightControl).then(function (getShortcutSetting) {
      console.log("shortcut setting: " + getShortcutSetting)
      expect(getShortcutSetting).to.equal('右Control')
    })
  })
  
  it('Test Case 52-4: shortcut option 4 \'left control\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcut_leftControl).then(function (getShortcutSetting) {
      console.log("shortcut setting: " + getShortcutSetting)
      expect(getShortcutSetting).to.equal('左Control')
    })
  }) 

  it('Test Case 52-5: shortcut option 5 \'shift+control\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcut_shiftControl).then(function (getShortcutSetting) {
      console.log("shortcut setting: " + getShortcutSetting)
      expect(getShortcutSetting).to.equal('Shift+Control')
    })
  })

  it('Test Case 52-6: shortcut option 6 \'windows+alt\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcut_windowsAlt).then(function (getShortcutSetting) {
      console.log("shortcut setting: " + getShortcutSetting)
      expect(getShortcutSetting).to.equal('Windows+Alt')
    })
  })

  it('Test Case 52-7: shortcut option 7 \'windows+shift\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcut_windowsShift).then(function (getShortcutSetting) {
      console.log("shortcut setting: " + getShortcutSetting)
      expect(getShortcutSetting).to.equal('Windows+Shift')
    })
  })

  it('select right control', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.shortcut_rightControl)
  })

  delay(testdata.waitScreen)

  it('Test Case 50: shortcut settings should be changed to \'right control\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.shortcutSetting).then(function (getCurrentShortcutSetting) {
      console.log("shortcut setting: " + getCurrentShortcutSetting)
      expect(getCurrentShortcutSetting).to.equal(testData.changeShortcutSettings)
    })
  })
  

  //-----------------言語設定------------------
  it('Test Case 54: Default language settings should be \'Japanese\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.languageSetting).then(function (getDefaultShortcutSetting) {
      console.log("shortcut setting: " + getDefaultShortcutSetting)
      expect(getDefaultShortcutSetting).to.equal('日本語')
    })
  })

  it('Click language setting drop down button', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.languageSettingDropDown)
  })

  delay(testData.waitScreen)

  it('Test Case 55: Should be able to change language setting', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.language_eng)
  })

  it('Test Case 57: Language should be in \'English\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.general).then(function (getText) {
      console.log("text: " + getText)
      expect(getText).to.equal('General')
    })
  })

  it('Click language setting drop down button', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.languageSettingDropDown)
  })

  delay(testData.waitScreen)

  it('Test Case 55: Should be able to change language setting', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex)
      .click(appSettingsWindow.language_jap)
  })

  it('Test Case 56: Language should be in \'Japanese\'', function (){
    return app.client.windowByIndex(appSettingsWindow.windowIndex).getText(appSettingsWindow.general).then(function (getText) {
      console.log("text: " + getText)
      expect(getText).to.equal('一般')
    })
  })


  //-----------------------------------
  
  
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
 