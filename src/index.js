const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

baseURL = "https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg/";

let status = {
  step1: false,
  step2: false,
  step3: false,
  step4: false,
};

app.get("/step1", (req, res) => {
  axios
    .get(baseURL + "CheckCall")
    .then((response) => {
      status.step1 = true;
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.listen(4006, () => console.log("Server is running on port 4005"));
