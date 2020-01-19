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
    console.log('*********** before do sign in google url ***********');
    console.log(await driver.getCurrentUrl())

    const timeout = 1e3;
    await getElementById(driver, "signInGoogle").click();
    await manageTimeouts(driver);
    //await driver.sleep(timeout * 5);
    console.log('1111111111111111');
    console.log(await driver.getCurrentUrl())

     const id = await getElementByPath(driver, "//input[@id='identifierId']").sendKeys('selenium.mikro@gmail.com')
    await getElementByPath(driver, "//div[@id='identifierNext']").click();
    console.log('dirver get now url 2');
    console.log(await driver.getCurrentUrl())
    await manageTimeouts(driver);
    await driver.sleep(timeout * 5);
    await getElementByPath(driver, "//input[@name='password']").sendKeys("testing.com@123")
    await getElementById(driver, "passwordNext").click();

    //await getElementByPath(driver, '//*[@id="view_container"]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div/div/ul/li[3]').click();
    // await getElementById(driver, "profileIdentifier").click();

    console.log('2222222222222222');
    console.log(await driver.getCurrentUrl())

    // const id = await getElementByPath(driver, "//input[@id='identifierId']").sendKeys('selenium.mikro@gmail.com')
    // console.log('id ====>' + id);
    // await getElementByPath(driver, "//div[@id='identifierNext']").click();
    // console.log('dirver get now url 2');
    // console.log(await driver.getCurrentUrl())
    // await manageTimeouts(driver);
    // await driver.sleep(timeout * 5);
    // await getElementByPath(driver, "//input[@name='password']").sendKeys("testing.com@123")
    // await getElementById(driver, "passwordNext").click();
    await manageTimeouts(driver);
    await driver.sleep(timeout * 17);
   
}