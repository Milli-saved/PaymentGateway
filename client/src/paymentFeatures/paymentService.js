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
  const ivv = CryptoJS.lib.WordArray.random(8);
  const securityKeyArray = CryptoJS.MD5(
    CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916")
  );

  // const toEncryptedArray = CryptoJS.enc.Utf8.parse("CBE_School_Fee");
  // const objTripleDESCryptoService = CryptoJS.TripleDES.encrypt(
  //   toEncryptedArray,
  //   securityKeyArray,
  //   {
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7,
  //     ivv,
  //   }
  // );

  // const value = objTripleDESCryptoService.toString();

  // console.log("the newly returned: ", objTripleDESCryptoService.toString());

  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  let data = {
    MName: "CBE_School_Fee",
    tillCode: "005",
  };
  const response = await axios.post("/api/cbebpg/CheckMeENC", data, header);

  let new_data = response.data.slice(3);
  console.log("response from the API: ", new_data)

  const decryptionProcess = CryptoJS.TripleDES.decrypt(
    new_data,
    securityKeyArray,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      ivv,
    }
  );
  let decryptedWord = CryptoJS.enc.Utf8.stringify(decryptionProcess);

  console.log(
    "the decryption process *****************: stringify: ",
    CryptoJS.enc.Utf8.stringify(decryptionProcess)
  );
  return decryptedWord;
};

const step4 = async () => {
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };

  const toEncryptedArray = CryptoJS.enc.Utf8.parse("CBE_School_Fee");
  const ivv = CryptoJS.lib.WordArray.random(8);
  const securityKeyArray = CryptoJS.MD5(
    CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916")
  );
  const decryptionProcess = CryptoJS.TripleDES.encrypt(
    toEncryptedArray,
    securityKeyArray,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      ivv,
    }
  );

  const value = decryptionProcess.toString();
  console.log("the value of value in S4: ", value);
  const data = {
    MName: value,
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
