export class UserInfoResponse {
    constructor(params) {
        this.client = null;
        this.nonce = null;
        this.automacoin = null;
        Object.assign(this, params);
    }
}