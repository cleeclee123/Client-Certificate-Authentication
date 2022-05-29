const axios = require("axios");
const agent = require("./agent");

const serverUrl = "https://localhost:9999/authenticate";
let options = { httpsAgent: agent("alice") };

axios
  .get(serverUrl, options)
  .then((res) => {
    console.log(res.data);
  })
  .catch((err) => {
    console.error(err.response.data);
  });
