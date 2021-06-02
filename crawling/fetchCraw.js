const { default: axios } = require("axios");

const fethHtml = async (url) => {
    try {
      const { data } = await axios.get(url);
      //   fs.writeFile("hellowrld.txt", data, function(err) {
      //     if(err) {
      //         return console.log(err);
      //     }
      //     console.log("The file was saved!");
      // });
      return data;
    } catch {
      console.error(
        `ERROR: An error occurred while trying to fetch the URL: ${url}`
        
      );
      return false;
    }
  };
  
module.exports = {fethHtml}
  