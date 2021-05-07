
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

const assert = require('assert')
const expect = require('chai').expect
const { systemPreferences, app } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const passwordResetPage = require('./ui-objects/passwordResetPage')
const { passwordResetEmailTextField, passwordResetStatusParagraph } = require('./ui-objects/passwordResetPage')

//const path = require('path')
//const date = require('Date')

var selectedRoom
var currentRoom
var roomA
var roomB
var micStatus
var screenShareStatus
var currentStatus

function delay(interval) 
{
   return it('delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe('Test Status settings', function () {
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

  delay(5000)

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

  delay(7000)

  //Main Scenario
  it('Select a room', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.roomName01)
  })

  delay(2000)

  it('click profile avatar', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(currentRoomWindow.avatar)
  })

  delay(2000)

  it('Click Status drop-down button', function (){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusDropDownButton)
  })

  delay(2000)

  it('Select any status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusLetsTalk)
  })

  delay(5000)

  it('Get current;y displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.statusDropDownText).then(function (statusText) {
      currentStatus = statusText
      console.log("Status Selected" + currentStatus)
    })
  })

  it('Test Case: 22 Confirm current status changed', function(){
    expect(currentStatus).to.match(/話しましょう/)
  })

  it('Click Clear Status button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.clearStatus)
  })

  delay(5000)

  it('Get current;y displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.statusDropDownText).then(function (statusText) {
      currentStatus = statusText
      console.log("Status cleared" + currentStatus)
    })
  })

  it('Test Case: 23 Confirm current status changed', function(){
    expect(currentStatus).to.match(/ステータスを選択/)
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
 