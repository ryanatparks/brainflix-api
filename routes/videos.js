const express = require('express');
const router = express.Router();
const app = express();
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')

app.use(cors());
app.use(express.json());

const videos = require('../data/videos.json');

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
router.get('/:videoId', (req, res) => {
    const videos = readVideoData()
    if (!video) {
        return res.status(500).json({ error: 'Unable to fetch video data'})
    }
    const singleVideo = videos.find((video) => video.id == req.params.videoId) 
    if (!singleVideo) {
        return res.status(404).json({error: "Video not found"})
    }
    res.json(singleVideo);
})

// POST endpoint to add a video 
router.post("/", (req, res) => {

    // Make a new video with a unique ID
    const newVideo = {
        id: uuidv4(),
        title: req.body.title,
        channel: 'Totally Tardy',
        image: `http://localhost:${PORT}/image9.jpg` ,
        description: req.body.description,
        views: '20,321',
        likes: '1,201',
        duration: '3:55',
        video: "https://project-2-api.herokuapp.com/stream",
        timestamp: new Date(),
        comments: [],
    };

    // 1. Read the current notes array
    // 2. Add to the notes array
    // 3. Write the entire new notes array to the file
    const videos = readVideoData()
    videos.push(newVideo);
    fs.writeFileSync("./data/videos.json", JSON.stringify(videos));

    // Respond with the note that was created
    res.status(201).json(newVideo);
});

module.exports = router;