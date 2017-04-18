const http = require("http-server");
const request = require('request-promise');

new Promise((res, rej) =>
    http.createServer({
            root: `${__dirname}/public`
        }).listen(
            28211, (err) => err ? rej(err) : res()
        )
).then(
    () => Promise.all([
        request('http://localhost:28211/test1.json'),
        request('http://localhost:28211/test2.json')
    ])
)
.then(
    console.log
)
.then(
    () => console.log("done")
)
.catch(
    (e) => console.log("Error occurred", e + '')
)
.then(
    () => process.exit(0)
);
