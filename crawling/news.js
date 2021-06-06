const cheerio = require("cheerio");
const { news } = require("../db/repositories");
const { fethHtml } = require("./fetchCraw");

const writefile = async (page) => {
  fs.writeFile("hellowrld.txt", page, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
};
const getNewsLink = async (link) =>{

  const html = await fethHtml(link);
  if(html)
  {
    const selector = cheerio.load(html);
    const searchResult = selector("body").find(
      "div[class='body_main container'] > div[class='header_main container'] > div[class='container  body_main container'] > div[class='col col-left-center col-full-xs'] > div[class='panel panel-rt panel-box article_body']  > .panel-body "
    )
    .find("#wpv-view-layout-9675-TCPID9674 > div")
    const links = [] 
    for (let div of searchResult)
    {

      selector(div).find("div[class='col-sm-8 newsItem col-full-xs']").map(async (id, el)=>{
        await getNews(selector(el).find('a').attr('href'))
      })
    }


  }
}

const getNews = async (link) => {
  const html = await fethHtml(link);

  if (html) {
    const selector = cheerio.load(html);
    const searchResult = selector("body").find(
      "div[class='body_main container'] > div[class='header_main container'] > div[class='container body_main'] > #article_main_body > div[class='panel-rt panel-box article_body']  > .panel-body "
    );
    if(searchResult.html())
    {
      await news.insert({content: searchResult.html().toString()})
    }



    // console.log(searchResult.length)
  }
};

module.exports = { getNews, getNewsLink };
