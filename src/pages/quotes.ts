import type { Page } from "puppeteer";

interface Quote {
    text: string;
    author: string;
    tags: string[];
}

export class QuotePages {
    private readonly quoteSelector = ".quote";

    constructor(private page: Page) {}

    async scrape(
        howManyPages: number = 10,
        startPage: number = 1,
    ): Promise<Quote[]> {
        const allQuotes: Quote[] = [];
        const endPageNum = startPage + howManyPages;

        for (let pageNum = startPage; pageNum < endPageNum; pageNum++) {
            console.log(`Scraping site number: ${pageNum}`);

            await this.page.goto(
                `https://quotes.toscrape.com/page/${pageNum}`,
                { waitUntil: "domcontentloaded" },
            );

            await this.page.waitForSelector(this.quoteSelector);

            const pageQuotes = await this.page.$$eval(
                this.quoteSelector,
                (elements) => {
                    return elements.map((el) => {
                        const text =
                            el.querySelector(".text")?.textContent?.trim() ||
                            "";
                        const author =
                            el.querySelector(".author")?.textContent?.trim() ||
                            "";

                        const tagElements = el.querySelectorAll("a.tag");
                        const tags = Array.from(tagElements).map(
                            (tag) => tag.innerHTML,
                        );

                        return { text, author, tags };
                    });
                },
            );

            console.log(
                `Number of quotes on ${pageNum} site: ${pageQuotes.length} `,
            );
            allQuotes.push(...pageQuotes);
        }

        return allQuotes;
    }
}
