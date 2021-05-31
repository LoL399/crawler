const express = require("express");
const cheerio = require("cheerio");
const { categories, movies, persons, products } = require("./db/repositories/index");
const axios = require("axios").default;
const port = process.env.PORT || 20020
fs = require("fs");
const app = express();
const fethHtml = async (url) => {
  try {
    const { data } = await axios.get(url);
  //   fs.writeFile("hellowrld.txt", data, function(err) {
  //     if(err) {
  //         return console.log(err);
  //     }
  //     console.log("The file was saved!");
  // }); 
    return data;
  } catch {
    console.error(
      `ERROR: An error occurred while trying to fetch the URL: ${url}`
    );

  }
};

const categoryGet = async (genre) => {

    let rawdata = fs.readFileSync('genres.json');
  let data = JSON.parse(rawdata);
    data.genres.map(async (item, idx)=>{

      await categories.insert({name: item}).then(()=>console.log(`add ${item}`))
    })

};


  // return deals;
const rottenTomatoGet = async (link) => {
  const html = await fethHtml(
    link
  );

  const selector = cheerio.load(html);
  const searchResults = selector("body").find(
    "div[class='body_main container'] > div[id='main_container'] > section[class='mob-body '] > div[id='mainColumn'] "
  );
  const images = []
  searchResults
  .find(
    "section[data-qa='photos-section'] > div > div"
  ).first().find("div[class='Carousel PhotosCarousel'] > div ").map((idx, el) => {
        const elementSelector = selector(el);
        const imgLink = elementSelector.find("div > a > img").attr('data-src');
        images.push(imgLink)
      })
  const name = searchResults
    .find("div[id='topSection']> score-board > h1")
    .text()
    .trim();
  const score = searchResults
  .find("div[id='topSection']> score-board")
  const on_screen = searchResults
  .find("section[class='panel panel-rt panel-box movie_info media'] > div[class='media-body'] > div[class='panel-body content_body'] > ul[class='content-meta info'] > li")
  .children("div[class='meta-value'] ").find("time").first().text().trim()
  const summary = searchResults
  .find("section[class='panel panel-rt panel-box movie_info media'] > div[class='media-body'] > div[class='panel-body content_body'] > div[id='movieSynopsis']")
  .text().trim()

  // const rating = searchResults
  // .find("section[class='panel panel-rt panel-box movie_info media'] > div > div > ul > li ")
  // .first().find('div').last().text().trim();

  const genres = searchResults
  .find("section[class='panel panel-rt panel-box movie_info media'] > div > div > ul > li ")
  .children("div[class='meta-value genre']").text().replace(/\s\s+/g, ' ').trim().split(',');

  genres.map(async (genre)=>{
    let genreName = genre.trim().charAt(0).toUpperCase() + genre.trim().slice(1)
    const checkDb = await categories.getByParams({name: genreName})
    if(checkDb.length === 0)
    {
      await categories.insert({name: genreName})
    }
  })
  searchResults
  .find("section[id='movie-cast'] > div > div > div").map(async (idx, el) => {
    const elementSelector = selector(el);
    const actorName=elementSelector.find("a > span").text().trim();
    const actorLink = elementSelector.find("a").attr('href');
    const actorRole =  elementSelector.find("span[class='characters subtle smaller']").text().trim()

    const checkDb = await persons.getByParams({name: actorName})
    if(actorLink && checkDb.length === 0 && actorName !== '')
    {
      const item = await actorGet(`https://www.rottentomatoes.com${actorLink}`)
    }
    if(actorName !== '' )
    {
      await createProduct(name, actorName,actorRole )
    }
  })

  if(name !== '')
  {
    await movies.insert({
      name,
      images,
      lemon_score: score.attr('tomatometerscore'),
      user_score: score.attr('audiencescore'),
      on_screen,
      summary,
      rating: score.attr('rating') || 'not rating',
      genres
    }).then(()=>{
      console.log(`add movie ${name}` )
    })
  }


};

