import { assert } from "console";

var axios = require("axios").default;

async function getChuckNorrisJoke() {
    try {
        var options = {
            method: 'GET',
            url: 'https://api.chucknorris.io/jokes/random'
        };
        
        const resp = await axios.request(options);
        return resp;
    } catch (e) {
        throw new Error("Error getting joke " + e);
    }
}

getChuckNorrisJoke().then((result) => {
    assert(result.status === 200, 'Request failed!');
    assert(result.data.value !== undefined, 'No joke returned.. darn!');
    console.log(result.data.value);
});
