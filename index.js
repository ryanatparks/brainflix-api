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
app.use("/static-files", express.static("public"));

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})