// const axios = require("axios").default;
// const cheerio = require("cheerio");
// const db = require("../../repositories/");

// const imagesPath = [
//   "div[id='dp']",
//   "div[class='a-container']",
//   "div[class='celwidget']",
//   "div[id='leftCol']",
//   "div[class='celwidget']",
//   "div[class='a-row']",
//   "div[class='a-row a-spacing-mini a-spacing-top-micro']",
//   "span[class='a-declarative']",
//   "div[class='a-column a-span3 a-spacing-micro imageThumb thumb']",
//   "img",
// ];

// const authorsPath = [
//   "div[id='dp']",
//   "div[class='a-container']",
//   "div[class='celwidget']",
//   "div[id='centerCol']",
//   "div[class='celwidget']",
//   "div[class='a-section a-spacing-micro bylineHidden feature']",
//   "span > a[class='a-link-normal']",
// ];
// const editorialReviewsPath = [
//   "div[id='a-page']",
//   "div[id='dp']",
//   "div[class='a-container']",
//   "div[class='celwidget']",
//   "div[class='celwidget']",
//   "div[class='a-section a-spacing-small a-padding-base']",
//   "div[class='a-section a-spacing-small a-padding-small']",
// ];
// const detailPath = [
//   "div[id='a-page']",
//   "div[id='dp']",
//   "div[class='a-container']",
//   "div[class='celwidget']",
//   "div[class='celwidget']",
//   "div[class='a-section feature detail-bullets-wrapper bucket']",
//   "div[id='detailBullets_feature_div']",
//   "ul[class='a-unordered-list a-nostyle a-vertical a-spacing-none detail-bullet-list']",
//   "li > span",
// ];
// const mentionsPath = [
//   "div[id='a-page']",
//   "div[id='dp']",
//   "div[class='a-container']",
//   "div[class='a-fixed-left-grid a-spacing-extra-large']",
//   "div[class='a-fixed-left-grid-inner']",
//   "div[class='a-fixed-left-grid-col a-col-right']",
//   "div[class='a-row cm_cr_grid_center_container']",
//   "div[class='a-fixed-right-grid-col cm_cr_grid_center_right']",
//   "span[class='cr-lazy-widget cr-summarization-lighthut']",
//   "span[class='cr-widget-Lighthut']",
//   "div[class='cr-lighthut-boundary cr-lighthouse-anchor-buffer celwidget']",
//   "div[class='a-section a-spacing-extra-large cr-asin-1523504463 celwidget']",
//   "div[class='a-row']",
//   "div[class='a-row cr-lighthut']",
//   "div[class='cr-lighthouse-terms']",
//   "span[class='a-declarative']",
//   "a[class='a-link-normal a-text-normal']",
//   "span[class='cr-lighthouse-term']",
// ];
// const reviewsPath = [
//   "div[class='a-fixed-left-grid a-spacing-extra-large']",
//   "div[class='a-fixed-left-grid-inner']",
//   "div[class='a-fixed-left-grid-col a-col-right']",
//   "div[class='a-row cm_cr_grid_center_container']",
//   "div[class='a-fixed-right-grid-col cm_cr_grid_center_right']",
//   "span[class='cr-widget-FocalReviews']",
//   "div[class='a-section a-spacing-medium']",
//   "div[class='card-padding']",
//   "div[class='a-row']",
//   "div[class='a-section a-spacing-large reviews-content filterable-reviews-content celwidget']",
//   "div[class='a-section review-views celwidget']",
//   "div[class='a-section review aok-relative']",
// ];

// const otherReviewsPath = [
//   "div[class='a-fixed-left-grid a-spacing-extra-large']",
//   "div[class='a-fixed-left-grid-inner']",
//   "div[class='a-fixed-left-grid-col a-col-right']",
//   "div[class='a-row cm_cr_grid_center_container']",
//   "div[class='a-fixed-right-grid-col cm_cr_grid_center_right']",
//   "span[class='cr-widget-DesktopGlobalReviews']",
//   "span[class='global-reviews-all']",
//   "div[class='a-row a-spacing-large']",
//   "div[class='a-section global-reviews-content celwidget']",
//   "div[class='a-section global-review-views review-views celwidget']",
//   "div[class='a-section review aok-relative cr-desktop-review-page-0']",
// ];

