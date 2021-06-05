const express = require("express");
<<<<<<< HEAD
const { getTvseries } = require("./crawling/tv");
const port = process.env.PORT || 7000;
=======
const cheerio = require("cheerio");
const { categories, movies, persons, products } = require("./db/repositories/index");
const axios = require("axios").default;
const { getTvseries } = require("./crawling/tv");
const { getReviewPage, getReview } = require("./crawling/review");
const { getUser } = require("./crawling/user");
const {  getNews } = require("./crawling/news");
const port = process.env.PORT || 20020
>>>>>>> e022ed02c58d76cc55258662e3ed37ee6ed06a61
fs = require("fs");
const app = express();


app.listen(port, async () => {
<<<<<<< HEAD
  // await episodes('https://www.rottentomatoes.com/tv/the_walking_dead/s05/e03')
  await getTvseries();
  // await getTvseasons("https://www.rottentomatoes.com/tv/sweet_tooth/s01")
=======
  await getNews("https://vnexpress.net/giai-tri/phim");
>>>>>>> e022ed02c58d76cc55258662e3ed37ee6ed06a61
  // const result = await rottenTomatoGet();
  // console.log(await persons.getAllByOffset(0))
  // const categories = await categoryGet()
  // await getCategories()
  // const actor = await actorGet();
  // console.log('fetch start now ...')
  // let rawdata = fs.readFileSync('topOffice.json');
  // let data = JSON.parse(rawdata);
  // for ( let item of data.link)
  // {
  //   await prepareMovie(data.baseUrl + item)
  // }
  // console.log(await products.getAllByOffset(0))
  // console.log(await tvseasons.getAllByOffset(0))
});
