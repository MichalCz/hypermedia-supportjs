const {Readable} = require('stream');

class ReadArr extends Readable {

    constructor(arr, options) {
        super(Object.assign({objectMode: true}, options));
        this._arr = arr.slice();
    }

    _read() {
        if (this._arr.length) {
            this.push(this._arr.shift());
        } else {
            this.push(null);
        }
    }
    
}

module.exports = {ReadArr};
