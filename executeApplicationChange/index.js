import puppeteer from "puppeteer";
import fs from "fs";
var gameName;
var clientID;
var username;
var password;

fs.readFile("../application.txt", function (err, data) { 
    if (err) { 
      return console.error(err); 
    } 
    let tempArray = (data.toString().split(",,"));
    gameName = tempArray[0];
    clientID = tempArray[1];
});

fs.readFile("../credentials.txt", function (err, data) { 
    if (err) { 
      return console.error(err); 
    } 
    let tempArray = (data.toString().split(","));
    username = tempArray[0];
    password = tempArray[1];
});

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

const getQuotes = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto('https://discord.com/developers/applications/' + clientID + '/information', {
        waitUntil: "domcontentloaded",
    });

    //Enters username into usernameField
    await page.waitForSelector('#uid_7', {visible: true, timeout: 3000 });
    await page.type("#uid_7", username);

    //Enters password into passwordField
    await page.waitForSelector('#uid_9', {visible: true, timeout: 10000 });
    await page.type("#uid_9", password);
    
    //Clicks login button
    await page.waitForSelector(".button__47891", {visible: true, timeout: 10000 });
    await page.click(".button__47891");

    //Deletes and enters gameName into applicationField
    await page.waitForSelector(".inputDefault-3FGxgL", {visible: true, timeout: 10000 });
    await page.$eval('.inputDefault-3FGxgL', el => el.value = '');
    await page.type('.inputDefault-3FGxgL', gameName);

    await delay(500);

    page.waitForSelector('xpath=//*[@id="app-mount"]/div/div/div[1]/div[3]/div[2]/div/div[1]/form/div[4]/div/div/div[2]/button[2]/div', {visible: true, timeout: 10000 });
    page.click('xpath=//*[@id="app-mount"]/div/div/div[1]/div[3]/div[2]/div/div[1]/form/div[4]/div/div/div[2]/button[2]/div');
    
    await delay(500);
    await browser.close();
};

getQuotes();