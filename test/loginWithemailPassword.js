const hooks = require('./utility/hooks')
const helper = require('./utility/helper')
const onBoardingPage = require('./ui-objects/onboardingPage')
const loginPage = require('./ui-objects/loginPage')
const mainWindow = require('./ui-objects/mainWindow')
//const roomListWindow = require('./ui-objects/roomListWindow')
const testData = require('./test_data/testdata')

const assert = require('assert')
const { systemPreferences, app } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')
const onboarding = require('./ui-objects/onboardingPage')
//const path = require('path')
//const date = require('Date')

var rectangle = {}

function delay(interval) 
{
   return it('should delay', done => 
   {
      setTimeout(() => done(), interval)

   }).timeout(interval + 100) // The extra 100ms should guarantee the test will not fail due to exceeded timeout
}

function takeScreenshot(filename, rectangle = {x: 0, y: 0, width: 1500, height: 1000}) {
  return function(done) {
    app.browserWindow.capturePage(rectangle).then(function(imageBuffer) {
      fs.writeFile(filename, imageBuffer, function(err) {
        if (err) return done(err);
        console.log("Took screenshot: ", filename);
        return;
      });
    });
  };
}

const saveScreenShot = function (e){
  const filename = `screenShot-${this.test.parent.title}-${this.test.title}-${new Date().toISOString()}.png`
  .replace(/\s/g, '_')
  .replace(/:/g, '')

  this.app.browserWindow.capturePage().then(imageBuffer => {
    fs.writeFile(filename, imageBuffer, error => {
      if (error) throw error;

      console.info(`Screenshot saved: ${process.cwd()}/${filename}`);
    });
  });

  throw e;
}

describe('Login to roundz with email and password', function () {
  this.timeout(60000)
  let app;

  before(async () => {
    app = await hooks.startApp();
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
    .then(takeScreenshot('./mochatest-screenshots/test.png', rectangle))
  })

  it('should go through the onboarding page', function(){
    return app.client.windowByIndex(onBoardingPage.windowIndex)
      .getText('body').should.eventually.contain(onBoardingPage.messageText)
      .click(onBoardingPage.nextButton)
  })

  delay(5000)

  it('launches main application window', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(6)
    })
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

  delay(10000)

  it('launches main application window', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(7)
    })
  })

  it('should show main application window', function (){
    return app.client.windowByIndex(1)
      .isExisting(mainWindow.roomListMenuIcon)
  })
 })