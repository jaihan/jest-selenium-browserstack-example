import { Builder, By, until } from 'selenium-webdriver';
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
  

export const doSignInGoogle = async(driver) => {
    const timeout = 1e3;
    await getElementById(driver, "signInGoogle").click();
    await manageTimeouts(driver);
    await driver.sleep(timeout * 5);
    console.log('dirver get now url 1');
    console.log(await driver.getCurrentUrl())
    await getElementByPath(driver, "//input[@id='identifierId']").sendKeys('selenium.mikro@gmail.com')
    await getElementByPath(driver, "//div[@id='identifierNext']").click();
    console.log('dirver get now url 2');
    console.log(await driver.getCurrentUrl())
    await manageTimeouts(driver);
    await driver.sleep(timeout * 5);
    await getElementByPath(driver, "//input[@name='password']").sendKeys("testing.com@123")
    await getElementById(driver, "passwordNext").click();
    await manageTimeouts(driver);
    await driver.sleep(timeout * 17);
   
}