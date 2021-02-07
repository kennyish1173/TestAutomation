const hooks = require('./utility/hooks')
const helper = require('./utility/helper')
const onBoardingPage = require('./ui-objects/onboarding')
const loginPage = require('./ui-objects/login')
const testData = require('./test_data/testdata')

const assert = require('assert')
const { systemPreferences } = require('electron')
const { focusOnWin } = require('./utility/helper')
const { should } = require('chai')
const { SSL_OP_EPHEMERAL_RSA } = require('constants')

describe('Application Initial launch', function () {
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
      count.should.equal(7)
    })
  })

  it('should click on current room', function(){
    //return app.client.windowByIndex(6)
      //.getText('body').should.eventually.contain(onBoardingPage.messageText)
      return app.client
      .click('#currentRoomName')
  })

  // it('should login with email and password', function(){
  //   return app.client.windowByIndex(6)
  //     .getText('body').should.eventually.contain(loginPage.loginTitle)
  //   // return  app.client.windowByIndex(6)
  //   //   .click(loginPage.googleAccountButton)
  //     .click(loginPage.passwordTextField)
  //     //.setValue(loginPage.userTextField, testData.emailAddress)
  //     //.click(loginPage.loginButton)
  // })


  // it('finds the initial window', function (){
  //   return focusOnWin(app, 'index.html', 5).then(() => {
  //     return app.client.getTitle().then(title => {
  //       title.should.contain('roundz')
  //     })
  //   })
  // })

//   it('clicks on \'next\' button', function () {
//     const btnNext = 'btn__content.class'
//     return app.client.click(btnNext)
//   })
 })