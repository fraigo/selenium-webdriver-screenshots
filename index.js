require('chromedriver')
const {Builder, By, Key, until, Capabilities} = require('selenium-webdriver');
var chromedriver = require('selenium-webdriver/chrome');
var fs = require('fs')

function getDriver(w,h,headless){
    const screen = {
        width: w||1024,
        height: h||900
    };
    var options = new chromedriver
        .Options()
        .addArguments(['--disable-notifications'])
        .windowSize(screen)
    if (headless) {
        options.addArguments(['--headless'])
    }
    
    var driver = new Builder().forBrowser('chrome')
        .setChromeOptions(options)
        .build();
    return driver;
}

function takeScreenshot(driver, config, name, folder, callback){
    driver.takeScreenshot().then(
        function(image, err) {
            console.log('screenshot', new Date(), name)
            fs.writeFile(folder + '/'+name+'.png', image, 'base64', function(err) {
                if (err) console.log('Screenshot error',err);
                if (callback) callback()
            });
        }
    );
}

function screenshotPages(driver, config, pos){
    if (!pos) pos = 0
    var cfg = config.pages[pos]
    if (!cfg){
        console.log('Finished')
        driver.quit()
        return
    }
    console.log('page',cfg)
    screenshotPage(driver, cfg, config.baseurl, config.folder, pos + 1, function(){
        screenshotPages(driver, config, pos+1)
    })
}

function screenshotPage(driver, config, baseUrl, folder, index, callback) {
    var element=null; 
    const url = baseUrl + config.url
    driver.get(url)
    if (!folder) folder = "."

    const actions = driver.actions({async: false})
    var condition = By.tagName(config.tag||'body')
    var conditionName = "tag "+(config.tag||'body')
    if (config.id){
        condition = By.id(config.id)
        conditionName = "id "+(config.id)
    }
    if (config.xpath){
        condition = By.xpath(config.xpath)
        conditionName = "xpath "+(config.id)
    }
    if (!condition) {
        takeScreenshot(driver, config, config.filename||index, folder, callback)
    }
    console.log('Waiting for', conditionName)
    driver.wait(until.elementLocated(condition), 5000).then(function(el){

        if (config.move) actions.move({origin: el}).press().perform();
        driver.wait(until.elementLocated(condition), 5000).then(function(el){
            takeScreenshot(driver, config, config.filename||index, folder, callback)
        })
    })

}

var config = {}
fs.readFile('example.json', 'utf8', function(err, data){
    config = JSON.parse(data)
    console.log(config)
    const driver = getDriver(config.width,config.height,config.headless);
    screenshotPages(driver, config, 0)
});


