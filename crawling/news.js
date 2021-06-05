const cheerio = require("cheerio");
const { fethHtml } = require("./fetchCraw");



const getNews = async(link) =>{
    const html = await fethHtml(link);
  
    if (html) {
      const selector = cheerio.load(html);
      const links = [];
      const searchResult = selector("body").find("section[class='section section_container mt15'] > div > div[class='col-left col-left-subfolder'] ")
      const header = searchResult.find("div[class='wrapper-topstory-folder wrapper-topstory-folder-v2 flexbox width_common wrapper-topstory-subfolder'] > article > div > a ").attr('href')
      links.push(header)
      const others = searchResult.find("div[class='width_common list-news-subfolder has-border-right'] > article")
      for ( let link of others )
      {
          let post = selector(link).find("div > a").attr('href');
          if(post)
            links.push(post)
      }
      
      console.log(links)
    }
}

module.exports = {getNews}