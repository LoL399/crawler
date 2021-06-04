const cheerio = require("cheerio");
const { fethHtml } = require("./fetchCraw");


const getReviewPage = async (link) => {
    const html = await fethHtml(link);
  
    if (html) {
      const selector = cheerio.load(html);
      const searchResults = selector("body").find(
        "div[class='body_main container'] > div[id='main_container'] > div[class='col col-center-right col-full-xs'] > section > div[class='panel-body content_body reviews-content'] "
      )
      .find("div[class='reviews-movie'] > .content > div ").last().find("span").text().trim()

      console.log(searchResults.replace( 'Page 1 of ',''))

    }
  };

const getReview = async (link) => {
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
        let reviewerLink = item.find("div[class='col-xs-8 critic-info'] > div[class='col-sm-17 col-xs-32 critic_name'] > a").attr("href");
        let reviewer = item.find("div[class='col-xs-8 critic-info'] > div[class='col-sm-17 col-xs-32 critic_name'] > a").first().text().replace(/\n/g, "").trim();
        let content = item.find("div[class='col-xs-16 review_container'] > .review_area > .review_desc > .the_review ").text().trim();
        let score = item.find("div[class='col-xs-16 review_container'] > .review_area > .review_desc > div[class='small subtle review-link']").children()
        .remove()
        .end().text().replace(/\n/g, "").trim().replace('| Original Score: ','').split('/')
       
        console.log({reviewer, content, score:  reviewScore(score),reviewerLink})
    }


    // const getReviewerProfile = searchResults;

  }
};

const reviewScore = (scoreArray) =>  {
  if(scoreArray.length > 1)
  {
    return((parseFloat(scoreArray[0])/parseFloat(scoreArray[1])*10))
  }
  return (scoreArray[0])
}

module.exports = { getReview, getReviewPage };
