const express = require("express");
const cheerio = require("cheerio");
const { news,categories, movies, persons, products, episodes, reviews, critic, tvseries, tvseasons} = require("./db/repositories/index");
const axios = require("axios").default;
const { getTvseries } = require("./crawling/tv");
const { getReviewPage, getReview, getReviewTV } = require("./crawling/review");
const { getUser } = require("./crawling/user");
const {  getNews, getNewsLink } = require("./crawling/news");
const { rottenTomatoGet } = require("./crawling/movie");
const { getTrailer } = require("./crawling/trailer");
const port = process.env.PORT || 20020

fs = require("fs");
const app = express();


app.listen(port, async () => {
  // await getReview('https://www.rottentomatoes.com/m/the_conjuring_the_devil_made_me_do_it/reviews?type=top_critics')
  // await getReviewTV('https://www.rottentomatoes.com/tv/game_of_thrones/s08/e01/reviews',4)
  // await getTvseries('https://www.rottentomatoes.com/tv/mr_robot')
  // await rottenTomatoGet('https://www.rottentomatoes.com/m/the_conjuring_the_devil_made_me_do_it')
  // await getTrailer('https://www.rottentomatoes.com/m/the_conjuring_the_devil_made_me_do_it/trailers/')
  // await getNews("https://vnexpress.net/giai-tri/phim");
  // const result = await rottenTomatoGet();
  // console.log(await persons.getAllByOffset(0))
  // const categories = await categoryGet()
  // await getCategories()
  // const actor = await actorGet();
  // console.log('fetch start now ...')
  // let rawdata = fs.readFileSync('thisweek.json');
  // let data = JSON.parse(rawdata);
  // for ( let item of data.link)
  // {
  //   await getTvseries(item)
  // }

  // for (let i = 1; i <= 200 ; i++)
  // {
  //   await getNewsLink(`https://editorial.rottentomatoes.com/news/?wpv_view_count=9675-TCPID9674&wpv_paged=${i}`)
  // }

  console.log(await news.getAllByOffset(500))
});
