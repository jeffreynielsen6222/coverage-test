import { expect } from "@wdio/globals"
import ApparelPage from "../page_objects/apparel.js"
import Product from "../product.js";
// const DEBUG = "<><><><><-><><><><>\n<><><> DEBUG <><><>\n<><><><><-><><><><>";

describe("Apparel Sort Menu", () => {
    it("Featured products should stay the same after switching sort method", async () => {
        await ApparelPage.open()
        await ApparelPage.waitForProducts();
        await ApparelPage.scrollToBottom();

        const names = await ApparelPage.productCards.map(
            (productCard) => new Product(productCard).getName()
        );

        await ApparelPage.sortButton.click();
        const sortOptions = await ApparelPage.sortOptions.filter(
            async (option) => await option.getAttribute("data-sort") !== "default"
        );
        const randomOption = sortOptions[Math.floor(Math.random() * sortOptions.length)];
        await randomOption.click();
        await ApparelPage.waitForProducts();

        await ApparelPage.sortButton.click();
        await ApparelPage.sortFeatured.click();
        await ApparelPage.waitForProducts();
        await ApparelPage.scrollToBottom();

        const newNames = await ApparelPage.productCards.map(
            (productCard) => new Product(productCard).getName()
        );
        
        let productsMatch = true;
        if (names.length !== newNames.length) {
            productsMatch = false;
        } else {
            for (let i = 0; i < names.length; i++) {
                if (names[i] !== newNames[i]) {
                    productsMatch = false;
                    break;
                }
            }
        }
        
        // console.log(names);
        // console.log(newNames);
        // await browser.debug();

        await expect(productsMatch).toBe(true);
    });

    it("Price: Low to High", async () => {
        await ApparelPage.open()
        await ApparelPage.waitForProducts();
        await ApparelPage.sortButton.click();
        await ApparelPage.sortPriceAsc.click();
        await ApparelPage.waitForProducts();
        
        const prices = await ApparelPage.productCards.map(
            (productCard) => new Product(productCard).getPrice()
        );
        // console.log(prices);
        // await browser.debug();

        await expect(isSorted(prices)).toBe(true);
    });

    it("Price: High to Low", async () => {
        await ApparelPage.open()
        await ApparelPage.waitForProducts();
        await ApparelPage.sortButton.click();
        await ApparelPage.sortPriceDesc.click();
        await ApparelPage.waitForProducts();
        
        const prices = await ApparelPage.productCards.map(
            (productCard) => new Product(productCard).getPrice()
        );

        // console.log(prices);
        // await browser.debug();

        await expect(isSortedDesc(prices)).toBe(true);
    });

    it("Name: A -> Z", async () => {
        await ApparelPage.open()
        await ApparelPage.waitForProducts();
        await ApparelPage.sortButton.click();
        await ApparelPage.sortNameAsc.click();
        await ApparelPage.waitForProducts();
        
        const names = await ApparelPage.productCards.map(
            (productCard) => new Product(productCard).getName()
        );

        // console.log(names);
        // await browser.debug();

        await expect(isSortedString(names)).toBe(true);
    });

    it("Name: Z -> A", async () => {
        await ApparelPage.open()
        await ApparelPage.waitForProducts();
        await ApparelPage.sortButton.click();
        await ApparelPage.sortNameDesc.click();
        await ApparelPage.waitForProducts();
        
        const names = await ApparelPage.productCards.map(
            (productCard) => new Product(productCard).getName()
        );

        // console.log(names);
        // await browser.debug();

        await expect(isSortedStringDesc(names)).toBe(true);
    });

    it("On Sale", async () => {
        await ApparelPage.open()
        await ApparelPage.waitForProducts();
        await ApparelPage.sortButton.click();
        await ApparelPage.sortOnSale.click();
        await ApparelPage.waitForProducts();
        
        let sorted = true;
        let previousProductOnSale = true;
        for await (const productCard of ApparelPage.productCards) {
            const product = new Product(productCard);
            const isOnSale = await product.isOnSale();
            // console.log(`${await product.getName()} IS ON SALE: ${onSale}`);
            // await browser.debug();
            if (isOnSale && !previousProductOnSale) {
                sorted = false;
                break;
            }
            previousProductOnSale = isOnSale;
        }

        // console.log(`SORTED: ${sorted}`);
        // await browser.debug();

        await expect(sorted).toBe(true);
    });

    it("New Arrivals", async () => {
        await ApparelPage.open()
        await ApparelPage.waitForProducts();
        await ApparelPage.sortButton.click();
        await ApparelPage.sortNew.click();
        await ApparelPage.waitForProducts();
        
        let sorted = true;
        let previousProductNew = true;
        for await (const productCard of ApparelPage.productCards) {
            const product = new Product(productCard);
            const isNew = await product.isNew();
            // console.log(`${await product.getName()} IS NEW: ${isNew}`);
            // await browser.debug();
            if (isNew && !previousProductNew) {
                sorted = false;
                break;
            }
            previousProductNew = isNew;
        }

        // console.log(`SORTED: ${sorted}`);
        // await browser.debug();

        await expect(sorted).toBe(true);
    });
});

function isSorted(array) {
    for (let i = 1; i < array.length; i++)
        if (array[i] < array[i - 1]) return false;
    return true;
}

function isSortedDesc(array) {
    for (let i = 1; i < array.length; i++)
        if (array[i] > array[i - 1]) return false;
    return true;
}

function isSortedString(array) {
    for (let i = 1; i < array.length; i++)
        if (array[i].localeCompare(array[i - 1]) < 0) return false;
    return true;
}

function isSortedStringDesc(array) {
    for (let i = 1; i < array.length; i++)
        if (array[i].localeCompare(array[i - 1]) > 0) return false;
    return true;
}
