import axios from "axios";
import CryptoJS from "crypto-js";
const BaseURL = "https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg";

const step1 = async () => {
  const response = await axios.get("/api/cbebpg/CheckCall", {});
  // let data = await response.json();
  // console.log("get here rsponse: ", data);
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
  const response = await axios.post("/api/cbebpg/CheckMe", data, {
    header,
  });
  return response.data;
};

const step3 = async () => {
  let iv = CryptoJS.enc.Hex.parse("0000000000000000");
  let key = CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916");
  let encryptedMsg = CryptoJS.AES.encrypt("CBE_School_Fee", key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  console.log("the encrypted message: ", encryptedMsg);
  let data = {
    MName: "CBE_School_Fee",
    tillCode: "005",
  };
  const response = await axios.post("/api/cbebpg/CheckMeENC", data, header);

  console.log(response.data.slice(3));
  let new_data = response.data.slice(3);
  const decryptedMsg = CryptoJS.AES.decrypt(new_data, key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);

  console.log("decryptede message: ", decryptedMsg);
  //
  return response.data;
};

const step4 = async () => {
  let iv = CryptoJS.enc.Hex.parse("0000000000000000");
  let key = CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916");
  let encryptedMsg = CryptoJS.AES.encrypt("CBE_School_Fee", key, {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  const data = {
    MName: encryptedMsg,
    tillCode: "005",
  };
  const response = await axios.post("/api/cbebpg/CheckMeDEC", data, header);
  return response.data;
};
const paymentService = {
  step1,
  step2,
  step3,
  step4,
};
export default paymentService;
