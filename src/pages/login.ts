import type { Page } from "puppeteer";

export class LoginPage {
    private readonly usernameInput = "input#username";
    private readonly passwordInput = "input#password";
    private readonly submitButton = "input[type='submit']";

    constructor(private page: Page) {}

    async navigate(): Promise<void> {
        await this.page.goto("https://quotes.toscrape.com/login");
    }

    async login(username: string, password: string): Promise<void> {
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.submitButton).click();
    }
}
