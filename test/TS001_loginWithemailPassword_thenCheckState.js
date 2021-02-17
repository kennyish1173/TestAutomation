
const hooks = require('./utility/hooks')
const helper = require('./utility/helper')
const onBoardingPage = require('./ui-objects/onboardingPage')
const loginPage = require('./ui-objects/loginPage')
const currentRoomWindow = require('./ui-objects/currentRoomWindow')
const roomListWindow = require('./ui-objects/roomListWindow')
const testData = require('./test_data/testdata')

const assert = require('assert')
const { systemPreferences, app } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const onboarding = require('./ui-objects/onboardingPage')
//const path = require('path')
//const date = require('Date')

function delay(interval) 
{
   return it('delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe('Login to roundz with email and password then check state', function () {
  this.timeout(60000)
  let app

  before(async () => {
    app = await hooks.startApp()
  })

  after(async() => {
    await hooks.stopApp(app)
  })
  
  beforeEach(async () => {
    //runs before each test in this block
  })

  afterEach(async() => {
    // runs after each test in this block
  })

  //Test cases
  it('Launches onboarding page', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(5)
    })
  })

  it('Goes through the onboarding page', function(){
    return app.client.windowByIndex(onBoardingPage.windowIndex)
      .getText('body').should.eventually.contain(onBoardingPage.messageText)
      .click(onBoardingPage.nextButton)
  })

  delay(5000)

  it('Shows Login page', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(6)
    })
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

  delay(10000)

  // it('Test Case 008: Should launch Current Room window', function () {
  //   return app.client.getWindowCount().then(function (count) {
  //     count.should.equal(7)
  //   })
  // })

  // it('Test Case 009: Should show Room List menu button', function (){
  //   return app.client.windowByIndex(1)
  //     .isExisting(currentRoomWindow.roomListMenuIcon)
  //     .click(currentRoomWindow.roomListMenuIcon)
  // })
  
  // it('Test Case 010: Should show Settings menu button', function (){
  //   return app.client.windowByIndex(1)
  //     .isExisting(currentRoomWindow.settingsMenuIcon)
  //     .click((currentRoomWindow.settingsMenuIcon))
  // })  

  // it('Test Case 012: Should show Mic button OFF (superficial)', function (){
  //   return app.client.windowByIndex(1)
  //     .isExisting(currentRoomWindow.micStatusOffIcon)
  //     .click(currentRoomWindow.micStatusOffIcon)
  //   })

  // it('Test Case 013: Should show Screen Share button OFF (superficial)', function (){
  //   return app.client.windowByIndex(1)
  //     .isExisting(currentRoomWindow.screenshareSTatusOffIcon)
  //     .click(currentRoomWindow.screenshareSTatusOffIcon)
  // })

 })