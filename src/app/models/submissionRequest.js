export class SubmissionRequest {
    constructor(from, assigned, workload_ID, turing_machines, tapes, nonce, signature) {
        this.from = from;
        this.assigned = assigned;
        this.workload_ID = workload_ID;
        this.turing_machines = turing_machines;
        this.tapes = tapes;
        this.nonce = nonce;
        this.signature = signature;
    }
}