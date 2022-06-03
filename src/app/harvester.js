import { WorkAllocationRequest } from './models/workAllocationRequest';
import { API} from '../config/config';
import { AccountRequest } from './models/accountRequest';
import { AccountResponse } from './models/accountResponse';
import { SubmissionRequest } from './models/submissionRequest';
import { SubmissionResponse } from './models/submissionResponse';
import { WorkAllocationResponse } from './models/workAllocationResponse';
import {NetworkInfoRequest } from './models/networkInfoRequest'
import { NetworkInfoResponse } from './models/networkInfoResponse';

/** This module is meant to be run in a separate thread, it roams the AutomaCoin Network fetching resources and submitting results*/

export async function networkStatus() {
    return new NetworkInfoResponse(await harvest(API.NETWORK, JSON.stringify(new NetworkInfoRequest())));
}

export async function account(client, random_nonce, signature) {
    return new AccountResponse(await harvest(API.ACCOUNT, JSON.stringify(new AccountRequest(client, random_nonce, signature))));
}

export async function allocate(client, nonce, signature) {
    return new WorkAllocationResponse(await harvest(API.WALLOC, JSON.stringify(new WorkAllocationRequest(client, nonce, signature))));
}

export async function dispatch(client, tm_start, brick_size, tapes) {
    return new SubmissionResponse(await harvest(API.SUBMIT, JSON.stringify(new SubmissionRequest(client, tm_start, brick_size, tapes))));
}

async function harvest(url, body) {

    const n = 5;
    for (let i = 0; i < n; i++) {
        try {

            let request = new Request(url,
                {
                    method: 'post',
                    headers: new Headers({
                        "Content-Type": "application/json"
                    }),
                    body,
                    signal: (new AbortController()).signal,
                })

            const response = await fetch(request);
            return await response.json();
        } catch (error) {
            const isLastAttempt = i + 1 === n;
            if (isLastAttempt) throw new Error(error);
        }
    }
};

