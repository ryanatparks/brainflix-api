const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8080;
const videos = require('./routes/videos');

//enabling cors with origin parameter
const cors = require('cors')
const { CORS_ORIGIN } = process.env;
app.use(cors({origin: CORS_ORIGIN}));

app.use(express.json());

app.use('/videos', videos)

// This middleware to serve static files from a folder.
app.use(express.static("public"));

app.use((req, res, next) => {
    if (req.method === "POST" && req.headers["content-type"] !== "application/json") {
        return res.status(400).send("Hey, you need to give me proper JSON");
    }
    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})