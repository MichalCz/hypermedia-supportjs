#!/usr/bin/env node

const express = require('express');
const path = require('path');
const app = express();

app.use("/upload", (req, res) => {
    const name = req.url.replace(/[^\/\w\d\.]+/g, '-').match(/([\-\w\d\.]+)\/([\-\w\d\.]+)$/);

    if (!name || !name[0] || !name[1])
        return res.sendStatus(409);

    
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8081);
