const cheerio = require("cheerio");
const { critic } = require("../db/repositories");
const { posts } = require("../db/repositories");
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
      let list = []
    for (let el of searchResults)
    {
        let item = selector(el);
        let reviewer = item.find("div[class='col-xs-8 critic-info'] > div[class='col-sm-17 col-xs-32 critic_name'] > a").first().text().replace(/\n/g, "").trim();
        let workingNews = item.find("div[class='col-xs-8 critic-info'] > div[class='col-sm-17 col-xs-32 critic_name'] > a").last().text().replace(/\n/g, "").trim();
        // let reviewerId = await getCritic(reviewer,workingNews, 'TOP CRITIC')
        let type = item.children("div[class='col-xs-8 critic-info'] > div[class='col-sm-17 col-xs-32 critic_name'] > rt-icon-top-critic").length;
        let date = item.find("div[class='col-xs-16 review_container'] > .review_area > div[class='review-date subtle small'] ").text().trim();
        let content = item.find("div[class='col-xs-16 review_container'] > .review_area > .review_desc > .the_review ").text().trim();
        let link = item.find("div[class='col-xs-16 review_container'] > .review_area > .review_desc > div[class='small subtle review-link'] > a ").attr('href')
        let score = item.find("div[class='col-xs-16 review_container'] > .review_area > .review_desc > div[class='small subtle review-link']").children()
        .remove()
        .end().text().replace(/\n/g, "").trim().replace('| Original Score: ','')

        let review = {
          type: "review",
          content: content,
          date,
          data: JSON.stringify({
            userType: type > 0 ? 'TOP CRITIC' : workingNews ? 'CRITIC' : 'USER',
            workingNews,
            link,
            score
          })

        }
        let rid = await posts.insert(review)
        list.push(rid)

        // let review = await reviews.insert({score:reviewScore(score),content, pid: id, uid: reviewerId})
        // list.push(review)
    }
    return list

  }
};



const getReviewTV = async (link) => {
  const html = await fethHtml(link);

  if (html) {

    const selector = cheerio.load(html);
    const searchResults = selector("body").find(
        "div[class='body_main container'] > div[id='main_container'] > div[class='col col-center-right col-full-xs'] > section > div[class='panel-body content_body'] "
      )
      .find("div[id='reviews'] > table > tbody > tr")
    let list = []
    for (let el of searchResults)
    {
        let item = selector(el).find("td");

        let reviewer = item.children("a").first().text().replace(/\n/g, "").trim();
        let workingNews = item.children("a").last().text().replace(/\n/g, "").trim();
        let date = item.children("div[class='pull-right subtle small']").text().trim()
        let type = item.children("rt-icon-top-critic").length;
        let above = item.children("div[class='review_icon icon small fresh']")
        // console.log({reviewer})

        // let reviewerId = await getCritic(reviewer,workingNews, tp)
      
        let content = item.last().find("p").last().text().trim();
        // console.log(content)
       
        // let review = await reviews.insert({content, pid: id, uid: reviewerId})

        let review = {
          type: "review",
          content: content,
          date,
          data:  JSON.stringify({
            userType: type > 0 ? 'TOP CRITIC' : workingNews ? 'CRITIC' : 'USER',
            workingNews,
            link,
            score: above.length > 0 ? ' 7.0+ /10 ' : '5.0-/10'
          })

        }
        let rid = await posts.insert(review)
        list.push(rid)
    }
    return list



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
      let list = []
      for (let el of searchResults)
      {
          let item = selector(el);
          let reviewer = item.find("div[class='audience-reviews__user-wrap'] > div[class='audience-reviews__name-wrap '] > span").text().trim();
          // let reviewerId = await getCritic(reviewer,null, 'TOP CRITIC')
          let date = item.find("div[class='audience-reviews__review-wrap'] > span[class='audience-reviews__duration']").text().trim();;
          let content = item.find("div[class='audience-reviews__review-wrap'] > p[class='audience-reviews__review js-review-text clamp clamp-8 js-clamp']").text().trim();
          let scoreful = item.find("div[class='audience-reviews__review-wrap'] > span[class='audience-reviews__score'] > span >span[class='star-display__filled ']").length
          let scoreHalf = item.find("div[class='audience-reviews__review-wrap'] > span[class='audience-reviews__score'] > span >span[class='star-display__half ']").length
                 
          // let review = await reviews.insert({score:scoreful + scoreHalf*0.5,content, pid: id, uid: reviewerId})
          // list.push(review)

          let review = {
            type: "review",
            content: content,
            date,
            data: JSON.stringify( {
              userType: 'USER',
              score : scoreful + scoreHalf * 0.5
            })
  
          }

          let rid = await posts.insert(review)
          list.push(rid)
      }

      return list

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
