import axios from "axios";
import CryptoJS from "crypto-js";
// const BaseURL = "https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg";

const step1 = async () => {
  const response = await axios.get("/api/cbebpg/CheckCall", {});
  return response.data;
};

const step2 = async () => {
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  let data = {
    tillCode: "003",
  };
  const response = await axios.post("/api/cbebpg/CheckMe", data, {
    header,
  });
  return response.data;
};

const step3 = async () => {
  const iv = CryptoJS.lib.WordArray.random(8);
  const securityKeyArray = CryptoJS.MD5(
    CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916")
  );

  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };
  let data = {
    MName: "CBE School Fee",
    tillCode: "003",
  };
  const response = await axios.post("/api/cbebpg/CheckMeENC", data, header);

  let new_data = response.data.slice(3);
  console.log("response from the API: ", new_data);

  const decryptionProcess = CryptoJS.TripleDES.decrypt(
    new_data,
    securityKeyArray,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      iv,
    }
  );
  let decryptedWord = CryptoJS.enc.Utf8.stringify(decryptionProcess);

  console.log(
    "the decryption process *****************: stringify: ",
    CryptoJS.enc.Utf8.stringify(decryptionProcess)
  );

  //

  return decryptedWord;
};

const step4 = async () => {
  let header = {
    "Content-Type": "application/xml",
    changeOrigin: true,
  };

  // ENCRYPTION PROCESS
  const toEncryptedArray = CryptoJS.enc.Utf8.parse("CBE School Fee");
  const iv = CryptoJS.lib.WordArray.random(8);
  const securityKeyArray = CryptoJS.MD5(
    CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916")
  );
  const encryptionProcess = CryptoJS.TripleDES.encrypt(
    toEncryptedArray,
    securityKeyArray,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      iv,
    }
  );

  const value = encryptionProcess.toString();

  // console.log("stringfied2, ", CryptoJS.enc.Utf8.stringify(encryptionProcess));
  // console.log("to string(), ", encryptionProcess.toString());

  const data = {
    MName: value,
    tillCode: "001",
  };
  const response = await axios.post("/api/cbebpg/CheckMeDEC", data, header);

  // DECRYPTION PROCESS
  let new_data = response.data;
  const decryptionProcess = CryptoJS.TripleDES.decrypt(
    new_data,
    securityKeyArray,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      iv,
    }
  );
  let decryptedWord = CryptoJS.enc.Utf8.stringify(decryptionProcess);

  return decryptedWord;
};
const paymentService = {
  step1,
  step2,
  step3,
  step4,
};
export default paymentService;
