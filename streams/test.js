const {ReadArr} = require('./readable-extends');
const {aSumStream} = require("./writable-simplified");

const sumStream = aSumStream();

new ReadArr([{a: 1},{a: 2},{a: 3},{a: 4},{a: 5}])
    .pipe(sumStream)
    .on("finish", () => console.log(sumStream._sum));
;

require("http").createServer((req, res) => {
    
});
