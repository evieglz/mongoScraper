var axios = require("axios");
var cheerio = require("cheerio");


var scrape = function() {

  return axios.get("http://www.nytimes.com").then(function(res) {
    var $ = cheerio.load(res.data);

    var articles = [];

  $("article.css-180b3ld").each(function(i, element) {
   
      var head = $(this)
        .find("h2")
        .text()
        .trim();

      // Grab the URL of the article
      var url = $(this)
        .find("a")
        .attr("href");

      var sum = $(this)
        .find("p")
        .text()
        .trim();

      
      if (head && sum && url) {
      
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object that will push to the array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: "https://www.nytimes.com" + url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;