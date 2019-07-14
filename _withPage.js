import puppeteer from "puppeteer";
const dappeteer = require("dappeteer");

export default async function withPage(t, run) {
  const browser = await dappeteer.launch(puppeteer, {
    headless: false,
    args: ["--start-maximized", "--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  const metamask = await dappeteer.getMetamask(browser);

  try {
    await run(t, page);
  } finally {
    //  await page.close();
    //  await browser.close();
  }
}
