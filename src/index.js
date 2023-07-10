const express = require("express");
const cors = require("cors");
const axios = require("axios");
const CryptoJS = require("crypto-js");

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

app.get("/step2", (req, res) => {
  if (status.step1) {
    let data = {
      tillCode: "005",
    };
    const header = {
      "Content-Type": "application/json",
    };
    axios
      .post(baseURL + "CheckMe", data, { header })
      .then((response) => {
        status.step2 = true;
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(200).json({
      msg: "Step 1 is false.",
    });
  }
});

app.get("/step3", (req, res) => {
  if (status.step2) {
    let iv = CryptoJS.enc.Hex.parse("0000000000000000");
    let key = CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916");
    let encryptedMsg = CryptoJS.AES.encrypt("CBE_School_Fee", key, {
      iv,
    }).toString();
    let data = {
      MName: encryptedMsg,
      TillCode: "005",
    };
    axios
      .post(baseURL + "CheckMeENC", data)
      .then((response) => {
        if (response.data.startsWith("O")) {
          status.step3 = true;
        }
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } else {
    res.status(200).json({
      msg: "Step 2 is false.",
    });
  }
});

app.get("/step4", (req, res) => {
    let data = {
        TillCode: "005"
    }
    axios
      .post(baseURL + "CheckMeDEC", data)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
});

app.listen(4006, () => console.log("Server is running on port 4005"));
