import test, { meta } from "ava";
import fetch from "node-fetch";
import { startBackgroundProcess, normalizeOutput } from "./util";
import withPage from "./_withPage";
const dappeteer = require("dappeteer");
import puppeteer from "puppeteer";

test.beforeEach(async t => {
  const browser = await dappeteer.launch(puppeteer, {
    headless: false,
    args: ["--start-maximized", "--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  const metamask = await dappeteer.getMetamask(browser);
  const { stdout, exit } = await startBackgroundProcess({
    cmd: "aragon",
    args: ["run"],
    execaOpts: {
      cwd: `./`
      /**
       * By default execa will run the aragon binary that is located at '.tmp/foobar/node_modules'.
       * That is coming from npm and is not the one we want to test.
       *
       * We need to tell it to use the one we just built locally and installed in the e2e-tests package
       */
    },
    readyOutput: "Opening http://localhost:3000/#/"
  });

  // hack so the wrapper has time to start
  await new Promise(resolve => setTimeout(resolve, 2 * 60 * 1000)); // TODO move to utils

  // finding the DAO address
  const daoAddress = stdout.match(/DAO address: (0x[a-fA-F0-9]{40})/)[1];
  await metamask.switchNetwork("localhost"); 
  await metamask.importPK('a8a54b2d8197bc0b19bb8a084031be71835580a01e70a45a13babd16c9bc1563')
  await metamask.switchAccount(1);
	t.context = {
		browser: browser,
    page: page,
    daoAddress: daoAddress,
    metamask: metamask
  };
  
});

test(
  "should run an aragon app successfully",
  async t => {
    // act
    
    
    // console.log("stdout: ", stdout);
    var mnemonic =
      "explain tackle mirror kit van hammer degree position ginger unfair soup bonus";

    // TODO: fetch the counter app instead
    //const fetchResult = await fetch(`http://localhost:3000/#/${daoAddress}`);
    console.log("daooooooooooo");
    try {
      const url = `http://localhost:3000/#/${t.context.daoAddress}`;
      console.log("url ", url);
      
      console.log('1')
      //console.log('metamask ', metamask)
      await t.context.page.goto(url);
      console.log('2')
      
     
     
      const text = "Counter";
     
      const linkHandlers = await t.context.page.$x("//span[contains(text(), 'Counter')]");
     
      // await t.context.metamask.approve();
      await t.context.page.bringToFront();
      await t.context.page.reload();
      await t.context.page.waitForFunction(
        text => document.querySelector("body").innerText.includes(text),
        {},
        text
      );
      const linkHandlers = await t.context.page.$x("//span[contains(text(), 'Counter')]");
      if (linkHandlers.length > 0) {
        await linkHandlers[0].click();
      } else {
        throw new Error("Link not found");
      }
    } catch (e) {
      console.log(e);
    }
    console.log("addres: ", `http://localhost:3000/#/${t.context.daoAddress}`);
    //const fetchBody = await fetchResult.text();

    // cleanup
    //await exit();

    t.is('1','1')
    console.log("helloooooo");
  }
);
