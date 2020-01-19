import { Builder, By, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';
import { querySelector } from "./helpers";
import { doSignInGoogle } from "./login";
import { log } from 'util';


//var firefox = require('geckodriver');
const webdriver = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

// const getElementById = async (driver, id, timeout = 10000) => {
//   const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
//   return await driver.wait(until.elementIsVisible(el), timeout);
// };

const defaultTimeout = 10e3;

export const getElementById = (driver, id, timeout = defaultTimeout) => {
    const el = driver.wait(until.elementLocated(By.id(id)), timeout);
    return driver.wait(until.elementIsVisible(el), timeout);
};
  
export const getElementByName = (driver, name, timeout = defaultTimeout) => {
    const el = driver.wait(until.elementLocated(By.name(name)), timeout);
    return driver.wait(until.elementIsVisible(el), timeout);
};
  

export const getElementByPath = (driver, path, timeout = defaultTimeout) => {
    const el = driver.wait(until.elementLocated(By.xpath(path)), timeout);
    return driver.wait(until.elementIsVisible(el), timeout);
};

export const getElementByClassName = (driver, className, timeout = defaultTimeout) => {
    const el = driver.wait(until.elementLocated(By.className(className)), timeout);
    return driver.wait(until.elementIsVisible(el), timeout);
};


export const manageTimeouts = (driver, timeout = defaultTimeout) => {
    return driver.manage().setTimeouts( 
        { implicit: timeout, pageLoad: timeout, script: timeout });
};
  
const width = 640;
const height = 480;

describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
    const options = await new chrome.Options();
    options.headless();
 
    driver = await new Builder()
    .forBrowser('chrome')
    .usingServer('http://127.0.0.1:4444/wd/hub')
    // setChromeOptions(
    //   new chrome.Options().headless().windowSize({width, height}))
  .setFirefoxOptions(
      new firefox.Options().headless().windowSize({width, height}))
    .build();

  //   driver = new Builder().withCapabilities({
  //     browserName: 'firefor',
  //     javascriptEnabled: true,
  //     acceptSslCerts: true,
  //     'webdriver.firefox.bin': firefox.path
  // })
  // .usingServer('http://localhost:4444/wd/hub')
  // .build();

    // eslint-disable-next-line no-undef
    //await driver.get('file://' + path.join(__dirname, 'test.html'));
    //await driver.get('https://sandbox.gesrec.com/');
    await driver.get('https://accounts.google.com/signin/oauth/oauthchooseaccount?client_id=439100244725-028cp3a9tl420rlrjamacjgspberei5e.apps.googleusercontent.com&as=ZTLWgJEebXPy6CNQVwctNg&destination=https%3A%2F%2Fdance-68169.firebaseapp.com&approval_state=!ChRsZDk0WU1Jc3AzdFc0ejJKd0dBXxIfd19DM2NVTF91LVVmOEhuU1JuY2dubXFPWUY0ZV9CWQ%E2%88%99AJDr988AAAAAXiarEt8eVMY_XZQGJhDjxkLwJxpgiNUQ&oauthgdpr=1&xsrfsig=ChkAeAh8T2B-j4J_mfhxd1jbjCAgsglNsq9vEg5hcHByb3ZhbF9zdGF0ZRILZGVzdGluYXRpb24SBXNvYWN1Eg9vYXV0aHJpc2t5c2NvcGU&flowName=GeneralOAuthFlow');
    //await driver.sleep(5000);
  });

  afterAll(async () => {
    await driver.quit();
  });

  // test('test', async () => {
  //   const btn = await getElementById(driver, 'test-button');
  //   await btn.click();

  //   const output = await getElementById(driver, 'output');
  //   const outputVal = await output.getAttribute('value');

  //   expect(outputVal).toEqual('Something');
  // });

  //it('should click on navbar button to display a drawer', async () => {
    // const timeout = 1e3;
    // await getElementById(driver, "signInGoogle").click();
    // await manageTimeouts(driver);
    // await driver.sleep(timeout * 5);
    // console.log('before click login');
    // await getElementByPath(driver, "//input[@id='identifierId']").sendKeys('selenium.mikro@gmail.com')
    // await getElementByPath(driver, "//div[@id='identifierNext']").click();
    // console.log('after click login');
    // await manageTimeouts(driver);
    // await driver.sleep(timeout * 5);
    // await getElementByPath(driver, "//input[@name='password']").sendKeys("testing.com@123")
    // await getElementById(driver, "passwordNext").click();
    // await manageTimeouts(driver);
    // await driver.sleep(timeout * 17);

    //expect("https://sandbox.gesrec.com/").toEqual(await driver.getCurrentUrl())
  //})

  it('index >> should show the right title', async () => {
    expect( await driver.getTitle()).toBe('GESREC');   
});

  it('should click on navbar button to display a drawer', async () => {
 
   
    await doSignInGoogle(driver);
    console.log('dirver get now url 3');
    console.log(await driver.getCurrentUrl())
    expect("https://sandbox.gesrec.com/").toEqual(await driver.getCurrentUrl())
  })
  
  
});
