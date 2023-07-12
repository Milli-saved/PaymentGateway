import axios from "axios";
import CryptoJS from "crypto-js";
const BaseURL =
  "https://cors-anywhere.herokuapp.com/https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg/";

const step1 = async () => {
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  const response = await axios.get(BaseURL + "CheckCall", header);
  return response.data;
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

const paymentService = {
  step1,
  step2,
  step3,
};
export default paymentService;
