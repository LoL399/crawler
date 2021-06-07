const { fethHtml } = require("./fetchCraw");

const { tvseasons, tvseries, episodes } = require("../db/repositories/index");
const {getTrailer} = require("./trailer.js")
const cheerio = require("cheerio");
const { noImage } = require("./noImg");
const { getReviewTV } = require("./review");
const { persons } = require("../db/repositories/index.js");
const {actorGet, createProduct} = require ("./movie.js")


const generalFormatTVSeries = async (searchResults) => {
  const name = searchResults
    .find(
      "div[id='topSection'] > section > div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > h1[class='mop-ratings-wrap__title mop-ratings-wrap__title--top']"
    )
    .text()
    .trim();

  const lemon_score = searchResults
    .find(
      " div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > section[class='mop-ratings-wrap__info']"
    )
    .find(
      "section > div[class='mop-ratings-wrap__half critic-score'] > h2 > a >  span > .mop-ratings-wrap__percentage"
    )
    .text()
    .trim();

  const user_score = searchResults
    .find(
      " div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > section[class='mop-ratings-wrap__info']"
    )
    .find(
      "section > div[class='mop-ratings-wrap__half audience-score'] > h2 > a >  span > .mop-ratings-wrap__percentage"
    )
    .text()
    .trim();
  const summary = searchResults
    .find(
      ".tv-series__series-info > .tv-series__series-info-content > .tv-series__series-info-description > #movieSynopsis"
    )
    .text()
    .trim();

  return {
    name,
    lemon_score: lemon_score.slice(0, lemon_score.length - 1),
    user_score: user_score.slice(0, user_score.length - 1),
    summary: summary,
  };
};

const getTvseries = async (link) => {
  const html = await fethHtml(link);
  if (html) {
    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
      "div[class='body_main container'] > div[id='main_container'] > div[class='tv-series col-left-center col-full-xs'] "
    );
    let result = await generalFormatTVSeries(searchResults);

    const images = [];
    for (let item of searchResults.find(
      "#movie-photos-panel > div > div > div> div "
    )) {
      if (selector(item).find("div > a > img").attr("src"))
        images.push(selector(item).find("div > a > img").attr("src"));
    }

    const poster = searchResults.find("#topSection > #tv-image-section > a > img").attr('src')
    // const trailer = await getTrailer(`${link}/videos`)
    let info = {};
    info["summary"] = result.summary;
    info["name"] = result.name;
    info["poster"] = poster;
    selector("body")
      .find(
        "div[class='body_main container'] > div[id='main_container'] > div[class='col-right col-full-xs pull-right'] "
      )
      .find("section[id='detail_panel'] > div > table > tbody > tr ")
      .map((idx, el) => {
        let key = selector(el).find("td").first().text().trim().slice(0, -1);
        let item = selector(el)
          .find("td")
          .last()
          .text()
          .replace(/\n\s\s+/g, "")
          .trim();
        switch (key) {
          case "Original Language":
            key = "originalLanguage";
            break;
          case "rating":
            key = "ratingPermission";
            break;
          case "Release Date (Theaters)":
            key = "theatersDate";
            break;
          case "Aspect Ratio":
            key = "aspectRatio";
            break;
          case "Premiere Date":
            key = "starting";
            break;
          case "Executive Producers":
            key = "producers";
            break;
          case "TV Network":
            key = "network";
            break;
            default:
              {key = null, item=null}
        }
        if(key)
        {
          info[key.charAt(0).toLowerCase() + key.slice(1)] = item;
        }
      });

    // info['trailer'] = trailer
    // let id = 0
    // const checkDb = await tvseries.getByParams({name: result.name})
    // if(checkDb[0])
    // {
    //   id = checkDb[0]
    // }
    // else
    // {
    //   id = await tvseries.insert(info)
    // }

    let seasonList = []

    for (let item of searchResults.find("#seasonList > div > a")) {
      let link = selector(item);
      let seasonName = link.find("season-list-item").attr("seasontitle");
      let poster = link.find("season-list-item").attr("posterurl");
      // const checkDb = await tvseasons.getByParams({season_name: result.name})
      // if(checkDb[0])
      // {
      //   console.log('Already')
      // }
      // else
      // {
        let season = await getTvseasons(
          `https://www.rottentomatoes.com${link.attr("href")}`,
          seasonName,
          poster,
          result.name)
        seasonList.push (season)
      // }


    }

    createProduct('TV',info,null,null,null,null, seasonList )

    // console.log({

    //   ...result,
    //   images
    // });

    // seasonList.push(link.attr('href'))
  }

  // tvseries
  //   .insert({
  //     images,
  //     ...result,
  //   })
  //   .then(async () => {
  //     console.log(`add ${result.name}`);})
};

