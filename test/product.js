class Product {
    constructor(element) {
        this.element = element;
    }

    get priceElement() {
        return this.element.$("span.pcard-price");
    }

    get nameElement() {
        return this.element.$("p.pcard-name");
    }

    get saleBadge() {
        return this.element.$("span=Sale");
    }

    get newBadge() {
        return this.element.$("span=New");
    }

    // Returns the price as a Number
    async getPrice() {
        const priceText = await this.priceElement.getText();
        return parseFloat(priceText.slice(1));
    }

    // Returns the name of the product
    async getName() {
        return this.nameElement.getText();
    }

    // Returns true if the product is on sale, false otherwise
    async isOnSale() {
        return this.saleBadge.isExisting();
    }

    // Returns true if the product is new, false otherwise
    async isNew() {
        return this.newBadge.isExisting();
    }
}

export default Product;