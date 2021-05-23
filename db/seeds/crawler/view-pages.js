// const axios = require("axios").default;
// const cheerio = require("cheerio");
// const db = require("../../repositories");

// const totalPages = [
//   "div[id='a-page']",
//   "div[id='search']",
//   "div[class='s-desktop-width-max s-opposite-dir']",
//   "div[class='s-desktop-content s-opposite-dir sg-row']",
//   "div[class='s-matching-dir sg-col-16-of-20 sg-col sg-col-8-of-12 sg-col-12-of-16']",
//   "div[class='sg-col-inner']",
//   "span[class='rush-component s-latency-cf-section']",
//   "div[class='s-main-slot s-result-list s-search-results sg-row']",
//   "div[class='a-section a-spacing-none s-result-item s-flex-full-width s-widget']",
//   "span[class='celwidget slot=MAIN template=PAGINATION widgetId=pagination-button']",
//   "div[class='a-section a-spacing-none a-padding-base']",
//   "div[class='a-text-center']",
//   "ul[class='a-pagination']",
//   "li[class='a-disabled']",
// ];

// const baseUrl = "https://www.amazon.com";
// const basePath = [
//   "div[id='a-page']",
//   "div[id='search']",
//   "div[class='s-desktop-width-max s-opposite-dir']",
//   "div[class='s-desktop-content s-opposite-dir sg-row']",
//   "div[class='s-matching-dir sg-col-16-of-20 sg-col sg-col-8-of-12 sg-col-12-of-16']",
//   "div[class='sg-col-inner']",
//   "span[class='rush-component s-latency-cf-section']",
//   "div[class='s-main-slot s-result-list s-search-results sg-row']",
//   "div[class='s-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 sg-col sg-col-12-of-16']",
// ];

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
//     console.log("Axios error");
//   }
// };

// let total = 5;

// const infoPath = [
//   "div[class='sg-col-inner']",
//   "span[class='celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results']",
//   "div[class='s-include-content-margin s-border-bottom s-latency-cf-section']",
//   "div[class='a-section a-spacing-medium']",
//   "div[class='sg-row']",
//   "div[class='sg-col sg-col-4-of-12 sg-col-8-of-16 sg-col-12-of-20']",
//   "div[class='sg-col-inner']",
// ];

// const imagePath = [
//   "div[class='sg-col-inner']",
//   "span[class='celwidget slot=MAIN template=SEARCH_RESULTS widgetId=search-results']",
//   "div[class='s-include-content-margin s-border-bottom s-latency-cf-section']",
//   "div[class='a-section a-spacing-medium']",
//   "div[class='sg-row']",
//   "div[class='sg-col sg-col-4-of-12 sg-col-4-of-16 sg-col-4-of-20']",
//   "div[class='sg-col-inner']",
//   "div[class='a-section a-spacing-none']",
//   "span[class='rush-component']",
//   "a[class='a-link-normal s-no-outline']",
//   "div[class='a-section aok-relative s-image-fixed-height']",
//   "img[class='s-image']",
// ];

// const titlePath = infoPath.concat([
//   "div[class='a-section a-spacing-none']",
//   "h2[class='a-size-mini a-spacing-none a-color-base s-line-clamp-2']",
// ]);

// const authorPath = infoPath.concat([
//   "div[class='a-section a-spacing-none']",
//   "div[class='a-row a-size-base a-color-secondary']",
//   "div[class='a-row']",
//   "a[class='a-size-base a-link-normal']",
// ]);

// const releaseDatePath = infoPath.concat([
//   "div[class='a-section a-spacing-none']",
//   "div[class='a-row a-size-base a-color-secondary']",
//   "div[class='a-row']",
//   "span[class='a-size-base a-color-secondary a-text-normal']",
// ]);

// const ratePath = infoPath.concat([
//   "div[class='a-section a-spacing-none a-spacing-top-micro']",
//   "div[class='a-row a-size-small'] > span",
// ]);

// const pricesPath = infoPath.concat([
//   "div[class='sg-row']",
//   "div[class='sg-col sg-col-4-of-12 sg-col-4-of-16 sg-col-4-of-20']",
//   "div[class='sg-col-inner']",
// ]);

// const firstPriceTitlePath = pricesPath.concat([
//   "div[class='a-section a-spacing-none a-spacing-top-small']",
//   "div[class='a-row a-size-base a-color-base']",
//   "a[class='a-size-base a-link-normal a-text-bold']",
// ]);
// const firstPricePath = pricesPath.concat([
//   "div[class='a-section a-spacing-none a-spacing-top-small']",
//   "div[class='a-row a-size-base a-color-base']",
//   "a[class='a-size-base a-link-normal a-text-normal']",
//   "span[class='a-price']",
//   "span[class='a-offscreen']",
// ]);
// const firstPriceDescriptionPath = pricesPath.concat([
//   "div[class='a-section a-spacing-none a-spacing-top-micro']",
// ]);
// const priceChildsPath = pricesPath.concat([
//   "div[class='a-section a-spacing-none a-spacing-top-mini']",
//   "div[class='a-row']",
// ]);

