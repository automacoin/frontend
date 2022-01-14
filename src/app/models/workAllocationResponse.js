export class WorkAllocationResponse {
    constructor(input) {
        this.from = null;
        this.assigned = null;
        this.workload_ID = null;
        this.tm_start = null;
        this.brick_size = null
        this.colors = null;
        this.states = null;
        this.runtime = null;
        this.deadline = null;
        this.reward = null;
        this.server_nonce = null;
        Object.assign(this, input);
    }
}