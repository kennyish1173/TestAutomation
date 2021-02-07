const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const electron = require('electron')
const path = require('path')
//const webdriver = require("selenium-webdriver")

//const pathToRoundzExe = "C:\\Program Files (x86)\\roundz\\roundz.exe"
const pathToRoundzExe = path.join(__dirname, '..', '..', '..', 'source_code', 'newroundz_r2', 'build', 'win-ia32-unpacked', 'roundz.exe') //run from roundz.exe
//const pathToRoundzExe = path.join(__dirname, '..', 'dist', 'electron', 'main') //run from main.js

global.before(() => {
  chai.should();
  chai.use(chaiAsPromised);
});

module.exports = {
  async startApp() {
    const app = await new Application({
      path: pathToRoundzExe,
      args: ['electron-app'],
      env: {
        ELECTRON_ENABLE_LOGGING: true,
        ELECTRON_ENABLE_STACK_DUMPING: true,
        NODE_ENV: 'test'
        },
    waitTimeout: 60e3,
    requireName: 'electronRequire',
    chromeDriverLogPath: '../chromedriverlog.txt',
    chromeDriverArgs: ['remote-debugging-port=9222']
    }).start();
    chaiAsPromised.transferPromiseness = app.transferPromiseness;
    return app;
  },

  async stopApp(app) {
    if (app && app.isRunning()) {
      await app.stop();
    }
  }

};