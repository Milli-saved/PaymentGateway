import axios from "axios";
const BaseURL = "https://cbebirrpaymentgateway.cbe.com.et:8888/api/cbebpg/";

const step1 = async () => {
  // axios
  //   .get(baseURL + "CheckCall")
  //   .then((response) => {
  //     status.step1 = true;
  //     res.status(200).json(response.data);
  //     console.log("the status is", response.data);
  //   })
  //   .catch((error) => {
  //     res.status(400).json(error);
  //   });
  const response = await axios.get(BaseURL + "CheckCall");
  return response.data;
};

const paymentService = {
  step1,
};
export default paymentService;
