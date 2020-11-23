export class AccountRequest {
    constructor(client, random_nonce, signature) {
        this.client = client;
        this.random_nonce = random_nonce;
        this.signature = signature;
    }
}