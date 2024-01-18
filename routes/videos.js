const express = require('express');
const router = express.Router();
const app = express();
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const cors = require('cors')
app.use(cors());

app.use(express.json());

function readVideoData() {
    const videoData = fs.readFileSync("./data/videos.json");
    const parsedVideoData = JSON.parse(videoData);
    return parsedVideoData;
}

// GET endpoint for all videos data
router.get('/', (_req, res) => {

    const videos = readVideoData().map(video => {
        return {
            id: video.id,
            title: video.title,
            channel: video.channel, 
            image: video.image
        };
    });

    res.json(videos)
});

//GET endpoint for individual videos details
router.get('/:videoId', (_req, res) => {
    const videos = readVideoData()
    const singleVideo = videos.find((video) => video.id == req.params.videoId) 

    res.json(singleVideo);
})

// POST endpoint to add a video
router.post("/", (req, res) => {
    // Make a new video with a unique ID
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        description: req.body.description,
    };

    // 1. Read the current notes array
    // 2. Add to the notes array
    // 3. Write the entire new notes array to the file
    const videos = readNotes();
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    // Respond with the note that was created
    res.status(201).json(newVideo);
});


app.get('/api')

module.exports = router;