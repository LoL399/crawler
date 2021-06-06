const cheerio = require("cheerio");
const { fethHtml } = require("./fetchCraw");


const getTrailer = async (link) => {
    const html = await fethHtml(link);

    if (html) {
        const selector = cheerio.load(html);
        const searchResults = selector("head")
        .find("meta[name='og:video']").attr("content")

        return searchResults
    }
}

module.exports = {getTrailer}