export class WorkAllocationResponse {
    constructor(input) {
        this.tm_start = null;
        this.brick_size = null
        this.states = null;
        this.runtime = null;
        Object.assign(this, input);
    }
}