const createProduct = async(movie, person, character) =>{



  if(movie !== '')
  {
    let product ={
      movie,
      person,
      character
    }
    await products.insert(product).then(()=>{
      console.log(`add product for ${movie}` )
    })

  }

}

const actorGet = async (actorLink) =>{

  const html = await fethHtml(actorLink);

  const selector = cheerio.load(html);
  const searchResults = selector("body").find(
    "div[class='container roma-layout__body'] > main[id='main_container'] > div[id='main-page-content'] > div[class='layout celebrity'] > article[class='layout__column layout__column--main'] > section > div[class=' celebrity-bio']"
  );

  const name = searchResults.find("div[class='celebrity-bio__content'] > h1").text().trim();
  const birth = searchResults.find("div[class='celebrity-bio__content'] > div[class='celebrity-bio__info'] > p[data-qa='celebrity-bio-bday']")
  .text().trim().slice(11).trim()
  const born_in = searchResults.find("div[class='celebrity-bio__content'] > div[class='celebrity-bio__info'] > p[data-qa='celebrity-bio-birthplace']")
  .text().trim().slice(13).trim()
  const summary = searchResults.find("div[class='celebrity-bio__content'] > div[class='celebrity-bio__info'] > p[data-qa='celebrity-bio-summary']")
  .text().trim().replace(/[^a-zA-Z0-9)]'/gi, "")
  const images = []
  images.push(searchResults.find("a > img").attr("data-src"))
  selector("body").find(
    "div[class='container roma-layout__body'] > main[id='main_container'] > div[id='main-page-content'] > div[class='layout celebrity'] > article[class='layout__column layout__column--main'] > section[class='celebrity-photos']"
  ).find("div[class='celebrity-photos__wrap'] > div > ul > li")
  .map((idx,el) => {
    const elementSelector = selector(el);
    const imgLink = elementSelector.find("button > img").attr('data-src');
    images.push(imgLink)
    
  });
  if(name!=='')
  {
    await persons.insert({
      name,
      birth,
      born_in,
      summary,
      images
    }).then(()=>{
      console.log(`add person ${name}` )
    })
  }

}
  

const prepareMovie = async (movieLink) => { 

    const selector = cheerio.load(movieLink);
    const searchResults = selector("body").find(
      "div[class='body_main container'] > div[id='main_container'] > section[class='mob-body '] > div[id='mainColumn'] "
    );
    const name = searchResults
    .find("div[id='topSection']> score-board > h1")
    .text()
    .trim();
    const checkDb = await movies.getByParams({name: name})
    if(checkDb.length === 0 &&( name !== '' || name !== null) )
    { 
      await rottenTomatoGet(movieLink);
    }
}


const generalFormatTVSeries  = async (searchResults) => {


  const name = searchResults
  .find("div[id='topSection'] > section > div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > h1[class='mop-ratings-wrap__title mop-ratings-wrap__title--top']").text().trim()

  const lemon_score = searchResults
  .find(" div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > section[class='mop-ratings-wrap__info']")
  .find("section > div[class='mop-ratings-wrap__half critic-score'] > h2 > a >  span > .mop-ratings-wrap__percentage")
  .text().trim()

  const user_score = searchResults
  .find(" div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > section[class='mop-ratings-wrap__info']")
  .find("section > div[class='mop-ratings-wrap__half audience-score'] > h2 > a >  span > .mop-ratings-wrap__percentage")
  .text().trim()
  const summary =  searchResults
  .find(".tv-series__series-info > .tv-series__series-info-content > .tv-series__series-info-description > #movieSynopsis")
  .text().trim()

  

  return {
    name,
    lemon_score: lemon_score.slice(0,lemon_score.length-1),
    user_score: user_score.slice(0,user_score.length-1),
    summary: summary
  }
}


