export class WorkAllocationRequest {
    constructor(client, nonce, signature) {
        this.client = client;
        this.nonce = nonce;
        this.signature = signature;
    }
}