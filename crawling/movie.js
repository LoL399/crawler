const { fethHtml } = require("./fetchCraw");
const {
  categories,
  movies,
  persons,
  products,
} = require("../db/repositories/index");
const cheerio = require("cheerio");
const { noPoster, noImage } = require("./noImg");
const { getTrailer } = require("./trailer.js");
const { getReviewPage, getReview, criticReviews } = require("./review");
const categoryGet = async (genre) => {
  let rawdata = fs.readFileSync("genres.json");
  let data = JSON.parse(rawdata);
  data.genres.map(async (item, idx) => {
    await categories
      .insert({ name: item })
      .then(() => console.log(`add ${item}`));
  });
};

const getBody = (selector) => {
  let searchResults = selector("body").find(
    "div[class='body_main container'] > div[id='main_container'] > section[class='mob-body '] > div[id='mainColumn'] "
  );

  if (searchResults.length < 1) {
    searchResults = selector("body").find(
      "div[class='body_main container'] > div[id='main_container'] > section[class='mob-body mob-body--no-hero-image'] > div[id='mainColumn'] "
    );
  }

  return searchResults;
};

const rottenTomatoGet = async (link) => {
  const html = await fethHtml(link);

  if (html) {
    const selector = cheerio.load(html);
    const searchResults = getBody(selector);

    // const postId = [];

    // let page = await getReviewPage(`${link}/reviews?type=top_critics`);
    // for (i = 1; i < page; i++) {
    //   let review = await getReview(
    //     `${link}/reviews?type=top_critics&sort=&page=${i}`
    //   );

    //   postId.concat(review);
    // }

    // let critic = await criticReviews(`${link}/reviews?type=user`);
    // postId.concat(critic);

    const images = [];
    const poster = searchResults
      .find("#topSection > .movie-thumbnail-wrap > .center > img ")
      .attr("data-src");
    searchResults
      .find("section[data-qa='photos-section'] > div > div")
      .first()
      .find("div[class='Carousel PhotosCarousel'] > div ")
      .map((idx, el) => {
        const elementSelector = selector(el);
        const imgLink = elementSelector.find("div > a > img").attr("data-src");
        images.push(imgLink);
      });
    const name = searchResults
      .find("div[id='topSection']> score-board > h1")
      .text()
      .trim();
    const summary = searchResults
      .find(
        "section[class='panel panel-rt panel-box movie_info media'] > div[class='media-body'] > div[class='panel-body content_body'] > div[id='movieSynopsis']"
      )
      .text()
      .trim();

    const trailer = await getTrailer(`${link}/trailers`);

    let info = {};
    searchResults
      .find(
        "section[class='panel panel-rt panel-box movie_info media'] > div > div > ul > li "
      )
      .map((idx, el) => {
        let key = selector(el).find("div").first().text().slice(0, -1).trim();
        let item = selector(el)
          .find("div")
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
          case "Release Date (Streaming)":
            key = "streamingDate";
            break;
          case "Production Co":
            key = "productions";
            break;
          case "Sound Mix":
            key = "soundMixs";
            break;
          case "Aspect Ratio":
            key = "aspectRatio";
            break;
          case "Genre":
            key = "genres";
            break;
          case "View the collection":
            key = "collection";
            break;
          default: {
            (key = null), (item = null);
          }
        }
        if (key) {
          info[key.charAt(0).toLowerCase() + key.slice(1)] = item;
        }
      });
    info["summary"] = summary;
    info["name"] = name;
    info["poster"] = poster;
    info["trailer"] = trailer;
    // console.log(info);
    // let movie_id = "";
    // const checkDb = await movies.getByParams({ name: name });
    // if (checkDb.length == 0) {
    //   movie_id = await movies.insert(info);
    // } else {
    //   movie_id = checkDb[0].id;
    // }

    const whatToKnow = searchResults
      .find("#topSection > #where-to-know > div > section > p > span")
      .text()
      .trim();

    // console.log({ photos: images });
    // const rating = searchResults
    // .find("section[class='panel panel-rt panel-box movie_info media'] > div > div > ul > li ")
    // .first().find('div').last().text().trim();

    const crew = [];
    searchResults
      .find("section[id='movie-cast'] > div > div > div")
      .map(async (idx, el) => {
        const elementSelector = selector(el);
        const personName = elementSelector.find("a > span").text().trim();
        const actorLink = elementSelector.find("a").attr("href");
        const castName = elementSelector
          .find("span[class='characters subtle smaller']")
          .text()
          .trim();

        // let id = 0;

        // const checkDb = await persons.getByParams({ name: personName });
        // if (checkDb.length == 0) {
        //   id = await actorGet(`https://www.rottentomatoes.com${actorLink}`);
        // }
        // else
        // {
        //   id = checkDb[0].id
        // }

        crew.push({ personName, characterName: castName });
        // if (actorName !== "") {
        // createProduct(name, actorName, actorRole);
        // }

      });
    // console.log({ crew });
    
    await createProduct(
      "Movie",
      info,
      whatToKnow,
      images,
      crew,

    );
  }
};

