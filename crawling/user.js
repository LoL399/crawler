const cheerio = require("cheerio");
const { fethHtml } = require("./fetchCraw");
const getUser = async(link) =>{
    const html = await fethHtml(link);
  
    if (html) {
      const selector = cheerio.load(html);
      const searchResult = selector("body").find("div[class='body_main container'] > #main_container > div[class='col-left-center col-full-xs critics-body'] > section").first()
      .find("div[class='panel-body content_body'] > div[class='critic__critic-panel col-full-sm'] ")
      const name = searchResult.find("div[class='col-full-xs col-sm-19 col-critic-name'] > h1").text().trim()
      const image = searchResult.find("div[class='col-full-xs'] > div[class='col-sm-5 col-xs-10 col-critic-img'] > img").attr("src")
      console.log({name,image})

    }
}

module.exports = {getUser}