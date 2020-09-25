//resources from the network should be retrieved, parsed and manipulated in a background process 
//tentative implementation
export async function hello() {
    console.log("hello from harvester thread!");
    let response = await fetch('https://run.mocky.io/v3/483b1eb7-6d9a-48cc-b1db-7534527b512b');
    response = await response.json();
    await new Promise((ok, ko) => {
        setInterval(() => ok(1), 2500);
    })
    return response;
}