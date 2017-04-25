const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const base = path.join(__dirname, "uploads/");

app.use("/upload", (req, res) => {
    const name = req.url.replace(/[^\/\w\d]+/g, '-').match(/([\-\w\d\.]+)\/([\-\w\d\.]+)$/);

    if (!name || !name[0] || req.method !== 'POST')
        return res.sendStatus(409);

    console.log("Writing", name);

    const target = path.join(base, name[0]);
    new Promise((s, j) => {
        fs.access(
            path.dirname(target),
            fs.constants.R_OK | fs.constants.W_OK | fs.constants.X_OK,
            (err) => err ?
                fs.mkdir(path.dirname(target), (err) => err ? j(err) : s()) :
                s()
        );
    })
    .then(
        () => fs.createWriteStream(target)
    )
    .then(
        (wStream) => new Promise((s, j) => {
            req.on("error", j);
            req.pipe(wStream)
                .on("error", j)
                .on("finish", s);
        })
    )
    .then(
        () => res.sendStatus(201)
    )
    .catch(
        (e) => {
            console.error("error", e);
            res.sendStatus(500);
        }
    )
    .catch(
        () => console.log("probably client disconnected")
    );

});
app.use(express.static(path.join(__dirname, "public/")));
app.listen(3031);
