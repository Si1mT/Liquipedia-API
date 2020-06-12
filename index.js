var express = require("express");
var app = express();
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://liquipedia.net/';
var port = 3000;

app.get("/all", (req, res, next) => {
    rp(url)
    .then(function(html){
        var games = [];
        
        $('a', '.wiki-header', html).each(function(i, elem){
            games[i] = $(elem).text();
        })
        
        res.json(games);
    })
    .catch(function(err){
  });
});

app.listen(port, () => {
 console.log("Server running on port " + port);
});

