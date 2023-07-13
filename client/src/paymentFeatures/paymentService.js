import axios from "axios";
import CryptoJS from "crypto-js";
const BaseURL = "https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg";

const step1 = async () => {
  // let header = {
  //   "Content-Type": "application/xml",
  //   changeOrigin: true,
  // };
  //   const response = await axios.get(BaseURL + "CheckCall", header);
  // const response = await axios.get("/api/cbebpg/CheckCall", header);
  // let header = {
  //   "Content-Type": "application/json",
  //   "Access-Control-Allow-Origin": " *",
  //   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //   "Access-Control-Allow-Headers": "Content-Type",
  // };
  // console.log("got here *******************************************");
  // const response = await axios.get(BaseURL + "/CheckCall", header);
  // console.log("got here response: ", response);
  // let data = await response.json();
  // console.log("got here ########################################");
  // console.log("the responsed: ", data);
  // return response;

  // try AXIOS

  // axios({
  //   method: "get",
  //   url: BaseURL + "/CheckCall",
  //   mode: "no-cors",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((response) => {
  //     console.log("the response: ", response);
  //   })
  //   .catch((error) => {
  //     console.log("the error is: ", error);
  //   });
};

const step2 = async () => {
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  let data = {
    tillCode: "005",
  };
  const response = await axios.post(BaseURL + "CheckMe", data, { header });
  return response.data;
};

const step3 = async () => {
  let iv = CryptoJS.enc.Hex.parse("0000000000000000");
  let key = CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916");
  let encryptedMsg = CryptoJS.AES.encrypt("CBE_School_Fee", key, {
    iv,
  }).toString();
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  let data = {
    MName: encryptedMsg,
    tillCode: "005",
  };
  const response = await axios.post(BaseURL + "CheckMeENC", data, header);
  return response.data;
};

const step4 = async () => {
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  const data = {
    tillCode: "005",
  };
  const response = await axios.post(BaseURL + "CheckMeDEC", data, header);
  return response.data;
};
const paymentService = {
  step1,
  step2,
  step3,
  step4,
};
export default paymentService;
