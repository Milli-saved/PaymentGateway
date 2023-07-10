const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

baseURL = "https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg/";

app.get("/step1", (req, res) => {
  axios
    .get(baseURL + "CheckCall")
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.listen(4006, () => console.log("Server is running on port 4005"));
