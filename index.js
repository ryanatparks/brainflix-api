const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const videos = require('./routes/videos');

const cors = require('cors')
app.use(cors());

app.use(express.json());

app.use('/videos', videos)

// This middleware allows us to serve static files from a folder.
// Keep in mind that the folder name will *not* be part of the request path.
app.use(express.static("public"));

app.use((req, res, next) => {
    if (req.method === "POST" && req.headers["content-type"] !== "application/json") {
        return res.status(400).send("Hey, you need to give me proper JSON");
    }

    // If all is well, continue to the next middleware
    next();
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})