export class SubmissionRequest {
    constructor(client, tm_start, workload_ID, turing_machines, tapes, nonce, signature) {
        this.client = client;
        this.tm_start = tm_start;
        this.workload_ID = workload_ID;
        this.turing_machines = turing_machines;
        this.tapes = tapes;
        this.nonce = nonce;
        this.signature = signature;
    }
}

