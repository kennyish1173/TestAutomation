
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
var currentTimerValue
var avatarHtml

function delay(interval) 
{
   return it('delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe('Test room related control', function () {
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

  delay(5000)

  it('Get current room name', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex).getText(currentRoomWindow.currentRoomName).then(function (getRoomName) {
      currentRoom = getRoomName
      console.log("Current room: " + currentRoom)
    })
  })

  it('Should be in selected room', function (){
    expect(currentRoom).to.equal(testData.room_01)
  })

  it('Select a different room', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.roomName02)
  })

  delay(5000)

  it('Get current room name', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex).getText(currentRoomWindow.currentRoomName).then(function (getRoomName) {
      currentRoom = getRoomName
      console.log("Current room: " + currentRoom)
    })
  })

  it('Test Case 30: Should be able to switch room', function (){
    expect(currentRoom).to.equal(testData.room_02)
  })
  
  it('Toggle show lobby', function(){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
    .click(roomListWindow.toggleOfflineMember)
  })

  it('Should show text \'Lobby\'', function(){
    return app.client.windowByIndex(roomListWindow.windowIndex).getText(roomListWindow.lobbyText).then(function (getLobbyText) {
      console.log("Lobby text: " + getLobbyText)
      expect(getLobbyText).to.match(/ロビー/)
    })
  })

  it('Test Case 35: Should show offline member', function(){
    return app.client.windowByIndex(roomListWindow.windowIndex).getText(roomListWindow.offlinemember01).then(function (getOfflineMember) {
      console.log("Offline member: " + getOfflineMember)
      expect(getOfflineMember).to.equal(testData.offlineMember_01)
    })
  })

  it('Test Case 36: Should toggle off Lobby display', function(){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
    .click(roomListWindow.toggleOfflineMember)
  })


  //Closing
  // it('Click Close button', function (){
  //   return app.client.windowByIndex(currentRoomWindow.windowIndex)
  //     .click(currentRoomWindow.closeButton)
  // })

  // it('Click Shutdown App button', function (){
  //   return app.client.windowByIndex(closeWindow.windowIndex)
  //     .click(closeWindow.shutdownAppButton)
  // })
 })
 