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

  const toEncryptedArray = CryptoJS.enc.Utf8.parse("CBE_School_Fee");
  const ivv = CryptoJS.lib.WordArray.random(8); // Generate a random IV of 64 bits (8 bytes)
  const securityKeyArray = CryptoJS.MD5(CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916"));
  const objTripleDESCryptoService = CryptoJS.TripleDES.encrypt(toEncryptedArray, securityKeyArray, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
    ivv
  });
  
  const value = objTripleDESCryptoService.toString()



    console.log("the newly returned: ", objTripleDESCryptoService.toString())
    
    // console.log("the newly returned Dec: ", objTripleDESCryptoServiceDec.toString() == '')

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

  const toDecryptArray = new_data;
  console.log("tod arr: ", toDecryptArray)
  const securityKeyArrayDec = CryptoJS.MD5(CryptoJS.enc.Utf8.parse("b14ca5898a4e4133bbce2ea2315a1916"));
  const objTripleDESCryptoServiceDec = CryptoJS.TripleDES.decrypt(
    { value: toDecryptArray },
    securityKeyArrayDec,
    {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
      ivv
    }
    );
    console.log("the newly returned Dec TYPE: ",typeof objTripleDESCryptoServiceDec.toString())
    console.log("the newly returned Dec: ", objTripleDESCryptoServiceDec.toString() == '')

  // const decryptedMsg = CryptoJS.AES.decrypt(new_data, key, {
  //   iv,
  //   mode: CryptoJS.mode.ECB,
  //   padding: CryptoJS.pad.Pkcs7,
  // }).toString(CryptoJS.enc.Utf8);

  // console.log("decryptede message: ", decryptedMsg);
  //
  

  console.log(objTripleDESCryptoServiceDec.toString());
  console.log(CryptoJS.enc.Utf8.stringify(objTripleDESCryptoServiceDec));
  console.log(response.data);
};

// Encrypt plaintext using TripleDES with ECB mode and PKCS7 padding
 


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
