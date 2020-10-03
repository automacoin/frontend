import { WorkAllocationRequest } from './models/workAllocationRequest';

let controller;

export async function harvest(client, capability, nonce, signature) {
    controller = new AbortController();
    const signal = controller.signal;

    const request = new Request('https://run.mocky.io/v3/483b1eb7-6d9a-48cc-b1db-7534527b512b',
        {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(new WorkAllocationRequest(client, capability, nonce, signature)),
            signal: signal,
        })

    try {
        const response = await fetch(request);
        await new Promise((ok, ko) => {
            setInterval(() => ok(1), 1500);
        })

        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