const getTvseasons = async (link, name, poster, showName) => {
  const html = await fethHtml(link);
  if (html) {
    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
      "div[class='body_main container'] > div[id='main_container'] > article > div "
    );


    
    // let product_id = await createProduct("tv", season_id, whatToKnow, images, crew);


    const score = searchResults
      .find(
        " #mainColumn > #topSection > .tv-season-top-section__ratings-group > .season_score_panel"
      )
      .find(
        "section > div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > .mop-ratings-wrap__info > section"
      );

    const lemon_score = score
      .find(
        "div[class='mop-ratings-wrap__half critic-score'] > h2 > a  > .mop-ratings-wrap__percentage"
      )
      .text()
      .trim();
    const user_score = score
      .find(
        "div[class='mop-ratings-wrap__half audience-score'] > h2 > a  > .mop-ratings-wrap__percentage"
      )
      .text()
      .trim();
    const summary = searchResults
      .find(
        "#mainColumn > .episode-list-wrap > section[class='panel panel-rt panel-box movie_info'] > div > div > div "
      )
      .text()
      .trim();
    // const

    const genres = searchResults
      .find(
        "#mainColumn > .episode-list-wrap > section[class='panel panel-rt panel-box movie_info'] > div > div > ul > li "
      )
      .children("div[data-qa='season-info-genre']")
      .text()
      .trim()
      .split(",");

    const starting = searchResults
      .find(
        "#mainColumn > .episode-list-wrap > section[class='panel panel-rt panel-box movie_info'] > div > div > ul > li "
      )
      .children("div[data-qa='season-info-premiere-date']")
      .text()
      .trim();

    const network = searchResults
      .find(
        "#mainColumn > .episode-list-wrap > section[class='panel panel-rt panel-box movie_info'] > div > div > ul > li "
      )
      .children("div[data-qa='season-info-network']")
      .text()
      .trim();
    const images = [];
    const crawlImages = searchResults.find(
      "#mainColumn > .episode-list-wrap > section[id='movie-photos-panel'] > div[class='panel-body content_body allow-overflow'] > #photos-carousel-root > div[class='Carousel PhotosCarousel'] > div"
    );

    const whatToKnow = searchResults
    .find("div[class='tv-series__series-info'] > div[class='tv-series__series-info-content'] > #movieSynopsis").text().trim()


    // const seasonList = await tvseasons.insert({season_name: name, series: id, summary, starting})


    const episodes = []
    const episodeList = searchResults.find(
      "#mainColumn > .episode-list-wrap > #desktopEpisodeList > div[class='panel-body content_body'] > #episode-list-root > .episodes > .bottom_divider"
    );
    for (let episode of episodeList) {
      let item = selector(episode).find("div > div > div > a");
      //console.log(item.attr("href"))

      let episodeInfo = await getEpisodes(
        `https://www.rottentomatoes.com${item.attr("href")}`,
        name
      );

    episodes.push(episodeInfo)

    return  {season_name: name, summary, starting, episodes}
      

    }
  }
};

const getEpisodes = async (link, sname) => {
  const html = await fethHtml(link);
  if (html) {
    const selector = cheerio.load(html || "");
    const searchResults = selector("body").find(
      "div[class='body_main container'] > div[id='main_container'] > #main_container >div[id='mainColumn'] "
    );

    // const postId = await getReviewTV(`${link}\reviews`);

    const name = searchResults
      .find(
        "#topSection > section[class='tv-episode__scoreboard score-panel-wrap'] > div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > h1"
      )
      .children()
      .remove()
      .end()
      .text()
      .replace(/\r?\n|\r/g, "")
      .trim();
    const airDate = searchResults
      .find(
        "section[class='panel panel-rt panel-box'] > div[class='panel-body content_body'] > ul > li"
      )
      .children("div[data-qa='episode-info-air-date']")
      .text()
      .trim();

    const summary = searchResults
      .find(
        "section[class='panel panel-rt panel-box'] > div[class='panel-body content_body'] > div[id='movieSynopsis']"
      )
      .text()
      .trim();

    const score = searchResults
      .find(
        "#topSection > section[class='tv-episode__scoreboard score-panel-wrap'] > div[class='mop-ratings-wrap score_panel js-mop-ratings-wrap'] > section > section > div"
      )
      .first()
      .find("h2 > a > span[class='mop-ratings-wrap__percentage']")
      .text()
      .trim();
    const images = [];

    const crawlImg = searchResults.find(
      "#movie-photos-panel > div[class='panel-body content_body allow-overflow'] > div[id='photos-carousel-root'] > div[class='Carousel PhotosCarousel'] > div"
    );

    for (let item of crawlImg) {
      images.push(selector(item).find("div > a > img").attr("src"));
    }

    // episodes.insert({
    //   season_id: id,
    //   name,
    //   // name,
    //   airDate,
    //   summary,
    // });

    return({
      name,
      // name,
      airDate,
      summary,
    });

  }
};

module.exports = { getEpisodes, getTvseasons, getTvseries };
