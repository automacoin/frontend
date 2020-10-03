export class WorkAllocationRequest {
    constructor(client, capability, nonce, signature) {
        this.client = client;
        this.capability = capability;
        this.nonce = nonce;
        this.signature = signature;
    }
}