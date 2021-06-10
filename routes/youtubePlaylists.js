var yts = require('yt-search');
var express = require('express');

var router = express.Router();

/* Get a list of 10 youtube videos similar to query */
router.get('/', async function(req, res, next) {
  var query = req.query.query;
  if(query) {
    const r = await yts({type: 'playlist', query: query});
    const videos = r.videos.slice(0, 10)
    var result_videos = []
    videos.forEach(function(v) {
      result_videos.push({title: v.title, url: v.url, thumbnail: v.thumbnail});
    });
    res.send(result_videos);
  } else {
    res.send({error: "No parameter specified"})
  }
});

module.exports = router;
