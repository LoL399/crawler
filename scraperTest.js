const express = require("express");
const cheerio = require("cheerio");
const { categories, movies, persons, products } = require("./db/repositories/index");
const axios = require("axios").default;
const { getTvseries } = require("./crawling/tv");
const { getReviewPage, getReview } = require("./crawling/review");
const { getUser } = require("./crawling/user");
const {  getNews } = require("./crawling/news");
const { rottenTomatoGet } = require("./crawling/movie");
const port = process.env.PORT || 20020

fs = require("fs");
const app = express();


app.listen(port, async () => {

  await rottenTomatoGet('https://www.rottentomatoes.com/m/the_conjuring_the_devil_made_me_do_it')

  // await getNews("https://vnexpress.net/giai-tri/phim");
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
