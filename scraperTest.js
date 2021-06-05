const express = require("express");
const { getTvseries } = require("./crawling/tv");
const port = process.env.PORT || 7000;
fs = require("fs");
const app = express();


app.listen(port, async () => {
  // await episodes('https://www.rottentomatoes.com/tv/the_walking_dead/s05/e03')
  await getTvseries();
  // await getTvseasons("https://www.rottentomatoes.com/tv/sweet_tooth/s01")
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
