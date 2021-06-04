const { fethHtml } = require("./fetchCraw");

const { tvseasons, tvseries, episodes } = require("../db/repositories/index");
const cheerio = require("cheerio");

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

const getTvseries = async () => {
  const html = await fethHtml(
    "https://www.rottentomatoes.com/tv/the_walking_dead/"
  );
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
      images.push(selector(item).find("div > a > img").attr("src"));
    }

    for (let item of searchResults.find("#seasonList > div > a")) {
      let link = selector(item);
      let seasonName = link.find("season-list-item").attr("seasontitle");
      console.log(
        seasonName,
        `https://www.rottentomatoes.com${link.attr("href")}`
      );

      try {
        await getTvseasons(
          `https://www.rottentomatoes.com${link.attr("href")}`,
          seasonName,
          result.name
        );
      } catch (error) {}
    }

    // seasonList.push(link.attr('href'))
  }

  console.log({
    images,
    ...result,
  });
  // tvseries
  //   .insert({
  //     images,
  //     ...result,
  //   })
  //   .then(async () => {
  //     console.log(`add ${result.name}`);})
};

const getTvseasons = async (link, name, showName) => {
  const html = await fethHtml(link);
  if (html) {
    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
      "div[class='body_main container'] > div[id='main_container'] > article > div "
    );

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

    const on_screen = searchResults
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
    for (let item of crawlImages) {
      let search = selector(item).find("div > a > img").attr("src");
      images.push(search);
    }
    for (let item of searchResults.find(
      " #tv-series-cast > section > div[class='panel-body content_body'] > .castSection > div"
    )) {
      const actorName = selector(item).find("div > a > span ").text().trim();
      const actorLink = selector(item).find("a").attr("href");
      const actorRole = selector(item)
        .find("div > span[class='characters subtle smaller']")
        .text()
        .trim();
      // const checkDb = await persons.getByParams({ name: actorName });
      // if (actorLink && checkDb.length === 0 && actorName !== "") {
      // const item = await actorGet(`https://www.rottentomatoes.com${actorLink}`);
      // }
      // if (actorName !== "") {
      //   await createProduct(name, actorName, actorRole);
      // }
    }

    const episodeList = searchResults.find(
      "#mainColumn > .episode-list-wrap > #desktopEpisodeList > div[class='panel-body content_body'] > #episode-list-root > .episodes > .bottom_divider"
    );
    for (let episode of episodeList) {
      let item = selector(episode).find("div > div > div > a");
      //console.log(item.attr("href"))
      await getEpisodes(
        `https://www.rottentomatoes.com${item.attr("href")}`,
        name
      );
    }

    console.log({
      movie_name: showName,
      season_name: name,
      lemon_score: lemon_score.slice(0, lemon_score.length - 1),
      user_score: user_score.slice(0, user_score.length - 1),
      summary,
      genres,
      on_screen,
      network,
      images,
    });
    // tvseasons
    //   .insert({
    //     movie_name: showName,
    //     season_name: name,
    //     lemon_score: lemon_score.slice(0, lemon_score.length - 1),
    //     user_score: user_score.slice(0, user_score.length - 1),
    //     summary,
    //     genres,
    //     on_screen,
    //     network,
    //     images,

    //   })
  }
};

const getEpisodes = async (link, sname) => {
  const html = await fethHtml(link);
  if (html) {
    const selector = cheerio.load(html || "");
    const searchResults = selector("body").find(
      "div[class='body_main container'] > div[id='main_container'] > #main_container >div[id='mainColumn'] "
    );

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
    const on_screen = searchResults
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
    console.log({
      season_name: sname,
      name,
      // name,
      lemon_score: score.slice(0, score.length - 1),
      on_screen,
      summary,
      images,
    });

    // episodes
    //   .insert({
    //     season_id: id,
    //     name,
    //     lemon_score: score.slice(0, score.length - 1),
    //     on_screen,
    //     summary,
    //     images,
    //   })
    //   .then(() => console.log(`add ${(name, id)}`));
  }
};

module.exports = { getEpisodes, getTvseasons, getTvseries };
