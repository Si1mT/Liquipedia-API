var express = require('express');
var app = express();
const rp = require('request-promise');
const $ = require('cheerio');
const url = 'https://liquipedia.net/';
var port = 3000;

app.get('/all', (req, res, next) => {
    rp(url)
    .then(function(html){
        var games = [];
        
        $('a', '.wiki-header', html).each(function(i, elem){
            games[i] = $(elem).text();
        });
        
        res.json(games);
    })
    .catch(function(err){
  });
});

app.get('/:game/majorevents', (req, res, next) => {
    rp(url + req.params.game + '/Main_Page')
    .then(function(html){
        
        var majorEvents = [];
        
        $('.panel-box-heading.wiki-color-dark.wiki-backgroundcolor-light.wiki-bordercolor-light', '.lp-col.lp-order-2.lp-col-12', html).each(function(i, elem){
            majorEvents[i] = $(elem).text().trim();
        });

        res.json(majorEvents);
    })
    .catch(function(err){
  });
})

app.get('/:game/allevents', (req, res, next) => {
    rp(url + req.params.game + '/Main_Page')
    .then(function(html){
        var allEvents = [];
        
        $('.tournaments-list-name', '.tournaments-list', html).each(function(i, elem){
            allEvents[i] = $(elem).text().trim();
        });

        res.json(allEvents);
    })
    .catch(function(err){
  });
})


app.listen(port, () => {
 console.log('Server running on port ' + port);
});

