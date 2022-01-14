export class NetworkInfoResponse {
    constructor(input) {
        this.latest_turing_space = null;
        this.total_clients = null;
        this.automacoin_supply = null;
        this.brick_size = null;
        Object.assign(this, input);
    }
}