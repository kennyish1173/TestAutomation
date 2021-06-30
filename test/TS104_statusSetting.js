
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
  //------------------------------------------
  // Test Case 20 (Status)
  //------------------------------------------
  it('Select a room', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.roomName01)
  })

  delay(testData.waitLoad)

  it('click profile avatar', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(currentRoomWindow.avatar)
  })

  delay(testData.waitScreen)

  it('Get currently displayed status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      console.log("default Status: " + getStatusText)
      expect(getStatusText).to.match(/アクティブ/)
    })
  })
  //------------------------------------------
  
  it('Click Let\'s talk', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.currentStatus)
    .click(myStatusWindow.setToLetsTalk)
  })
  
  delay(testData.waitLoad)

  it('Test Case: 20-1 Set status to Let\'s talk', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      console.log("Current status: " + getStatusText)
      expect(getStatusText).to.match(/話そうよ/)
    })
  })

  delay(testData.waitLoad)

  //------------------------------------------
  
  it('Click Set To Active', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.currentStatus)
    .click(myStatusWindow.setToActive)
  })
  
  delay(testData.waitMidLoad)

  it('Test Case: 20-2 Set status to Active', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      console.log("Current status: " + getStatusText)
      expect(getStatusText).to.match(/アクティブ/)
    })
  })

  //------------------------------------------
  
  it('Click Set To Busy Button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.currentStatus)
    .click(myStatusWindow.setToBusy)
  })
  
  delay(testData.waitMidLoad)

  it('Test Case: 20-3 Set status to busy', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.currentStatus).then(function (getStatusText) {
      currentStatus = getStatusText
      console.log("Current status: " + currentStatus)
      expect(currentStatus).to.match(/取り込み中/)
    })
  })

  //------------------------------------------
  // Test Case 21-1 (15 mins)
  //------------------------------------------
  
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  delay(testData.waitScreen)
  
  it('Set Status time to 15 minutes', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.fifteenMinutes)
  })

  delay(testData.waitLoad)

  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Timer value: " + currentTimerValue)
    })
  })

  it('Test Case 21-1: Set timer (15 minutes)', function(){
    expect(currentTimerValue).to.match(/残り : 00:14/)
  })
    
  //------------------------------------------
  // Test Case 21-2 (30 mins)
  //------------------------------------------
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  delay(testData.waitScreen)
  
  it('Set Status time to 30 minutes', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.thirtyMinutes)
  })

  delay(testData.waitLoad)

  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Timer value: " + currentTimerValue)
    })
  })

  it('Test Case 21-2: Set timer (30 minutes)', function(){
    expect(currentTimerValue).to.match(/残り : 00:29/)
  })

  //------------------------------------------
  // Test Case 21-3 (1 hour)
  //------------------------------------------
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  delay(testData.waitScreen)
  
  it('Set Status time to 1 hour', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.oneHour)
  })

  delay(testData.waitLoad)

  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Timer value: " + currentTimerValue)
    })
  })

  it('Test Case 21-3: Set timer (1 hour)', function(){
    expect(currentTimerValue).to.match(/残り : 00:59/)
  })

  //------------------------------------------
  // Test Case 21-4 (2 hours)
  //------------------------------------------
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  delay(testData.waitScreen)
  
  it('Set Status time to 2 hours', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.twoHours)
  })

  delay(testData.waitLoad)

  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Timer value: " + currentTimerValue)
    })
  })

  it('Test Case 21-4: Set timer (2 hours)', function(){
    expect(currentTimerValue).to.match(/残り : 01:59/)
  })
  
  //------------------------------------------
  // Test Case 21-5 (4 hours)
  //------------------------------------------
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  delay(testData.waitScreen)
  
  it('Set Status time to 4 hours', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.fourHours)
  })

  delay(testData.waitLoad)

  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Timer value: " + currentTimerValue)
    })
  })

  it('Test Case 21-5: Set timer (4 hours)', function(){
    expect(currentTimerValue).to.match(/残り : 03:59/)
  })

  //------------------------------------------
  // Test Case 21-6 (whole day)
  //------------------------------------------
  it('Click Status Time drop-down button', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.statusTimeDropDownButton)
  })

  delay(testData.waitScreen)
  
  it('Set Status time to Whole Day', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.wholeDay)
  })

  delay(testData.waitLoad)

  it('Get current timer value', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex).getText(myStatusWindow.timerValue).then(function (getTimerValue) {
      currentTimerValue = getTimerValue
      console.log("Timer value: " + currentTimerValue)
    })
  })

  it('Test Case 21-6: Set timer (Whole Day)', function(){
    expect(currentTimerValue).to.match(/本日中/)
  })

  //------------------------------------------


  // //Preparation for Test Case 22
  // it('Click Status drop-down button', function (){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex)
  //   .click(myStatusWindow.statusDropDownButton)
  // })

  // delay(testData.waitScreen)

  // //Preparation for Test Case 22
  // it('Select any status', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex)
  //   .click(myStatusWindow.statusLetsTalk)
  // })

  // delay(testData.waitMidLoad) //wait for notificatin to disappear

  // it('click profile avatar', function (){
  //   return app.client.windowByIndex(roomListWindow.windowIndex)
  //   .click(currentRoomWindow.avatar)
  // })

  // delay(testData.waitLoad)

  // //Preparation for Test Case 22
  // it('Get currently displayed status', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex02).getText(myStatusWindow.statusDropDownText).then(function (getStatusText) {
  //     currentStatus = getStatusText
  //     console.log("Status Selected: " + currentStatus)
  //   })
  // })
 
  // it('Test Case: 22 Able to set status', function(){
  //   expect(currentStatus).to.match(/話しましょう/)
  // })
 

  // //Preparation for Test Case 23
  // it('Click Status drop-down button', function (){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex02)
  //   .click(myStatusWindow.statusDropDownButton)
  // })

  // delay(testData.waitScreen)

  // //Preparation for Test Case 23
  // it('Change status', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex02)
  //   .click(myStatusWindow.statusOutForMeal)
  // })

  // delay(testData.waitLoad) //wait for notificatin to disappear

  // it('click profile avatar', function (){
  //   return app.client.windowByIndex(roomListWindow.windowIndex)
  //   .click(currentRoomWindow.avatar)
  // })

  // delay(testData.waitLoad)

  // //Preparation for Test Case 23
  // it('Test Case 23: Should change status', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex02).getText(myStatusWindow.statusDropDownText).then(function (getStatusText) {
  //     console.log("Current Status: " + getStatusText)
  //     expect(getStatusText).to.match(/食事中/)
  //   })
  // })

  // //Preparation for Test Case 24
  // it('Click Clear Status button', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex02)
  //   .click(myStatusWindow.clearStatus)
  // })

  // delay(testData.waitLoad) //wait for notificatin to disappear

  // it('click profile avatar', function (){
  //   return app.client.windowByIndex(roomListWindow.windowIndex)
  //   .click(currentRoomWindow.avatar)
  // })

  // delay(testData.waitLoad)

  // //Preparation for Test Case 24
  // it('Get currently displayed status', function(){
  //   return app.client.windowByIndex(myStatusWindow.windowIndex02).getText(myStatusWindow.statusDropDownText).then(function (getStatusText) {
  //     console.log("Status cleared: " + getStatusText)
  //     expect(getStatusText).to.match(/ステータスを選択/)
  //   })
  // })
  //************************************************************************************************************************************ */
  
  it('Clear status', function(){
    return app.client.windowByIndex(myStatusWindow.windowIndex)
    .click(myStatusWindow.clearStatusButton)
  })

  delay(testData.waitScreen)
  
  // Spectron bug? can't focus on main window after popup notification
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
 