// const priceChildsTitlesPath = [
//   "div[class='a-row a-spacing-mini']",
//   "div[class='a-row a-size-base a-color-base']",
//   "a[class='a-size-base a-link-normal a-text-bold']",
// ];

// const priceAmountChildsPath = [
//   "div[class='a-row a-spacing-mini']",
//   "div[class='a-row a-size-base a-color-base']",
//   "a[class='a-size-base a-link-normal a-text-normal']",
//   "span[class='a-price']",
//   "span[class='a-offscreen']",
// ];

// const priceDescriptionChildsPath = [
//   "div[class='a-row a-spacing-mini']",
//   "div[class='a-row a-size-base a-color-secondary'] > span",
// ];

// const decamelize = (str, separator) => {
//   separator = typeof separator === "undefined" ? "_" : separator;
//   return str
//     .replace(/([a-z\d])([A-Z])/g, "$1" + separator + "$2")
//     .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1" + separator + "$2")
//     .toLowerCase();
// };

// const camelToSnake = (obj) => {
//   if (typeof obj != "object") return obj;

//   for (var oldName in obj) {
//     newName = oldName.replace(/([A-Z])/g, function ($1) {
//       return "_" + $1.toLowerCase();
//     });
//     if (newName != oldName) {
//       if (obj.hasOwnProperty(oldName)) {
//         obj[newName] = obj[oldName];
//         delete obj[oldName];
//       }
//     }
//     if (typeof obj[newName] == "object") {
//       obj[newName] = camelCaseKeysToUnderscore(obj[newName]);
//     }
//   }
//   return obj;
// };

// const getSubPrice = (selector) => {
//   const title = selector.find(priceChildsTitlesPath.join(" > ")).text().trim();
//   const price = selector.find(priceAmountChildsPath.join(" > ")).text().trim();
//   const description = selector
//     .find(priceDescriptionChildsPath.join(" > "))
//     .text()
//     .trim();
//   return {
//     title,
//     price,
//     description: decamelize(description, ", "),
//   };
// };

// const linkPath = titlePath.concat(["a[class='a-link-normal a-text-normal']"]);

// const getBook = (selector, root) => {
//   const title = selector.find(titlePath.join(" > ")).text().trim();
//   const author = selector.find(authorPath.join(" > ")).text().trim();
//   const publishedAt = selector.find(releaseDatePath.join(" > ")).text().trim();
//   const image = selector.find(imagePath.join(" > ")).attr("src").trim();
//   let rate = selector.find(ratePath.join(" > ")).text().trim();
//   const url = baseUrl + selector.find(linkPath.join(" > ")).attr("href").trim();
//   if (rate.length) {
//     rate = {
//       score: rate.split(" stars ")[0] + " stars",
//       customersRate: rate.split(" stars ")[1],
//     };
//   }
//   const prices = [];

//   prices.push({
//     title: selector.find(firstPriceTitlePath.join(" > ")).text().trim(),
//     price: selector.find(firstPricePath.join(" > ")).text().trim(),
//     description: decamelize(
//       selector.find(firstPriceDescriptionPath.join(" > ")).text().trim(),
//       ", "
//     ),
//   });
//   const subPricesSelector = selector.find(priceChildsPath.join(" > "));
//   const subPrices = subPricesSelector
//     .map((i, el) => getSubPrice(root(el)))
//     .get();

//   for (const item of subPrices) {
//     prices.push(item);
//   }

//   return {
//     title,
//     author,
//     url,
//     image,
//     publishedAt,
//     prices: JSON.stringify(prices),
//     rate: rate.score || 0,
//     totalCustomerRate: rate.customersRate || 0,
//   };
// };

// const crawler = async (url, countTotal) => {
//   try {
//     const data = await fetchData(url);
//     const $ = cheerio.load(data);
//     if (countTotal) {
//       $("body")
//         .find(totalPages.join(" > "))
//         .each((i, el) => {
//           if (
//             $(el).text() &&
//             $(el).text() !== "←Previous" &&
//             $(el).text() !== "..."
//           )
//             total = parseInt($(el).text().trim());
//         });
//       total = total >= 30 ? 30 : total;
//     }
//     const selector = $("body").find(basePath.join(" > "));
//     return selector.map((i, el) => getBook($(el), $)).get();
//   } catch (err) {
//     return false;
//   }
// };

// const run = async () => {
//   let list = await db.categories.getAll();

//   for (const item of list) {
//     if (!item.done) {
//       for (let i = 1; i <= total; i++) {
//         const page = await crawler(
//           item.url.replace("fs=true&qid=", `fs=true&page=${i}&qid=`),
//           i === 1 ? true : false
//         );

//         if (page && page.length) {
//           for (const product of page) {
//             const input = {
//               ...camelToSnake({ ...product }),
//               category: item.name,
//               category_url: item.url.replace(
//                 "fs=true&qid=",
//                 `fs=true&page=${i}&qid=`
//               ),
//               page: i,
//               data: "",
//             };
//             await db.products.insert(input);
//           }
//         }
//       }
//       await db.categories.update(item.id, { done: true });
//       console.log(item);
//     }
//   }
// };

// run();
