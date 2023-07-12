import axios from "axios";
const BaseURL =
  "https://cors-anywhere.herokuapp.com/https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg/";

const step1 = async () => {
    let header = {
        "Content-Type": "application/xml",
        changeOrigin : true
    }
  const response = await axios.get(BaseURL + "CheckCall", header);
  return response.data;
};

const paymentService = {
  step1,
};
export default paymentService;
