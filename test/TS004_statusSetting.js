
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

  // //Preparation for Test Case 14
  // it('Get current avatar state', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex).getHTML(myStatusWindow.avatar).then(function (getAvatarHtml) {
  //     avatarHtml = getAvatarHtml
  //     console.log("default Status: " + avatarHtml)
  //   })
  // })

  // it('Test Case: 14 Confirm avatar picture', function(){
  //   expect(currentStatus).to.match(/img/)
  // })

  //Prepartion for Test Case 15
  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("default Status: " + currentStatus)
    })
  })

  it('Test Case: 15 Confirm current is active', function(){
    expect(currentStatus).to.match(/アクティブ/)
  })

  //------------------------------------------
  //Preparation for Test Case 20
  it('Click Set To Busy Button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.setToBusyButton)
  })

  delay(5000)

  //Preparation for Test Case 20
  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("Current status: " + currentStatus)
    })
  })

  it('Test Case: 20 Set status to busy', function(){
    expect(currentStatus).to.match(/取り込み中/)
  })
  

  //Test Case 20 post operation
  it('Clear Busy status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.clearBusyStatusButton)
  })

  delay(2000)

  //------------------------------------------
  // Test Case 21-1 (2hrs)
  //------------------------------------------
  
  //Preparation for Test Case 21-1
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  delay(2000)

  //Preparation for Test Case 21-1
  it('Set Status time to two hours', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeTwoHours)
  })

  //Preparation for Test Case 21-1
  it('Click Set To Busy button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.setToBusyButton)
  })

  delay(5000)

  //Preparation for Test Case 21-1
  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("Current status: " + currentStatus)
    })
  })

  //Preparation for Test Case 21-1
  it('Status set to busy', function(){
    expect(currentStatus).to.match(/取り込み中/)
  })

  //Preparation for Test Case 21-1
  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Current status: " + currentTimerValue)
    })
  })

  it('Test Case 21-1: Set to busy (2 hours)', function(){
    expect(currentTimerValue).to.match(/1時間 59分/)
  })

  //Test Case 21-1 post operation
  it('Clear Busy status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.clearBusyStatusButton)
  })

  delay(5000)

  //------------------------------------------
  // Test Case 21-2 (4 hours)
  //------------------------------------------
  //Preparation for Test Case 21-2
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  //Preparation for Test Case 21-2
  it('Set Status time to four hours', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeFourHours)
  })

  //Preparation for Test Case 21-2
  it('Click Set To Busy button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.setToBusyButton)
  })

  delay(5000)

  //Preparation for Test Case 21-2
  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("Current status: " + currentStatus)
    })
  })

  //Preparation for Test Case 21-2
  it('Status set to busy', function(){
    expect(currentStatus).to.match(/取り込み中/)
  })

  //Preparation for Test Case 21-2
  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Current status: " + currentTimerValue)
    })
  })

  it('Test Case 21-2: Set to busy (4 hour)', function(){
    expect(currentTimerValue).to.match(/3時間 59分/)
  })

  //Test Case 21-3 post operation
  it('Clear Busy status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.clearBusyStatusButton)
  })

  delay(5000)

  //------------------------------------------
  // Test Case 21-3 (Whole Day)
  //------------------------------------------
  //Preparation for Test Case 21-3
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  //Preparation for Test Case 21-3
  it('Set Status time to whole day', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeWholeDay)
  })

  //Preparation for Test Case 21-3
  it('Click Set To Busy button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.setToBusyButton)
  })

  delay(5000)

  //Preparation for Test Case 21-3
  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("Current status: " + currentStatus)
    })
  })

  //Preparation for Test Case 21-3
  it('Status set to busy', function(){
    expect(currentStatus).to.match(/取り込み中/)
  })

  //Preparation for Test Case 21-3
  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Current status: " + currentTimerValue)
    })
  })

  it('Test Case 21-2: Set to busy (4 hour)', function(){
    expect(currentTimerValue).to.match(/本日中/)
  })

  //Test Case 21-3 post operation
  it('Clear Busy status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.clearBusyStatusButton)
  })

  delay(5000)

  //------------------------------------------



  //Preparation for Test Case 22
  it('Click Status drop-down button', function (){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusDropDownButton)
  })

  delay(2000)

  //Preparation for Test Case 22
  it('Select any status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusLetsTalk)
  })

  delay(5000)

  //Preparation for Test Case 22
  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.statusDropDownText).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("Status Selected: " + currentStatus)
    })
  })

  it('Test Case: 22 Set status', function(){
    expect(currentStatus).to.match(/話しましょう/)
  })


  //Preparation for Test Case 23
  it('Click Status drop-down button', function (){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusDropDownButton)
  })

  delay(2000)

  //Preparation for Test Case 23
  it('Change status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusOutForMeal)
  })

  delay(5000)

  //Preparation for Test Case 23
  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.statusDropDownText).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("Status Selected: " + currentStatus)
    })
  })

  it('Test Case: 23 Change status', function(){
    expect(currentStatus).to.match(/食事中/)
  })

  delay(5000)

  //Preparation for Test Case 24
  it('Click Clear Status button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.clearStatus)
  })

  delay(5000)

  //Preparation for Test Case 24
  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.statusDropDownText).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("Status cleared: " + currentStatus)
    })
  })

  it('Test Case: 24 Clear status', function(){
    expect(currentStatus).to.match(/ステータスを選択/)
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
 