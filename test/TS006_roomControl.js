
const hooks = require('./utility/hooks')
const helper = require('./utility/helper')

//UI Objects
const onBoardingPage = require('./ui-objects/onboardingPage')
const loginPage = require('./ui-objects/loginPage')
const currentRoomWindow = require('./ui-objects/currentRoomWindow')
const roomListWindow = require('./ui-objects/roomListWindow')
const settingsWindow = require('./ui-objects/settingsWindow')
const accountSettingsWindow = require('./ui-objects/accountSettingsWindow')
const manageRoomWindow= require('./ui-objects/manageRoomPopup')
const closeWindow = require('./ui-objects/closeWindow')
const myStatusWindow = require('./ui-objects/myStatusWindow')

//Test data
const testData = require('./test_data/testdata')

//Etc.
const assert = require('assert')
const expect = require('chai').expect
const { systemPreferences, app } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const passwordResetPage = require('./ui-objects/passwordResetPage')
const { passwordResetEmailTextField, passwordResetStatusParagraph } = require('./ui-objects/passwordResetPage')
const manageRoomPopup = require('./ui-objects/manageRoomPopup')
const fs = require('fs')

//Variables
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

describe('TS006 Test room related control', function () {
  //setup screenshot output folder
  const screenshotFolder = "mochawesome-reports\\screenshots\\"+this.title+"\\"
  if(fs.existsSync(screenshotFolder)) {
    helper.clearFiles(screenshotFolder)
  }
  else 
  fs.mkdirSync(screenshotFolder)

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
  it('00 Launches onboarding page', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(5)
    })
  })

  it('01 Click Next button in onboarding page', function(){
    return app.client.windowByIndex(onBoardingPage.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      //.getText('body').should.eventually.contain(onBoardingPage.messageText)
      .click(onBoardingPage.nextButton)
  })

  delay(testData.waitLongLoad)

  it('02 Select Login with Existig Account', function (){
    return app.client.windowByIndex(loginPage.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(loginPage.loginExistingAccount)
      .saveScreenshot(screenshotFolder+this.test.title+'_02'+'.png')
  })

  it('03 should login with email and password', function (){
    return app.client.windowByIndex(loginPage.windowIndex)
      .waitForEnabled(loginPage.emailTextField)
      .clearElement(loginPage.emailTextField)
      .setValue(loginPage.emailTextField,testData.emailAddress_02)
      .waitForEnabled(loginPage.passwordTextField)
      .clearElement(loginPage.passwordTextField)
      .setValue(loginPage.passwordTextField,testData.password_02)
      .click(loginPage.loginButton)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitLogin)

  //Main Scenario
  it('04 Select a room', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.roomName01)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitLoad)

  it('Get current room name', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      //.saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .getText(currentRoomWindow.currentRoomName).then(function (getRoomName) {
      currentRoom = getRoomName
      console.log("Current room: " + currentRoom)
    })
  })

  it('Should be in selected room', function (){
    expect(currentRoom).to.equal(testData.room_01)
  })

  it('05 Select a different room', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.roomName02)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitLoad)

  it('Get current room name', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex).getText(currentRoomWindow.currentRoomName).then(function (getRoomName) {
      currentRoom = getRoomName
      console.log("Current room: " + currentRoom)
    })
  })

  it('\'Test Case 30\' Should be able to switch room', function (){
    expect(currentRoom).to.equal(testData.room_02)
  })
  
  it('06 Toggle show lobby', function(){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
    .click(roomListWindow.toggleOfflineMember)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitLoad)

  it('Should show text \'Lobby\'', function(){
    return app.client.windowByIndex(roomListWindow.windowIndex).getText(roomListWindow.lobbyText).then(function (getLobbyText) {
      console.log("Lobby text: " + getLobbyText)
      expect(getLobbyText).to.match(/ロビー/)
    })
  })

  it('\'Test Case 35\' Should show offline member', function(){
    return app.client.windowByIndex(roomListWindow.windowIndex).getText(roomListWindow.offlinemember01).then(function (getOfflineMember) {
      console.log("Offline member: " + getOfflineMember)
      expect(getOfflineMember).to.equal(testData.offlineMember_01)
    })
  })

  it('07 \'Test Case 36\' Should toggle off Lobby display', function(){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
    .click(roomListWindow.toggleOfflineMember)
  })

  // Test Case 37 ----------------------------------
  it('08 Click Manage Room button', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
      .click(roomListWindow.manageRoomButton)
  })

  it('Test Case 37: Should show Manage Room popup', function(){
      return app.client.getWindowCount().then(function (count) {
        count.should.equal(7)
      })
    })

  //  Test Case 38 ----------------------------------
  it('Input room name to add', function (){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .waitForEnabled(manageRoomWindow.roomNameTextField)
      .clearElement(manageRoomWindow.roomNameTextField)
      .setValue(manageRoomWindow.roomNameTextField,testData.newRoom)
  })

  it('Click Add New Room button', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .click(manageRoomWindow.createNewRoomButton)
  })

  delay(testData.waitScreen)

  it('Test Case 38: Should show newly added room', function(){
      return app.client.windowByIndex(manageRoomWindow.windowIndex).getText(manageRoomWindow.thirdRoomName).then(function (getThirdRoomName) {
        console.log("New room: " + getThirdRoomName)
        expect(getThirdRoomName).to.equal(testData.newRoom)
      })
  })
  
  // Test Case 40 -------------------------------------------------------
  it('Input existing room name', function (){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .waitForEnabled(manageRoomWindow.roomNameTextField)
      .clearElement(manageRoomWindow.roomNameTextField)
      .setValue(manageRoomWindow.roomNameTextField,testData.newRoom)
  })

  it('Click Add New Room button', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .click(manageRoomWindow.createNewRoomButton)
  })

  delay(testData.waitScreen)

  it('Test Case 40: Should allow same room name', function(){
      return app.client.windowByIndex(manageRoomWindow.windowIndex).getText(manageRoomWindow.thirdRoomName).then(function (getThirdRoomName) {
        console.log("New room: " + getThirdRoomName)
        expect(getThirdRoomName).to.equal(testData.newRoom)
      })
  })

  // Test Case 41 ----------------------------------------------------
  it('Click Edit Room button', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .click(manageRoomWindow.thirdRoomEditButton)
  })

  delay(testData.waitScreen)

  it('Rename room', function (){
    return app.client.windowByIndex(manageRoomWindow.windowIndex) //to do variablize
      .waitForEnabled(manageRoomWindow.editRoomNameTextField)
      //.clearElement(manageRoomWindow.editRoomNameTextField)
      .setValue(manageRoomWindow.editRoomNameTextField,testData.renameRoom)
  })


  it('Click save button', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex) //variablize
      .click(manageRoomWindow.saveEditRoomButton)
  })

  delay(testData.waitScreen)
  
  it('Test Case 41: Should be able to modify room name', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex).getText(manageRoomWindow.thirdRoomName).then(function (getThirdRoomName) {
      console.log("New room: " + getThirdRoomName)
      expect(getThirdRoomName).to.equal(testData.newRoom + testData.renameRoom)
    })
  })


  //Delete Created room
  it('Click Delete Room button', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .click(manageRoomWindow.thirdRoomDeleteButton)
  })  

  delay(testData.waitScreen)

  it('Test Case 42: Click delete confirmation button to delete room', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex) //to do variablize
      .click(manageRoomWindow.confirmDeleteButton)
  })

  delay(testData.waitScreen)


  // Test Case 42 -------------------------------------------------------
  it('Click Delete Room button', function(){
      return app.client.windowByIndex(manageRoomWindow.windowIndex)
        .click(manageRoomWindow.thirdRoomDeleteButton)
  })  

  delay(testData.waitScreen)
  
  it('Test Case 42: Click delete confirmation button to delete room', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex) //variablize
      .click(manageRoomWindow.confirmDeleteButton)
  })

  delay(testData.waitScreen)

  // Test Case 39-1 (null error) -------------------------------------------------
  it('Input null as room name', function (){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .waitForEnabled(manageRoomWindow.roomNameTextField)
      .clearElement(manageRoomWindow.roomNameTextField)
      .setValue(manageRoomWindow.roomNameTextField,"")
  })

  it('Click Add New Room button', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .click(manageRoomWindow.createNewRoomButton)
  })

  delay(testData.waitScreen)

  it('Should show null error message', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex).getText(manageRoomWindow.errorMessage).then(function (getErrorMessage) {
      console.log("error message: " + getErrorMessage)
      expect(getErrorMessage).to.equal(manageRoomWindow.errorMessage_null)
    })
  })

  // Test Case 39-2 (whitespace error) -------------------------------------------------
  it('Input empty space as room name', function (){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .waitForEnabled(manageRoomWindow.roomNameTextField)
      .clearElement(manageRoomWindow.roomNameTextField)
      .setValue(manageRoomWindow.roomNameTextField," ")
  })

  it('Click Add New Room button', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .click(manageRoomWindow.createNewRoomButton)
  })

  delay(testData.waitScreen)

  it('Test Case 39-2: Should error whitespace error message', function(){
    return app.client.windowByIndex(manageRoomWindow.windowIndex).getText(manageRoomWindow.errorMessage).then(function (getErrorMessage) {
      console.log("error message: " + getErrorMessage)
      expect(getErrorMessage).to.equal(manageRoomWindow.errorMessage_whitespace)
    })
  })


  // Test Case 43 -----------------------------------------------------------
  it('Test Case 43: Close Manage Room window', function (){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .click(manageRoomWindow.closeButton)
  })

  delay(testData.waitScreen)
  
//Closing
  it('Click Close button', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .click(currentRoomWindow.closeButton)
  })

  it('Click Shutdown App button', function (){
    return app.client.windowByIndex(closeWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(closeWindow.shutdownAppButton)
  })
 })
 