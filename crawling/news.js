const cheerio = require("cheerio");
const { posts } = require("../db/repositories");
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


        let date = selector(el).find("a > div[class='panel bannerCaption'] > .panel-body > p[class='noSpacing publication-date']")
        .text().trim()


        await getNews(selector(el).find('a').attr('href'),date)
      })
    }


  }
}

const getNews = async (link,date) => {
  const html = await fethHtml(link);

  if (html) {
    const selector = cheerio.load(html);
    const searchResult = selector("body").find(
      "div[class='body_main container'] > div[class='header_main container'] > div[class='container body_main'] > #article_main_body > div[class='panel-rt panel-box article_body']  > .panel-body "
    );
    if(searchResult.html())
    {
      await posts.insert(
        {
          type: "news",
          content: searchResult.html().toString(),
          date,
  
        }
      )
    }

    



    // console.log(searchResult.length)
  }
};

module.exports = { getNews, getNewsLink };
