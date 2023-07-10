const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

baseURL = "https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg/";



app.listen(4006, () => console.log("Server is running on port 4005"));
