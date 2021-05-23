const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios").default;
const port = process.env.PORT || 7000;

const app = express();
const fethHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};

const extractDeal = async (objectWebsite, rating) => {
  const html = await fethHtml(objectWebsite);

  const selector = cheerio.load(html);

  const name = selector("body")
    .find(
      ".wrapper > #content > div[class='player-section'] > .container > div[class='row mt-3'] > div[class='col-md-8 col-12 detail-vod-left'] > .detail > h2 "
    )
    .text()
    .trim();
  const summary = selector("body")
    .find(
      ".wrapper > #content > div[class='player-section'] > .container > div[class='row mt-3'] > div[class='col-md-8 col-12 detail-vod-left'] > .detail > .mt-2 > p "
    )
    .text()
    .trim();

  // const getTitle = selector.find('a').attr('href')
  // const link = selector
  //   .find("a")
  //   .find("h3")
  //   .text()
  //   .trim();

  // const image = selector.find("a > div[class='img-4-6'] > div[class='inline'] > img").attr('src')

  // const onScreenDate = 2021

  // const releaseDate = selector
  //   .find(".responsive_search_name_combined")
  //   .find("div[class='col search_released responsive_secondrow']")
  //   .text()
  //   .trim();

  // const link = selector.attr("href").trim();

  // const priceSelector = selector
  //   .find("div[class='col search_price_discount_combined responsive_secondrow']")
  //   .find("div[class='col search_price discounted responsive_secondrow']");

  // const originalPrice = priceSelector
  //   .find("span > strike")
  //   .text()
  //   .trim();

  // const pricesHtml = priceSelector.html().trim();
  // const matched = pricesHtml.match(/(<br>(.+\s[0-9].+.\d+))/);

  //   const discountedPrice = matched[matched.length - 1];

  console.log({ name, rating,summary });

  // return {
  //   searchResults,
  //   // releaseDate,
  //   // originalPrice,
  //   // // discountedPrice,
  //   // link
  // };
};


const scrapSteam = async () => {
  const objectWebsite = "https://247phim.com/phim/phim-le/nam/2021";

  const html = await fethHtml(objectWebsite);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    ".wrapper > #content > div[class='main-content mt-10'] > .container > .panel-vod > div[class='list-vod row category-tabs-item'] > div[class='item col-lg-2 col-md-3 col-sm-4 col-6'] "
  );

  const deals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      const pageLink = elementSelector.find("a").attr("href");
      const rating = elementSelector
        .find("div[class='func row'] > div[class='col-md-6 pl-0']> div")
        .attr("data-rateit-value");
      // console.log(rating)
      extractDeal(pageLink, rating);
    })
    .get();

  return deals;
};

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`);
  const result = await scrapSteam();
  console.log(result);
});