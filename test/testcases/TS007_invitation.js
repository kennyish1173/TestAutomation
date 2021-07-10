
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

describe('TS007 Test invite member button screen', function () {
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
  it('04 Click invite button', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
    .click(roomListWindow.inviteButton)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitLoad)

  it('05 \'Test Case 44\' Should show the Invite window', function (){
    return app.client.windowByIndex(settingsWindow.windowIndex_2)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
    .getText(settingsWindow.memberInvitationTitle).then(function (getPageTitle) {
      console.log("Page header: " + getPageTitle)
      expect(getPageTitle).to.equal(settingsWindow.memberInvitationTitleText)
    })
  })

  it('06 Click close button', function (){
    return app.client.windowByIndex(settingsWindow.windowIndex_2)
    .click(settingsWindow.closeButton)
    //.saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
  })

  delay(testData.waitScreen)
  
  ///Closing
  it('07 Click Close button', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(currentRoomWindow.closeButton)
  })

  it('08 Click Shutdown App button', function (){
    return app.client.windowByIndex(closeWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(closeWindow.shutdownAppButton)
  })
 })
 