import webdriver from 'selenium-webdriver';
// it will download and use BrowserStackLocal binary file behind the scene
// you may check ~/.browserstack dir
import browserstack from 'browserstack-local';
import { doSignInGoogle } from "./login";
import firefox from 'selenium-webdriver/firefox';
import chrome from 'selenium-webdriver/chrome';


jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

const local = new browserstack.Local();
const until = webdriver.until;
const By = webdriver.By;

// see: https://www.browserstack.com/automate/capabilities
const capabilities = {
  build: require('../package.json').version,
  project: 'jest-selenium-browserstack-example',
  browserName: 'chrome',
  os: 'Windows',
  'browserstack.local': true,
  'browserstack.debug': true,
  'browserstack.user': 'amstrikerdev1',
  'browserstack.key': 'RiV7yFpwqWrKpL2cviw4',
};

// see: https://www.browserstack.com/local-testing#modifiers
const BrowserStackLocalArgs = {
  key: capabilities['browserstack.key'],
  // verbose: true,
  onlyAutomate: true,
  // eslint-disable-next-line
  folder: __dirname,
};

const start = async () =>
  new Promise((resolve, reject) => {
    local.start(BrowserStackLocalArgs, error => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });

const stop = async () =>
  new Promise((resolve, reject) => {
    local.stop(function(error) {
      if (error) {
        reject(error);
      }

      resolve();
    });
  });

const getElementById = async (driver, id, timeout = 10000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};



// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60e3;
describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
    try {
      // BrowserStackLocal has to be ready before webdriver initialization
      await start();
      let addr = '116.206.138.146'
      let option = new chrome.Options().addArguments(`--proxy-server=http://${addr}`)
        

      driver = new webdriver.Builder()
        .usingServer('http://hub-cloud.browserstack.com/wd/hub')
        .withCapabilities(capabilities)
        .setChromeOptions(option)
        .build();

        // driver.executeScript("window.navigator.geolocation.getCurrentPosition=function(success){"+
        // "var position = {\"coords\" : {\"latitude\": \"16.7827\",\"longitude\": \"96.1771\"}};"+
        // "success(position);}");

        // const options = await new chrome.Options();
        // console.log('options.setProxy()', options.setProxy());
        // console.log('options.getProxy()', options.getProxy());
       
        //console.log('******* geo *******:',  await driver.get('https://ipapi.co/json/'));

        

        await driver.get('https://sandbox.gesrec.com/');
       
       // await getGeolocation();
        //await driver.executeScript("window.navigator.geolocation.getCurrentPosition = function(success) { success({coords: {latitude: 16.7827, longitude: 96.1771}}); }");

        //console.error('ipapi json', await driver.get('https://ipapi.co/json/'));
    } catch (error) {
      console.error('connetion error', error);
    }
    // IMPORTANT! Selenium and Browserstack needs more time than regular Jest
  });

  afterAll(async () => {
    try {
      await driver.quit(); // ~ 11 s !
      await stop(); // ~ 3 s
    } catch (error) {
      console.error('disconnection error', error);
    }
    // IMPORTANT! Selenium and Browserstack needs a lot of time!
  });


  it('index >> should show the right title', async () => {
    expect( await driver.getTitle()).toBe('GESREC');   
});

  it('should click on navbar button to display a drawer', async () => {

    await doSignInGoogle(driver);
    console.log('automate =>', await driver.getCurrentUrl());
    expect("https://sandbox.gesrec.com/").toEqual(await driver.getCurrentUrl())
  })


  // test(
  //   'test',
  //   async () => {
  //     // may help with debugging
  //     // const src = await driver.getPageSource();
  //     // console.log(src);
  //     try {
  //     const btn = await getElementById(driver, 'test-button');
  //     await btn.click();

  //     const output = await getElementById(driver, 'output');
  //     const outputVal = await output.getAttribute('value');

  //     console.log('outputVal', outputVal);
      
  //     expect(outputVal).toEqual('Something');
  //   } catch (error) {
  //     console.error('disconnection error', error);
  //   }
  //   },
  //   // IMPORTANT! 5s timeout should be sufficient complete test
  //   10000
  // );
});
