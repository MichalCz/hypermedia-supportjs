#!/usr/bin/env node

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const base = path.join(__dirname, "uploads");

app.use("/upload", (req, res) => {

    const name = req.url.replace(/[^\/\w\d\.]+/g, '-').match(/([\-\w\d\.]+)\/([\-\w\d\.]+)$/);
    const target = path.join(base, name.join("/"));

    if (!name || !name[0] || !name[1])
        return res.sendStatus(409);

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
            req.pipe(wStream)
                .on("error", j);
            wStream.on("finish", s);
        })
    )
    .then(
        () => res.sendStatus(201)
    )
    .catch(
        (e) => res.sendStatus(500)
    );

});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8081);
