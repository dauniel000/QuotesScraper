import puppeteer from "puppeteer";
import { LoginPage } from "./pages/login.js";
import { TimeTrack } from "./utils/timetracking.js";
import { QuotePages } from "./pages/quotes.js";
import { saveDataToJson } from "./pages/storage.js";
import { CONFIG } from "./config.js";

async function run() {
    const timeTrack = new TimeTrack(performance);

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.setViewport({ width: 1080, height: 1024 });

    const loginPage = new LoginPage(page);
    const quotePages = new QuotePages(page);
    try {
        console.log("Starting scraper.");

        await loginPage.navigate();

        await Promise.all([
            page.waitForNavigation({ waitUntil: "networkidle2" }),
            loginPage.login(CONFIG.auth.username, CONFIG.auth.password),
        ]);

        const quotes = await quotePages.scrape(
            CONFIG.howManyPages,
            CONFIG.startPage,
        );

        await saveDataToJson(quotes, CONFIG.outDataFile);
    } catch (error) {
        console.error("Process ended with error: ", error);
    } finally {
        await browser.close();
        timeTrack.end();
    }
}

await run();
