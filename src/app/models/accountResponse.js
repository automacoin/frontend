export class AccountResponse {
    constructor(input) {
        this.client = null;
        this.nonce = null;
        this.automacoin = null;
        Object.assign(this, input);
    }
}