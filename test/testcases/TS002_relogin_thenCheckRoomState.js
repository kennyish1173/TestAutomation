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

const assert = require('assert')
const expect = require('chai').expect
const { systemPreferences, app } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')

//const path = require('path')
//const date = require('Date')

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

describe('Re-login, and check that you are in last logged-in room', function () {
  this.timeout(60000)
  let app

  before(async () => {
    app = await hooks.startApp()
  })

  after(async() => {
    //await hooks.stopApp(app)
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

  it('Test Case 002: should login with email and password', function (){
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

  //Preparation for Test Case 011
  it('Select a room', function (){
    return app.client.windowByIndex(roomListWindow.windowIndex)    
    .click(roomListWindow.roomName01)
  })
 
  delay(5000)

  //Preparation for Test Case 011
  it('Get room name', function (){
    var tmp = app.client.windowByIndex(currentRoomWindow.windowIndex).getText(currentRoomWindow.currentRoomName)
    selectedRoom = tmp.innerHtml
    console.log(selectedRoom)
  })

  //Preparation for Test Case 011
  it('Open Settings Window', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .click(currentRoomWindow.settingsMenuIcon)
  })

  //Preparation for Test Case 011
  it('Open Account Settings window', function (){
    return app.client.windowByIndex(settingsWindow.windowIndex)
      .click(settingsWindow.accountSettingsIcon)
  })

  //Preparation for Test Case 011
  it('Test Case 83: Should Logout', function (){
    return app.client.windowByIndex(accountSettingsWindow.windowIndex)
      .click(accountSettingsWindow.logoutButton)
  })

  delay(testData.waitLongLoad)

  //Preparation for Test Case 011
  it('Select Login with Existig Account', function (){
    return app.client.windowByIndex(loginPage.windowIndex)
      .click(loginPage.loginExistingAccount)
  })

  //Preparation for Test Case 011
  it('Test Case 84: Should Show login Page (then login)', function (){
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

  //Preparation for Test Case 011
  it('Get cuurent room name', function (){
    tmp = app.client.windowByIndex(currentRoomWindow.windowIndex).getText(currentRoomWindow.currentRoomName)
    currentRoom = tmp.innerHtml
  })

  it('Test Case 011: Should be in last entered room', function (){
    expect(currentRoom).to.equal(selectedRoom)
  })
  
  //Preparation for Test Case 012
  it('Get mic status', function (){
    tmp = app.client.windowByIndex(currentRoomWindow.windowIndex).getText(currentRoomWindow.micStatusOffIcon)
    micStatus = tmp.innerHtml
    console.log(micStatus) //mic status
  })

  it('Test Case 012: Should show Mic button OFF', function (){
    //expect(micStatusOff).to.contain('off')
    return app.client.windowByIndex(currentRoomWindow.windowIndex).$("off").should.eventually.exist
  })

  it('Click Close button', function (){
    return app.client.windowByIndex(currentRoomWindow.windowIndex)
      .click(currentRoomWindow.closeButton)
  })

  it('Click Shutdown App button', function (){
    return app.client.windowByIndex(closeWindow.windowIndex)
      .click(closeWindow.shutdownAppButton)
  })


 })