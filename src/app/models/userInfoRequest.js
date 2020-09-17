export class UserInfoRequest {
    constructor(params) {
        this.client = null;
        this.random_nonce = null;
        this.signature = null;
        Object.assign(this, params);
    }
}