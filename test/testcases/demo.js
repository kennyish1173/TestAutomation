const hooks = require('./utility/hooks')
const helper = require('./utility/helper')
const onBoardingPage = require('./ui-objects/onboardingPage')
const loginPage = require('./ui-objects/loginPage')
const currentRoomWindow = require('./ui-objects/currentRoomWindow')
const roomListWindow = require('./ui-objects/roomListWindow')
const testData = require('./test_data/testdata')

const assert = require('assert')
const { systemPreferences } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
//const path = require('path')
//const date = require('Date')

function delay(interval) 
{
   return it('should delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

describe('Application Initial launch', function () {
  this.timeout(60000)
  let app;

  before(async () => {
    app = await hooks.startApp();
    helper.createScreenshotFolder()
  });

  after(async() => {
    await hooks.stopApp(app);
  });
  
  beforeEach(async () => {
    //runs before each test in this block
  });

  afterEach(async() => {
    // runs after each test in this block
  });

  //Test cases
  it('launches application window', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(5)
    })
  })

  it('should go through the onboarding page', function(){
    return app.client.windowByIndex(4)
      .getText('body').should.eventually.contain(onBoardingPage.messageText)
      .click(onBoardingPage.nextButton)
  })

  delay(5000)

  it('launches main application window', function () {
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

  it('should show room list', function (){
    return app.client.windowByIndex(3)
      .click(currentRoomWindow.roomListMenuIcon)
  })

  delay(10000)

  it('Test Case 008: Should launch Current Room window', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(7)
    })
  })

  it('Test Case 009: Should show Room List menu button', function (){
    return app.client.windowByIndex(1)
      .isExisting(currentRoomWindow.roomListMenuIcon)
      .click(currentRoomWindow.roomListMenuIcon)
  })

  it('should click toggle switch', function (){
    return app.client.windowByIndex(3)
      .click(roomListWindow.toggleOfflineMember)
  })
 })