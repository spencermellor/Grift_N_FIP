let errorCodes = {
    404: "Not Found! Please check your URL",
    500: "Server Error - Try again later",
    403: "Authentication Required - Failed to load",
    503: "Server is on maintence.  Please come back soon!"
}

async function fetchData(sourceURL) {
    
    // request to url 
    let resource = await fetch(sourceURL).then(response => {
        if (response.status !== 200) {
            throw new Error(`Error ${response.status}: ${errorCodes[response.status]}`);
        } 
        
        return response;           
    });

    // fetch uses the Promise API, so it'll return with the resource or return false - either way, it resolves the promise
    
    // we'll assume success and pass through a parsed JavaScript object from the JSON data we get
    let dataset = await resource.json();

    return dataset;
    
}

export { fetchData };