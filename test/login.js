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
    console.log('111111111111111111 =>', await driver.getCurrentUrl())

    const timeout = 1e3;
    await getElementById(driver, "signInGoogle").click();
    await manageTimeouts(driver);
    //await driver.sleep(timeout * 5);
    console.log('222222222222222= >', await driver.getCurrentUrl());

    const id = await getElementByPath(driver, "//input[@id='identifierId']").sendKeys('mikro.testing.10@gmail.com')
    await getElementByPath(driver, "//div[@id='identifierNext']").click();
    console.log('333333333333333 =>' , await driver.getCurrentUrl());

    await manageTimeouts(driver);
    await driver.sleep(timeout * 5);
    await getElementByPath(driver, "//input[@name='password']").sendKeys("mikro####0000")
    await getElementById(driver, "passwordNext").click();
    //test%%%%007
    await driver.sleep(timeout * 2);
    const str = await driver.getCurrentUrl()
    console.log('444444444444444444=>', str);
    const newURL = await str.substring(0, str.indexOf("?"));
    console.log('newURL=>', newURL);

    if (newURL === 'https://accounts.google.com/signin/v2/challenge/selection' 
    || 'https://accounts.google.com/signin/v2/challenge/pwd'){
        console.log('if newURL=>', 'navigate');
        await driver.navigate().to("https://sandbox.gesrec.com/");
    }
    
   // await getElementByPath(driver, '//*[@id="view_container"]/div/div/div[2]/div/div[1]/div/form/span/section/div/div/div/div/ul/li[3]').click();
    //await getElementById(driver, "profileIdentifier").click();

    console.log('555555555555 => ', await driver.getCurrentUrl());

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