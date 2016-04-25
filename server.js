var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

  url = 'http://www.imdb.com/title/tt2948356/?ref_=shtt_ov_tt';

  request(url, function(error, response, html) {
    if (!error) {
      $ = cheerio.load(html);
      var title, release, rating, duration;
      var json = { title : "", release : "", rating : "", duration: ""};

      json.title = $('.title_wrapper h1').text().replace(/\u00A0/g, '').trim();
      json.rating = $('meta[itemprop="contentRating"]').attr('content');
      json.release = $('meta[itemprop="datePublished"]').attr('content');
      json.duration = $('time').first().text().trim();
      res.json(json);
    }
  })

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