// const reviewInfoPath = {
//   image: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='genome-widget-row']",
//     "div[class='profile-widget-with-avatar']",
//     "div[class='a-row a-spacing-mini']",
//     "a",
//     "div[class='a-profile-avatar-wrapper']",
//     "div[class='a-profile-avatar']",
//     "img",
//   ],
//   anotherImage: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row a-spacing-mini']",
//     "a",
//     "div[class='a-profile-avatar-wrapper']",
//     "div[class='a-profile-avatar']",
//     "img",
//   ],
//   name: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='genome-widget-row']",
//     "div[class='profile-widget-with-avatar']",
//     "div[class='a-row a-spacing-mini']",
//     "a",
//     "div[class='a-profile-content']",
//     "span",
//   ],
//   anotherName: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row a-spacing-mini']",
//     "a",
//     "div[class='a-profile-content']",
//     "span",
//   ],
//   rateScore: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row']",
//     "a[class='a-link-normal'] > i > span",
//   ],
//   rateTitle: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row']",
//     "a[class='a-size-base a-link-normal review-title a-color-base review-title-content a-text-bold']",
//     "span",
//   ],
//   publishedData: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "span[class='a-size-base a-color-secondary review-date']",
//   ],
//   content: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row a-spacing-small review-data']",
//     "span[class='a-size-base review-text']",
//     "div[class='a-expander-collapsed-height a-row a-expander-container a-expander-partial-collapse-container']",
//     "div[class='a-expander-content reviewText review-text-content a-expander-partial-collapse-content']",
//     "span",
//   ],
//   helpful: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row review-comments cr-vote-action-bar']",
//     "span[class='cr-vote']",
//     "div[class='a-row a-spacing-small']",
//     "span[class='a-size-base a-color-tertiary cr-vote-text']",
//   ],
//   otherCountryImage: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row a-spacing-mini']",
//     "div[class='a-profile']",
//     "div[class='a-profile-avatar-wrapper']",
//     "div[class='a-profile-avatar']",
//     "img",
//   ],

//   otherCountryName: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row a-spacing-mini']",
//     "div[class='a-profile']",
//     "div[class='a-profile-content']",
//     "span",
//   ],