const createProduct = async (
  type,
  info,
  whatToKnow,
  images,
  crew,
  review,
  seasons
) => {
  // if (info) {
  //   let product = {
  //     type,
  //     info,
  //     crew,
  //     whatToKnow,
  //     photos: images,
  //   };
  //   if (season) {
  //     product.season = season;
  //   }
  //   const checkDb = await products.getByParams({ info: info });
  //   if (checkDb.length == 0) {
  //     return await products.insert(product);
  //   } else {
  //     return checkDb[0].id;
  //   }
  // }

  console.log({
    type,
    info,
    crew,
    whatToKnow,
    photos: images,
    seasons
  });
};

const actorGet = async (actorLink) => {
  const html = await fethHtml(actorLink);
  if (html) {
    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
      "div[class='container roma-layout__body'] > main[id='main_container'] > div[id='main-page-content'] > div[class='layout celebrity'] > article[class='layout__column layout__column--main'] > section > div[class=' celebrity-bio']"
    );

    const name = searchResults
      .find("div[class='celebrity-bio__content'] > h1")
      .text()
      .trim();
    const birth = searchResults
      .find(
        "div[class='celebrity-bio__content'] > div[class='celebrity-bio__info'] > p[data-qa='celebrity-bio-bday']"
      )
      .text()
      .trim()
      .slice(11)
      .trim();
    const born_in = searchResults
      .find(
        "div[class='celebrity-bio__content'] > div[class='celebrity-bio__info'] > p[data-qa='celebrity-bio-birthplace']"
      )
      .text()
      .trim()
      .slice(13)
      .trim();
    const summary = searchResults
      .find(
        "div[class='celebrity-bio__content'] > div[class='celebrity-bio__info'] > p[data-qa='celebrity-bio-summary']"
      )
      .text()
      .trim()
      .replace(/[^a-zA-Z0-9)]'/gi, "");
    const images = [];
    images.push(searchResults.find("a > img").attr("data-src"));
    selector("body")
      .find(
        "div[class='container roma-layout__body'] > main[id='main_container'] > div[id='main-page-content'] > div[class='layout celebrity'] > article[class='layout__column layout__column--main'] > section[class='celebrity-photos']"
      )
      .find("div[class='celebrity-photos__wrap'] > div > ul > li")
      .map((idx, el) => {
        const elementSelector = selector(el);
        const imgLink = elementSelector.find("button > img").attr("data-src");
        images.push(imgLink);
      });
    if (name !== "") {
      return await persons.insert({
        name,
        birth,
        born_in,
        summary,
        images,
      });
    }
  }
};

const prepareMovie = async (movieLink) => {
  const selector = cheerio.load(movieLink);
  const searchResults = selector("body").find(
    "div[class='body_main container'] > div[id='main_container'] > section[class='mob-body '] > div[id='mainColumn'] "
  );
  const name = searchResults
    .find("div[id='topSection']> score-board > h1")
    .text()
    .trim();
  const checkDb = await movies.getByParams({ name: name });
  if (checkDb.length === 0 && (name !== "" || name !== null)) {
    await rottenTomatoGet(movieLink);
  }
};

module.exports = {
  categoryGet,
  rottenTomatoGet,
  prepareMovie,
  createProduct,
  actorGet,
};
