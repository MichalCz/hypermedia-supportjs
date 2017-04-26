const http = require("http-server");
const request = require('request-promise');

const urllist = ['http://localhost:28211/test1.json', 'http://localhost:28211/test2.json'/*, 'http://localhost:28211/test23.json' */];

new Promise((res, rej) =>
    http.createServer({
            root: `${__dirname}/public`
        }).listen(
            28211, (err) => err ? rej(err) : res()
        )
)
.then(
    () => Promise.all(
        urllist.map(
            (url) => request(url)
        )
    )
)
.then(
    (arr) => arr.map(JSON.parse)
)
.then(
    console.log
)
.then(
    () => console.log("done")
)
.catch(
    (e) => console.log("Error occurred", e && e.stack)
)
.then(
    () => process.exit(0)
);
