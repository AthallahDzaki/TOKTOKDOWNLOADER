const express = require("express");
const app = express();
const TikTokScraper = require('tiktok-scraper');

async function Tiktok(url) {
    try {
        const videoMeta = await TikTokScraper.getVideoMeta(url);
        return videoMeta.collector[0];
    } catch (error) {
        console.log(error);
    }
}

app.get("/", (request, response) => {
  var link = request.query.url;
  if(!link)
    return response.send({
        code: 400,
        message: 'please input parameter url.'
    })
  Tiktok(link).then(res => {
    response.json(res)
  })
});
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
