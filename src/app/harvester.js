import { WorkAllocationRequest } from './models/workAllocationRequest';
import { API, TOKEN } from '../config/config';
import { AccountRequest } from './models/accountRequest';
import { AccountResponse } from './models/accountResponse';
import { SubmissionResponse } from './models/submissioneResponse';
import { WorkAllocationResponse } from './models/workAllocationResponse';

/** This module is meant to be run in a separate thread, it roams the AutomaCoin Network fetching resources and submitting results*/

export async function account(client, random_nonce, signature) {
    return new AccountResponse({
        client,
        nonce: random_nonce,
        automacoin: 'N/A'
    });
    //return new AccountResponse(harvest(API.ACCOUNT, 'get', JSON.stringify(new AccountRequest(client, random_nonce, signature))));
}

export async function allocate(client, nonce, signature) {

    //2, 2, 2000, 4607, 5615
    return new WorkAllocationResponse({
        colors: 2,
        states: 2,
        runtime: 200,
        tm_set: [4607, 5615]
    })
    //return new WorkAllocationResponse(harvest(API.WALLOC, 'get', JSON.stringify(new WorkAllocationRequest(client, nonce, signature))));
}

export async function dispatch(from, assigned, workload_ID, turing_machines, tapes, nonce, signature) {

    return 'OK'
    //return new SubmissionResponse(harvest(API.SUBMIT, 'get', JSON.stringify(new SubmissionRequest(from, assigned, workload_ID, turing_machines, tapes, nonce, signature))));
}

async function harvest(url, method, body) {

    const request = new Request(url,
        {
            method,
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body,
            signal: (new AbortController()).signal,
        })

    try {
        const response = await fetch(request);
        return await response.json();
    } catch (error) {
        throw new Error(error)
    }
}

