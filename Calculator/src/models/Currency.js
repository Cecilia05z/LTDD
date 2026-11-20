export default class Currency {
    constructor(value, symbol) {
        this.value = value;
        this.symbol = symbol;
    }

    getValue() {
        return this.value;
    }

    getSymbol() {
        return this.symbol;
    }
}