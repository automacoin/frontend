export class SubmissionRequest {
    constructor(client, tm_start, workload_ID, turing_machines, tapes, nonce, signature) {
        this.client = client;
        this.tm_start = tm_start;
        this.states = states;
        this.brick_size = brick_size;
        this.turing_machines = turing_machines;
        this.tapes = tapes;
    }
}

