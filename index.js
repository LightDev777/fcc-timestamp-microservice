var http = require('http');
var url = require('url');
var express = require('express');
var app = express();
const monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

http.createServer(function(req, res) {

var objUrl = url.parse(req.url, true);

 if(objUrl.pathname.length > 1) {
   var objUrlClean = objUrl.pathname;
   objUrlClean = objUrlClean.replace('/', '');
   var patternTest = /\D/.test(objUrlClean);
   var q = patternTest === true ? JSON.stringify(objUrlClean) : Number(objUrlClean);
   console.log(typeof q);
   var result = {
     "unix": 0,
     "natural": ''
   };

    console.log(isNaN(new Date(Number(q)*1000)));
    if(typeof q === 'string' && isNaN(new Date(decodeURI(q))) !== true) {
      //result.natural = decodeURI(q);
      var dt1 = new Date(decodeURI(q) + 'GMT');
      var dt1_month = monthArray[dt1.getMonth()];
      var dt1_date = dt1.getDate() < 10 ? '0' + dt1.getDate() : dt1.getDate();
      var dt1_year = dt1.getFullYear();
      result.unix = Date.parse(dt1) / 1000;
      result.natural = dt1_month + ' ' + dt1_date + ', ' + dt1_year;
    } else if(typeof q === 'number' && isNaN(new Date(Number(q)*1000)) !== true) {
      result.unix = Number(q);
      var dt2 = new Date(result.unix*1000);
      console.log('dt2: ' + dt2);
      var dt2_month = monthArray[dt2.getMonth()];
      var dt2_date = dt2.getDate() < 10 ? '0' + dt2.getDate() : dt2.getDate();
      var dt2_year = dt2.getFullYear();
      result.natural = dt2_month + ' ' + dt2_date + ', ' + dt2_year;
    } else {
      result.natural = null;
      result.unix = null;
    }

    res.write(JSON.stringify(result));

  } else {
    var html = '<h1>Timestamp Microservice API</h1>';
    html += '<p>This displays or returns the unix timestamp and the natural date if you pass a string in the URL parameter.</p>';
    html += '<h2>Example usage:</h2>';
    html += '<p><code>https://timestamp-ms.herokuapp.com/December%2015,%202015</code></p>';
    html += '<p><code>https://timestamp-ms.herokuapp.com/1450137600</code></p>';
    html += '<h2>Example output:</h2>';
    html += '<p><code>{ "unix": 1450137600, "natural": "December 15, 2015" }</code></p>';
    html += '<p>Coded by: Charmie Q.</p>';
    res.write(html);
  }

  res.end();


}).listen(process.env.PORT || 5000);
