export class WorkAllocationResponse {
    constructor(params) {
        this.from = null;
        this.assigned = null;
        this.tm_set = null;
        this.deadline = null;
        this.reward = null;
        this.nonce = null;
        this.signature = null;
        Object.assign(this, params);
    }
}