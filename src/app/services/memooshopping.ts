import { memooshoppingitem } from './memooshoppingitem';

export class memooshopping {

    constructor(private items : memooshoppingitem[]) {}

    get getTotalCount() {
        let counter = 0;
        for (let productID in this.items) {
            counter += this.items[productID].quantity;
        }
        return counter;
    }

    get productids() {
        return Object.keys(this.items);
    }

}