const tvseries = async () => {

  // const html = await fethHtml(
  //   ""
  // );

  // const selector = cheerio.load(html);
  // const searchResults = selector("body").find(
  //   "div[class='body_main container'] > div[id='main_container'] > div[class='tv-series col-left-center col-full-xs'] "
  // );
  // let result = await generalFormatTVSeries(searchResults)
  // let seasonList = []

  // for ( let item of searchResults
  //   .find("#seasonList > div > a"))
  // {
  //   let link = selector(item)
  //   let seasonName = link.find("season-list-item").attr("seasontitle")
  //   console.log(seasonName)

  //   seasonList.push(link.attr('href'))
  // }

  await tvseasons("https://www.rottentomatoes.com/tv/the_walking_dead/s05")

  // console.log({
  //   ...result,
  // })


}

const tvseasons = async (link) => {
  // const html = await fethHtml(link);

  // const selector = cheerio.load(html);
  // const searchResults = selector("body").find(
  //   "div[class='body_main container'] > div[id='main_container'] > article > div "
  // );

  // const score = searchResults.find(" #mainColumn > #topSection > .tv-season-top-section__ratings-group > .season_score_panel")
  // .find("section > div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > .mop-ratings-wrap__info > section")
  
  // const lemon_score = score.find("div[class='mop-ratings-wrap__half critic-score'] > h2 > a  > .mop-ratings-wrap__percentage")
  // .text().trim()
  // const user_score = score.find("div[class='mop-ratings-wrap__half audience-score'] > h2 > a  > .mop-ratings-wrap__percentage")
  // .text().trim()
  // const summary = searchResults.find("#mainColumn > .episode-list-wrap > section[class='panel panel-rt panel-box movie_info'] > div > div > div ")
  // .text().trim()
  // // const 

  // const genres = searchResults.find("#mainColumn > .episode-list-wrap > section[class='panel panel-rt panel-box movie_info'] > div > div > ul > li ")
  // .children("div[data-qa='season-info-genre']")
  // .text().trim().split(',')

  // const on_screen = searchResults.find("#mainColumn > .episode-list-wrap > section[class='panel panel-rt panel-box movie_info'] > div > div > ul > li ")
  // .children("div[data-qa='season-info-premiere-date']")
  // .text().trim()

  // const network = searchResults.find("#mainColumn > .episode-list-wrap > section[class='panel panel-rt panel-box movie_info'] > div > div > ul > li ")
  // .children("div[data-qa='season-info-network']")
  // .text().trim()
  // const images = []
  // const crawlImages = searchResults.find("#mainColumn > .episode-list-wrap > section[id='movie-photos-panel'] > div[class='panel-body content_body allow-overflow'] > #photos-carousel-root > div[class='Carousel PhotosCarousel'] > div")

  // // console.log(crawlImages.length)
  // for (let item of crawlImages)
  // {
  //   let search = selector(item).find("div > a > img").attr('src')
  //   images.push(search)
  // }

  // const episodeList = searchResults
  // .find("#mainColumn > .episode-list-wrap > #desktopEpisodeList > div[class='panel-body content_body'] > #episode-list-root > .episodes > .bottom_divider")
  
  // for(let episode of episodeList)
  // {
  //   let item = selector(episode)
  //   .find("div > div > div > a")
  //   console.log(item.attr("href"))
  // }
  // console.log(episodeList.length)
  await episodes('https://www.rottentomatoes.com/tv/the_walking_dead/s05/e03');

  // console.log({
  //   lemon_score: lemon_score.slice(0, lemon_score.length-1),
  //   user_score: user_score.slice(0, user_score.length-1),
  //   summary,
  //   genres,
  //   on_screen,
  //   network,
  //   images
  // })

}

const episodes = async (link) =>{
  const html = await fethHtml(link);

  const selector = cheerio.load(html);
  const searchResults = selector("body").find(
    "div[class='body_main container'] > div[id='main_container'] > #main_container >div[id='mainColumn'] ");
  
  const on_screen = searchResults.find("section[class='panel panel-rt panel-box'] > div[class='panel-body content_body'] > ul > li")
  .children("div[data-qa='episode-info-air-date']").text().trim()

  const summary = searchResults.find("section[class='panel panel-rt panel-box'] > div[class='panel-body content_body'] > div[id='movieSynopsis']")
  .text().trim()


  console.log({
    on_screen,
    summary
  })

  
}



app.listen(port, async () => {
  await tvseries();
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
})

