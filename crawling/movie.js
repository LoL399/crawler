const { fethHtml } = require("./fetchCraw");
const {
  categories,
  movies,
  persons,
  products,
} = require("../db/repositories/index");
const cheerio = require("cheerio");
const { noPoster, noImage } = require("./noImg");
const categoryGet = async (genre) => {
  let rawdata = fs.readFileSync("genres.json");
  let data = JSON.parse(rawdata);
  data.genres.map(async (item, idx) => {
    await categories
      .insert({ name: item })
      .then(() => console.log(`add ${item}`));
  });
};

const movieInfo = (el) => {
  console.log(key, item);
  // if(item && item !='')
  // {
  //   return {[key]: item}
  // }
};

const rottenTomatoGet = async (link) => {
  const html = await fethHtml(link);

  if (html) {
    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
      "div[class='body_main container'] > div[id='main_container'] > section[class='mob-body mob-body--no-hero-image'] > div[id='mainColumn'] "
    );
    // const images = [];
    const poster = searchResults
      .find("#topSection > .movie-thumbnail-wrap > .center > img ")
      .attr("data-src");
    // searchResults
    //   .find("section[data-qa='photos-section'] > div > div")
    //   .first()
    //   .find("div[class='Carousel PhotosCarousel'] > div ")
    //   .map((idx, el) => {
    //     const elementSelector = selector(el);
    //     const imgLink = elementSelector.find("div > a > img").attr("data-src");
    //     images.push(imgLink);
    //   });
    const name = searchResults
      .find("div[id='topSection']> score-board > h1")
      .text()
      .trim();
    // const score = searchResults.find("div[id='topSection']> score-board");
    // const on_screen = searchResults
    //   .find(
    //     "section[class='panel panel-rt panel-box movie_info media'] > div[class='media-body'] > div[class='panel-body content_body'] > ul[class='content-meta info'] > li"
    //   )
    //   .children("div[class='meta-value'] ")
    //   .find("time")
    //   .first()
    //   .text()
    //   .trim();
    const summary = searchResults
      .find(
        "section[class='panel panel-rt panel-box movie_info media'] > div[class='media-body'] > div[class='panel-body content_body'] > div[id='movieSynopsis']"
      )
      .text()
      .trim();

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
          case "Aspect Ratio":
            key = "aspectRatio";
            break;
        }
        info[key.charAt(0).toLowerCase() + key.slice(1)] = item;
      });
    info["summary"] = summary;
    info["name"] = name;
    info["poster"] = poster;
    console.log(info);

    // const rating = searchResults
    // .find("section[class='panel panel-rt panel-box movie_info media'] > div > div > ul > li ")
    // .first().find('div').last().text().trim();

    // const genres = searchResults
    //   .find(
    //     "section[class='panel panel-rt panel-box movie_info media'] > div > div > ul > li "
    //   )
    //   .children("div[class='meta-value genre']")
    //   .text()
    //   .replace(/\s\s+/g, " ")
    //   .trim()
    //   .split(",");

    // genres.map(async (genre) => {
    //   let genreName =
    //     genre.trim().charAt(0).toUpperCase() + genre.trim().slice(1);
    //   const checkDb = await categories.getByParams({ name: genreName });
    //   if (checkDb.length === 0) {
    //     await categories.insert({ name: genreName });
    //   }
    // });
    // searchResults
    //   .find("section[id='movie-cast'] > div > div > div")
    //   .map(async (idx, el) => {
    //     const elementSelector = selector(el);
    //     const actorName = elementSelector.find("a > span").text().trim();
    //     const actorLink = elementSelector.find("a").attr("href");
    //     const actorRole = elementSelector
    //       .find("span[class='characters subtle smaller']")
    //       .text()
    //       .trim();

    //     const checkDb = await persons.getByParams({ name: actorName });
    //     if (actorLink && checkDb.length === 0 && actorName !== "") {
    //       const item = await actorGet(
    //         `https://www.rottentomatoes.com${actorLink}`
    //       );
    //     }
    //     if (actorName !== "") {
    //       await createProduct(name, actorName, actorRole);
    //     }
    //   });

    // if (name !== "") {
    //   await movies
    //     .insert({
    //       name,
    //       images: images.length ===0 ? noImage : images,
    //       lemon_score: score.attr("tomatometerscore"),
    //       user_score: score.attr("audiencescore"),
    //       on_screen,
    //       summary,
    //       poster: poster === '' ? noPoster: images,
    //       rating: score.attr("rating") || "not rating",
    //       genres,
    //     })
    //     .then(() => {
    //       console.log(`add movie ${name}`);
    //     });
    // }
  }
};

const createProduct = async (movie, person, character) => {
  if (movie !== "") {
    let product = {
      movie,
      person,
      character,
    };
    await products.insert(product).then(() => {
      console.log(`add product for ${movie}`);
    });
  }
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
      await persons
        .insert({
          name,
          birth,
          born_in,
          summary,
          images,
        })
        .then(() => {
          console.log(`add person ${name}`);
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
