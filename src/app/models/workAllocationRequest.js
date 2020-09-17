export class WorkAllocationRequest {
    constructor(params) {
        this.client = null;
        this.capability = null;
        this.nonce = null;
        this.signature = null;
        Object.assign(this, params);
    }
}