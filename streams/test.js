const {ReadArr} = require('./readable-extends');
const {aSumStream} = require("./writable-simplified");
const {Transform} = require("stream");

const http = require("http");

const sumStream = aSumStream();

let srv;

new ReadArr([{a: 1},{a: 2},{a: 3},{a: 4},{a: 5}])
    .pipe(new Transform({
        objectMode: true,
        transform: (chunk, encoding, callback) => {
            http.get("http://localhost:1410/" + chunk.a, (res) => {
                let numStr = "";
                res.on("data", (d) => {
                    numStr += d;
                }).on("end", () => {
                    callback(null, {a: +numStr});
                })
            }).on('error', callback);
        }
    }))
    .pipe(sumStream)
    .on("finish", () => {
        srv.close();
        console.log(sumStream._sum)
    });
;

(srv = http.createServer((req, res) => {
    console.log("connect", req.url);
    const resNum = +req.url.substr(1) + 10;

    res.writeHead(200, {"content-type": "text/plain"});
    res.end(resNum.toString());

})).listen(1410);
