import { Builder, By, until } from 'selenium-webdriver';
import firefox from 'selenium-webdriver/firefox';
import chrome from 'selenium-webdriver/chrome';
import path from 'path';
import { querySelector } from "./helpers";

//var firefox = require('geckodriver');
const webdriver = require('selenium-webdriver');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 * 60 * 5

const getElementById = async (driver, id, timeout = 10000) => {
  const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
  return await driver.wait(until.elementIsVisible(el), timeout);
};

describe('webdriver', () => {
  let driver;

  beforeAll(async () => {
    const options = await new chrome.Options();
    options.headless();
 
    driver = await new Builder()
    .forBrowser('chrome')
    .usingServer('http://127.0.0.1:4444/wd/hub')
    //.setFirefoxOptions(options)
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
    await driver.get('https://www.mozilla.org/en-US/');
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

  it('should click on navbar button to display a drawer', async () => {
    const anchor = await querySelector('[href=\'/en-US/firefox/\']', driver)
    const actual = await anchor.getText()
    const expected = 'Firefox'
    expect(actual).toEqual(expected)
  })
  
});
