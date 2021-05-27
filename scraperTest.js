const express = require("express");
const cheerio = require("cheerio");
const {categories} = require("./db/repositories/index")
const axios = require("axios").default;
const port = process.env.PORT || 7000;
fs = require('fs');
const app = express();
const fethHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
    fs.writeFile('helloworld.txt', data, function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
    return data;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );
  }
};


const getCategories = async (array) =>{
  let genresArr = []
  for(let item of array)
  {
    let category = await categories.getByParams({name: item.trim()})
    // console.log(category)
    if(typeof category !== 'undefined' && category.length > 0)
    {
      // console.log(category[0].id)
      genresArr.push(category[0].id)

    }


  }
  return genresArr;
}

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
  
    const img = selector("body")
    .find(
      ".wrapper > #content > div[class='player-section'] > .container > div[class='row mt-3'] > div[class='col-md-4 col-12'] > .item > .img-4-6 > .inline > img "
    )
    .attr('src')
    .trim();

    let userScore = Math.round((rating * 2 + (Math.random() * (3 + 3) -3))* 10) / 10
    userScore > 10 ? userScore = 10 : userScore < 0 ? userScore = 1 : userScore = userScore;

    const genresString = selector("body")
    .find(
      ".wrapper > #content > div[class='player-section'] > .container > div[class='row mt-3'] > div[class='col-md-8 col-12 detail-vod-left'] > .detail > div[class='row mt-4'] > div[class='col-md-6 col-12'] > ul > li "
    )
    let genresArr = []
      for (const el of genresString){
      const elementSelector = selector(el).find("span");
      // console.log(elementSelector.text())
      if(elementSelector.text().trim()=="Thể loại:")
      {
        elementSelector.remove()
        let array = selector(el).text().trim().replace(/\s+/g, ' ').split(',')
        let getValue = await getCategories(array);
        genresArr = getValue
      }

    }
    
    
  // let category = await categories.getByParams({name: 'Gameshow'})

  // discountedPrice = matched[matched.length - 1];

  console.log({ name, 
    lemon_score: rating*2,
    summary,
     user_score: userScore,
     genres: genresArr,
      img});
};


const scrapCategory = async (objectWebsite) => {
  const html = await fethHtml(objectWebsite);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    ".wrapper > #content > div[class='main-content mt-10'] > .container > form[id='filterForm'] > div"
  ).first().find(".custom-select > select[name='category_id'] >option");
  // console.log(searchResults)


  const deals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      const id = elementSelector.attr('value');
      const name = elementSelector.text().trim();
      // categories.insert({id, name}).then(()=>console.log('done')).catch((err)=>console.log(err))
      // const rating = elementSelector
      //   .find("div[class='func row'] > div[class='col-md-6 pl-0']> div")
      //   .attr("data-rateit-value");
      // console.log(rating)
      // extractDeal(pageLink, rating);
    })
    .get();

  // return deals;
}


<<<<<<< HEAD
const scrapSteam = async (objectWebsite) => {
  
=======
const scrapSteam = async () => {
  const objectWebsite = "https://www.rottentomatoes.com/browse/in-theaters";
>>>>>>> 48e9c95ebd0155596339434a205b3356504d7ea6

  const html = await fethHtml(objectWebsite);

  const selector = cheerio.load(html);

  const searchResults = selector("body").find(
    "div[class='body_main container'] > div[id='main_container'] > div[id='main-row'] > div[id='content-column'] > nav[class='topbar-container hidden-xs'] > ul > li[id='genre-dropdown'] > div[class='dropdown-menu options'] > div[class='genres'] > div[class='genre']"
  )

  // console.log(searchResults.length)


  const deals = searchResults
    .map((idx, el) => {
      const elementSelector = selector(el);
      const pageLink = elementSelector.find("input").attr('data-genre');
      console.log(pageLink)
      // const rating = elementSelector
      //   .find("div[class='func row'] > div[class='col-md-6 pl-0']> div")
      //   .attr("data-rateit-value");
      // console.log(rating)
      // extractDeal(pageLink, rating);
    })
    .get();

  // return deals;
};

const rottenTomatoGet = async () => {

  const html = await fethHtml('https://www.rottentomatoes.com/m/the_woman_in_the_window_2020');

  const selector = cheerio.load(html);
  const searchResults = selector("body").find(
    "div[class='body_main container'] > div[id='main_container'] > section[class='mob-body '] > div[id='mainColumn'] "
  )
  
  const image = searchResults.find("div[id='topSection']> div[class='movie-thumbnail-wrap'] > div[class='center'] > img")
  .attr('data-src')
  const name = searchResults.find("div[id='topSection']> score-board > h1")
  .text().trim(); 
  console.log({
    name,
    image
  })




}

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`);
<<<<<<< HEAD
  const result = await rottenTomatoGet()
  //const objectWebsite = "https://247phim.com/phim/phim-le/nam/2021";
  // const result = await scrapSteam(objectWebsite);
  // let result = await scrapCategory(objectWebsite)
=======
  // const result = await scrapSteam();
>>>>>>> 48e9c95ebd0155596339434a205b3356504d7ea6
  // console.log(result);
});
