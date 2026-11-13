import { $ } from "@wdio/globals"
import Page from "./page.js";
// const DEBUG = "<><><><><-><><><><>\n<><><> DEBUG <><><>\n<><><><><-><><><><>";

class ApparelPage extends Page {
    get productCards() {
        return $$("#product-grid > .pcard");
    }

    get sortButton() {
        return $("button#sort-btn");
    }

    get sortOptions() {
        return $$("#sort-dropdown > .sort-option");
    }

    get sortFeatured() {
        return $("[data-sort='default']");
    }

    get sortPriceAsc() {
        return $("[data-sort='price-asc']");
    }

    get sortPriceDesc() {
        return $("[data-sort='price-desc']");
    }

    get sortNameAsc() {
        return $("[data-sort='name-asc']");
    }

    get sortNameDesc() {
        return $("[data-sort='name-desc']");
    }

    get sortOnSale() {
        return $("[data-sort='on-sale']");
    }

    get sortNew() {
        return $("[data-sort='new']");
    }

    get scrollSentinel(){
        return $("#scroll-sentinel");
    }

    async waitForProducts() {
        await browser.waitUntil(async () => await this.productCards.length > 0);
    }

    async scrollToBottom() {
        let productCount = await this.productCards.length;
        while (true) {
            await this.scrollSentinel.scrollIntoView(false);
            try {
                await browser.waitUntil(
                    async () => await this.productCards.length != productCount,
                    { timeout: 3000 },
                );
                productCount = await this.productCards.length;
            } catch (error) {
                console.log(error);
                break;
            }
        }
    }

    open () {
        return super.open("index.html?dept=3");
    }
}

export default new ApparelPage();
