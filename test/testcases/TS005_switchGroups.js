
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

//Test data
const testData = require('./test_data/testdata')

//Etc.
const assert = require('assert')
const expect = require('chai').expect
const { systemPreferences, app } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
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

describe('TS005 Switch between groups', function () {
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
    //stopApp not working! :(
    //await hooks.stopApp(app)
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
  it('04 Click group selector', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.groupSelector)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitScreen)

  it('05 \'Test Case 27\' Select different group', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.group02)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitLogin) //wait for app to relogin

  it('06 Click expand icon', function(){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
    .click(currentRoomWindow.expandIcon)
  })

  delay(testData.waitScreen)

  it('\'Test Case 28\' Should show current group', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex).getText(roomListWindow.groupSelector).then(function (groupName) {
      console.log("Current group: " + groupName)
      expect(groupName).to.equal(testData.group_02)
    })
  })

  delay(testData.waitMidLoad)

  it('\'Test Case 29\' Should show group\'s room', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex).getText(roomListWindow.roomName01_text).then(function (getRoomName) {
      console.log("room: " + getRoomName)
      expect(getRoomName).to.equal('')
    })
  })

  //Switch back to original group
  it('07 Click group selector', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.groupSelector)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitScreen)
  it('08 Switch back to original group', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.group01)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitLogin) //wait for app to relogin

  it('09 Click expand icon', function(){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
    .click(currentRoomWindow.expandIcon)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitScreen)

  it('Should show original group', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex).getText(roomListWindow.groupSelector).then(function (groupName) {
      console.log("Current Room: " + groupName)
      expect(groupName).to.equal(testData.group_01)
    })
})
  
//Closing
  it('10 Click Close button', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(currentRoomWindow.closeButton)
  })

  it('11 Click Shutdown App button', function (){
    return app.client.windowByIndex(closeWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(closeWindow.shutdownAppButton)
  })
})
 