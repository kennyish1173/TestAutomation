const hooks = require('./utility/hooks')
const helper = require('./utility/helper')
const onBoardingPage = require('./ui-objects/onboardingPage')
//const loginPage = require('./ui-objects/loginPage')
const mainWindow = require('./ui-objects/mainWindow')
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

  delay(10000)

  it('launches main application window', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(7)
    })
  })

  it('should show room list', function (){
    return app.client.windowByIndex(3)
      .click(mainWindow.roomListMenuIcon)
  })

  delay(5000)

  it('launches room list window application window', function () {
    return app.client.getWindowCount().then(function (count) {
      count.should.equal(7)
    })
  })

  it('should click toggle switch', function (){
    return app.client.windowByIndex(1)
      .click(roomListWindow.toggleOfflineMember)
  })
 })