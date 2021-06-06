const cheerio = require("cheerio");
const { critic } = require("../db/repositories");
const { reviews } = require("../db/repositories");
const { fethHtml } = require("./fetchCraw");


const getReviewPage = async (link) => {
    const html = await fethHtml(link);
  
    if (html) {
      const selector = cheerio.load(html);
      const searchResults = selector("body").find(
        "div[class='body_main container'] > div[id='main_container'] > div[class='col col-center-right col-full-xs'] > section > div[class='panel-body content_body reviews-content'] "
      )
      .find("div[class='reviews-movie'] > .content > div ").last().find("span").text().trim()
      if(searchResults)
      {
        return (parseInt(searchResults.replace( 'Page 1 of ',''),10));
      }
      else
      {
        return 1
      }


    }
  };

const getReview = async (link, id) => {
  const html = await fethHtml(link);

  if (html) {

    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
        "div[class='body_main container'] > div[id='main_container'] > div[class='col col-center-right col-full-xs'] > section > div[class='panel-body content_body reviews-content'] "
      )
      .find("div[class='reviews-movie'] > .content > .review_table > div")
    for (let el of searchResults)
    {
        let item = selector(el);
        let reviewer = item.find("div[class='col-xs-8 critic-info'] > div[class='col-sm-17 col-xs-32 critic_name'] > a").first().text().replace(/\n/g, "").trim();
        let workingNews = item.find("div[class='col-xs-8 critic-info'] > div[class='col-sm-17 col-xs-32 critic_name'] > a").last().text().replace(/\n/g, "").trim();
        let reviewerId = await getCritic(reviewer,workingNews, 'TOP CRITIC')
      
        let content = item.find("div[class='col-xs-16 review_container'] > .review_area > .review_desc > .the_review ").text().trim();
        let score = item.find("div[class='col-xs-16 review_container'] > .review_area > .review_desc > div[class='small subtle review-link']").children()
        .remove()
        .end().text().replace(/\n/g, "").trim().replace('| Original Score: ','').split('/')
       
        await reviews.insert({score:reviewScore(score),content, pid: id, uid: reviewerId})
    }



    // const getReviewerProfile = searchResults;

  }
};



const getReviewTV = async (link, id) => {
  const html = await fethHtml(link);

  if (html) {

    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
        "div[class='body_main container'] > div[id='main_container'] > div[class='col col-center-right col-full-xs'] > section > div[class='panel-body content_body'] "
      )
      .find("div[id='reviews'] > table > tbody > tr")

    for (let el of searchResults)
    {
        let item = selector(el).find("td");
        
        let reviewer = item.children("a").first().text().replace(/\n/g, "").trim();
        let workingNews = item.children("a").last().text().replace(/\n/g, "").trim();
        let type = item.children("rt-icon-top-critic").length;
        let tp = ""
        if(type > 0 )
        {
          tp="TOP CRITIC"
        }

        // console.log({reviewer})

        let reviewerId = await getCritic(reviewer,workingNews, tp)
      
        let content = item.last().find("p").last().text().trim();
        // console.log(content)
       
        await reviews.insert({content, pid: id, uid: reviewerId})
    }



    // const getReviewerProfile = searchResults;

  }
};



const criticReviews = async (link,id) => {
  const html = await fethHtml(link);

  if (html) {

    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
        "div[class='body_main container'] > div[id='main_container'] > div[class='col col-center-right col-full-xs'] > section > div[class='panel-body content_body reviews-content'] "
      )
      .find("div[class='reviews-movie'] > #movieUserReviewsContent > ul > li")
      for (let el of searchResults)
      {
          let item = selector(el);
          let reviewer = item.find("div[class='audience-reviews__user-wrap'] > div[class='audience-reviews__name-wrap '] > span").text().trim();
          let reviewerId = await getCritic(reviewer,null, 'TOP CRITIC')
          let content = item.find("div[class='audience-reviews__review-wrap'] > p[class='audience-reviews__review js-review-text clamp clamp-8 js-clamp']").text().trim();
          let scoreful = item.find("div[class='audience-reviews__review-wrap'] > span[class='audience-reviews__score'] > span >span[class='star-display__filled ']").length
          let scoreHalf = item.find("div[class='audience-reviews__review-wrap'] > span[class='audience-reviews__score'] > span >span[class='star-display__half ']").length
                 
          await reviews.insert({score:scoreful + scoreHalf*0.5,content, pid: id, uid: reviewerId})
      }

    }

}

const getCritic = async (name, workingNews, type) =>{

  const checkDb = await critic.getByParams({name: name})
  if(checkDb[0])
  {
    return checkDb[0].id
  }
  else
  {
    return critic.insert({name,workingNews,type})
  }

}

const reviewScore = (scoreArray) =>  {
  if(scoreArray.length > 1)
  {
    return((parseFloat(scoreArray[0])/parseFloat(scoreArray[1])*10))
  }
  return (scoreArray[0])
}

module.exports = { getReview, getReviewPage, criticReviews, getReviewTV };
