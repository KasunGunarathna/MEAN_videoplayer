const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');
const db = "mongodb://kpdtest:123456@ds119064.mlab.com:19064/kpdtest";

mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
    if (err) {
        console.log("Error!" + err);
    }
});

router.get('/videos', function(req, res) {
    console.log("Get requset for all videos");
    Video.find({})
        .exec(function(err, videos) {
            if (err) {
                console.log("Error retrieving videos")
            } else {
                res.json(videos);
                console.log("videos");
            }
        })
});

router.get('/videos/:id', function(req, res) {
    console.log("Get requset for signle video");
    Video.findById(req.params.id)
        .exec(function(err, video) {
            if (err) {
                console.log("Error retrieving video")
            } else {
                res.json(video);
                console.log("video");
            }
        })
});

router.post('/video', function(req, res) {
    console.log('post a video');
    var newVideo = new Video();
    newVideo.title = req.body.title;
    newVideo.url = req.body.url;
    newVideo.description = req.body.description;
    newVideo.save(function(err, insertVideo) {
        if (err) {
            console.log('Error saving video');
        } else {
            res.json(insertVideo);
        }
    });
});

router.post('/video/:id', function(req, res) {
    console.log('Update a video');
    Video.findByIdAndUpdate(req.params.id, {
            $set: { title: req.body.title, url: req.body.url, description: req.body.description }
        }, {
            new: true
        },
        function(err, updateVideo) {
            if (err) {
                res.send("Error updating video");
            } else {
                res.json(updateVideo);
            }
        }
    );
});

router.delete('/video/:id', function(req, res) {
    console.log('Deleting a video');
    Video.findByIdAndRemove(req.params.id,
        function(err, deleteVideo) {
            if (err) {
                res.send("Error deleting video");
            } else {
                res.json(deleteVideo);
            }
        });
});

router.get('/', function(req, res) {
    res.send('api works');
    console.log('api');
});

module.exports = router;