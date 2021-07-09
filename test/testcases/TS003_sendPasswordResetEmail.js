
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
const passwordResetPage = require('./ui-objects/passwordResetPage')
const { passwordResetEmailTextField, passwordResetStatusParagraph } = require('./ui-objects/passwordResetPage')
const fs = require('fs')

//Variables
var selectedRoom
var currentRoom
var roomA
var roomB
var micStatus
var screenShareStatus

function delay(interval) 
{
   return it('delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe('TS003 Send password reset email', function () {
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

  })

  it('03 Click Forgot Password Link', function (){
    return app.client.windowByIndex(loginPage.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(loginPage.forgotPasswordLink)
  })

  it('04 Enter email address and click Send', function(){
    return app.client.windowByIndex(passwordResetPage.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .waitForEnabled(passwordResetPage.passwordResetEmailTextField)
      .clearElement(passwordResetPage.passwordResetEmailTextField)
      .setValue(passwordResetPage.passwordResetEmailTextField, testData.emailAddress_01)
      .click(passwordResetPage.sendButton)
  })

  delay(testData.waitLogin)
  
  it('05 \'Test Case 03\' Password reset email successfully sent message appears', function(){
    return app.client.windowByIndex(passwordResetPage.windowIndex)
    .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
    .getText('body').should.eventually.contain(passwordResetPage.passwordResetStatusParagraphTextSuccess)
  })

 //Closing
  it('06 Click Close button', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .click(currentRoomWindow.closeButton)
  })

  it('07 Click Shutdown App button', function (){
    return app.client.windowByIndex(closeWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')  
      .click(closeWindow.shutdownAppButton)
  })
 })