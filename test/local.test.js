import { Builder, By, until } from 'selenium-webdriver';
//import firefox from 'selenium-webdriver/firefox';
import path from 'path';

var firefox = require('geckodriver');
const webdriver = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

const getElementById = async (driver, id, timeout = 6000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
    // const options = new firefox.Options();
    // options.headless();
    // driver = new Builder()
    //   .forBrowser('firefox')
    //   .setFirefoxOptions(options)
    //   .withCapabilities(webdriver.Capabilities.firefox())
    //   .build();
    var driver = new Builder().withCapabilities({
      browserName: 'chrome',
      javascriptEnabled: true,
      acceptSslCerts: true,
      'webdriver.firefox.bin': firefox.path
  }).usingServer('http://localhost:4444/wd/hub').build();

  driver.manage().window().maximize();


    // eslint-disable-next-line no-undef
    await driver.get('file://' + path.join(__dirname, 'test.html'));
    //await driver.get('https://www.google.com/' + 'test.html');
    
  });

  afterAll(async () => {
    await driver.quit();
  });

  test('test', async () => {
    const btn = await getElementById(driver, 'test-button');
    await btn.click();

    const output = await getElementById(driver, 'output');
    const outputVal = await output.getAttribute('value');

    expect(outputVal).toEqual('Something');
  });
});
