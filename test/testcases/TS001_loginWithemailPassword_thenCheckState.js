
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

function delay(interval) 
{
   return it('delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe('TS001 Login with email and password', function () {
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

  it('03 \'Test Case 002\' should login with email and password', function (){
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

  it('04 \'Test Case 008\' Should launch Current Room window', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(7)
    })
  })
 
  it('05 \'Test Case 009\' Should show Manage Room button', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(roomListWindow.manageRoomButton)
  })

  // Post Test Case 009 operation
  it('06 Close Manage Room window', function (){
    return app.client.windowByIndex(manageRoomWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')  
      .click(manageRoomWindow.closeButton)
  }) 

  it('07 \'Test Case 010\' Should show Settings menu button', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .isExisting(currentRoomWindow.settingsMenuIcon)
      .click(currentRoomWindow.settingsMenuIcon)
      .click(currentRoomWindow.settingsMenuIcon)
  })  
  
  // //Preparation for Test Case 012
  // it('Get mic status', function (){
  //   tmp = app.client.windowByIndex(currentRoomWindow.windowIndex).getText(currentRoomWindow.micStatusOffIcon)
  //   micStatus = tmp.innerHtml
  //   console.log(micStatus) //mic status
  // })

  // it('Test Case 012: Should show Mic button OFF', function (){
  //   //expect(micStatusOff).to.contain('off')
  //   return app.client.windowByIndex(currentRoomWindow.windowIndex).$("off").should.eventually.exist
  // })
  
  // it('Test Case 013: Should show Screen Share button OFF', function (){
  //   return app.client.windowByIndex(currentRoomWindow.windowIndex)
  //     .isExisting(currentRoomWindow.screenshareSTatusOffIcon)
  //     .click(currentRoomWindow.screenshareSTatusOffIcon)
  // })

  it('08 Click Close button', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .click(currentRoomWindow.closeButton)     
  })

  it('09 Click Shutdown App button', function (){
    return app.client.windowByIndex(closeWindow.windowIndex)
      .saveScreenshot(screenshotFolder+this.test.title+'_01'+'.png')
      .click(closeWindow.shutdownAppButton)    
  })
 })