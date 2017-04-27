const {Writable} = require('stream');

const aSumStream = () => new Writable({
    objectMode: true,
    write(chunk, encoding, callback) {
        this._sum = (this._sum || 0) + chunk.a;
        callback();
    }
});

module.exports = {aSumStream};
