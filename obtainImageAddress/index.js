import puppeteer from "puppeteer";
import fs from "fs";
var gameName;

fs.readFile("../application.txt", function (err, data) { 
    if (err) { 
      return console.error(err); 
    } 
    let tempArray = (data.toString().split(",,"));
    gameName = tempArray[0];
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

    await page.goto('https://www.google.com/search?q=' + gameName + 'Game Cover&sca_esv=736f619aa13a6f3f&tbm=isch&sxsrf=ACQVn086UWoJJpRw4yyxR0qahUetfT5iWg%3A1709113798311&source=hp&biw=1920&bih=919&ei=xgHfZb2sELKg0-kP8bOf0Ao&iflsig=ANes7DEAAAAAZd8P1onDdMo-ViyiEvdjKcU68JuMSvTx&ved=0ahUKEwi9p86G4c2EAxUy0DQHHfHZB6oQ4dUDCAc&uact=5&oq=silent+hill&gs_lp=EgNpbWciC3NpbGVudCBoaWxsMgQQIxgnMgQQIxgnMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgARIxQ1QgwNYoAxwAXgAkAEAmAGbAqABnQ-qAQUwLjcuM7gBA8gBAPgBAYoCC2d3cy13aXotaW1nmAILoALID6gCCsICBxAjGOoCGCfCAgsQABiABBiKBRixA8ICCBAAGIAEGLEDmAMFkgcFMS43LjM&sclient=img', {
        waitUntil: "domcontentloaded",
    });

    await page.click('xpath=//*[@id="islrg"]/div[1]/div[1]/a[1]/div[1]/img');
    await delay(2000);
    const issueSrcs = await page.evaluate(() => {
        const srcs = document.querySelectorAll('.iPVvYb')[0].getAttribute("src");
        return srcs;
      });

    console.log(issueSrcs.toString());

    fs.writeFile( 
        "../imageAddress.txt", 
        (issueSrcs.toString()), 
        function (err) { 
          if (err) { 
            return console.error(err); 
          } 
        } 
    );

    await browser.close();
};

getQuotes();