//   otherCountryRateScore: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row a-spacing-none']",
//     "i > span",
//   ],
//   otherCountryRateTitle: [
//     "div[class='a-row a-spacing-none']",
//     "div[class='a-section celwidget']",
//     "div[class='a-row a-spacing-none']",
//     "span[class='a-size-base review-title a-color-base review-title-content a-text-bold']",
//     "span",
//   ],
// };

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const fetchData = async (url) => {
//   try {
//     let response;
//     response = await axios({
//       url,
//       timeout: 10000,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     // console.log("Axios error");
//   }
// };

// const crawler = async (url) => {
//   try {
//     const data = await fetchData(url);
//     const $ = cheerio.load(data);
//     // ------------------------------
//     const images = [];
//     $("body")
//       .find(imagesPath.join(" > "))
//       .each((i, el) => {
//         images.push(
//           $(el).attr("src").trim().replace("._AC_SX60_CR,0,0,60,60_", "")
//         );
//       });
//     // ------------------------------
//     const authors = [];
//     $("body")
//       .find(authorsPath.join(" > "))
//       .each((i, el) => {
//         authors.push($(el).text().trim());
//       });
//     // ------------------------------
//     const editorialReviews = [];
//     $("body")
//       .find(editorialReviewsPath.join(" > "), {
//         wordwrap: 130,
//       })
//       .each((i, el) => {
//         editorialReviews.push($(el).text().trim());
//       });
//     // ------------------------------
//     const details = [];
//     $("body")
//       .find(detailPath.join(" > "))
//       .each((i, el) => {
//         details.push($(el).text().replace(/\s+/g, " ").trim());
//       });
//     // ------------------------------
//     const mentions = [];
//     $("body")
//       .find(mentionsPath.join(" > "))
//       .each((i, el) => {
//         mentions.push($(el).text().trim());
//       });
//     // ------------------------------
//     const reviews = [];
//     $("body")
//       .find(reviewsPath.join(" > "))
//       .each((i, el) => {
//         let avata = $(el).find(reviewInfoPath.image.join(" > "));
//         if (!avata.length) {
//           avata = $(el).find(reviewInfoPath.anotherImage.join(" > "));
//         }
//         avata = avata.attr("src").trim();
//         avata = avata.includes("._CR0,0,500,500_SX48_")
//           ? avata.replace("._CR0,0,500,500_SX48_", "")
//           : avata.replace("._CR0,0,1024,1024_SX48_", "");
//         if (
//           avata ===
//           "https://images-na.ssl-images-amazon.com/images/G/01/x-locale/common/grey-pixel.gif"
//         )
//           avata =
//             "https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default.png";

//         let name = $(el).find(reviewInfoPath.name.join(" > "));
//         if (!name.length) {
//           name = $(el).find(reviewInfoPath.anotherName.join(" > "));
//         }
//         name = name.text().trim();

//         const rateScore = $(el)
//           .find(reviewInfoPath.rateScore.join(" > "))
//           .text()
//           .trim();

//         const rateTitle = $(el)
//           .find(reviewInfoPath.rateTitle.join(" > "))
//           .text()
//           .replace(/\s+/g, " ")
//           .trim();

//         const publishedData = $(el)
//           .find(reviewInfoPath.publishedData.join(" > "))
//           .text()
//           .replace(/\s+/g, " ")
//           .trim();

//         const content = $(el)
//           .find(reviewInfoPath.content.join(" > "))
//           .text()
//           .replace(/\s+/g, " ")
//           .trim();

//         const helpful = $(el)
//           .find(reviewInfoPath.helpful.join(" > "))
//           .text()
//           .replace(/\s+/g, " ")
//           .trim();

//         reviews.push({
//           name,
//           avata,
//           rateScore,
//           rateTitle,
//           publishedData,
//           content,
//           helpful,
//         });
//       });
//     // ------------------------------
//     const reviewsFromOtherCountry = [];
//     $("body")
//       .find(otherReviewsPath.join(" > "))
//       .each((i, el) => {
//         let avata = $(el)
//           .find(reviewInfoPath.otherCountryImage.join(" > "))
//           .attr("src")
//           .trim();
//         avata = avata.includes("._CR0,0,500,500_SX48_")
//           ? avata.replace("._CR0,0,500,500_SX48_", "")
//           : avata.replace("._CR0,0,1024,1024_SX48_", "");
//         if (
//           avata ===
//           "https://images-na.ssl-images-amazon.com/images/G/01/x-locale/common/grey-pixel.gif"
//         )
//           avata =
//             "https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default.png";

//         let name = $(el)
//           .find(reviewInfoPath.otherCountryName.join(" > "))
//           .text()
//           .trim();

//         const rateScore = $(el)
//           .find(reviewInfoPath.otherCountryRateScore.join(" > "))
//           .text()
//           .trim();

//         const rateTitle = $(el)
//           .find(reviewInfoPath.otherCountryRateTitle.join(" > "))
//           .text()
//           .replace(/\s+/g, " ")
//           .trim();

//         const publishedData = $(el)
//           .find(reviewInfoPath.publishedData.join(" > "))
//           .text()
//           .replace(/\s+/g, " ")
//           .trim();

//         const content = $(el)
//           .find(reviewInfoPath.content.join(" > "))
//           .text()
//           .replace(/\s+/g, " ")
//           .trim();

//         const helpful = $(el)
//           .find(reviewInfoPath.helpful.join(" > "))
//           .text()
//           .replace(/\s+/g, " ")
//           .trim();

//         reviewsFromOtherCountry.push({
//           name,
//           avata,
//           rateScore,
//           rateTitle,
//           publishedData,
//           content,
//           helpful,
//         });
//       });

//     return {
//       images,
//       authors,
//       editorialReviews,
//       details,
//       mentions,
//       reviews,
//       reviewsFromOtherCountry,
//     };
//   } catch (err) {
//     return false;
//   }
// };

// const run = async () => {
//   let categories = await db.categories.getByParams({ done: true });
//   categories = categories.map((item) => item.name);
//   for (const category of categories) {
//     let products = await db.products.getByParams({ category, data: "" });
//     products = products.map((item) => ({
//       id: item.id,
//       url: item.url,
//     }));
//     for (const product of products) {
//       let data;
//       let i = 0;
//       while (!data && i <= 10) {
//         data = await crawler(product.url);
//         i++;
//       }
//       if (!data) {
//         console.log("Error: ", product.id);
//         continue;
//       }
//       data = JSON.stringify(data);
//       await db.products.update(product.id, { data });
//       console.log("🚀 ", product.id);
//     }
//   }
// };

// run();
