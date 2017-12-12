var express = require("express");
var mongojs = require("mongojs");
var request = require("request");
var cheerio = require("cheerio");

var PORT = 3000;
var app = express();

app.use(express.static("public"));

var databaseUrl = "articles"
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);
db.on("error", function (error){
  console.log("Database Error:", error);
});


// app.get("/", function (req, res) {
//   res.send("Welcome");
// });


app.get("/all", function (req, res) {
    db.articles.find({}, function (err, dataFound) {
        if (err) {
          console.log(err);
        }

        else {
          res.json(dataFound);
        }
    });
});



app.get("/scrape", function(req, res){

  request("https://longform.org/", function(err, res, html){
    var $ = cheerio.load(html);

    $("article.post.post--single.js-post").each(function(i, element){
        var url = $(this).children("a").attr("href");

        var title = $(this).find("span.post__title__highlight").text().trim();

        var summary = $(this).find("div.post__text.post__body").text().trim();

        if (url) {
          db.articles.save({
            URL: url,
            title: title,
            summary: summary
          }, function (error, savedData) {
            
            if (error) {
              console.log(error)
            }

            else {
              console.log(savedData);
            }
          });

        }
    });
  });

  res.send("complete");

});



app.listen(PORT, function() {
  console.log("Running on port: " + PORT);
});