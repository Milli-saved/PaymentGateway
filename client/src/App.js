import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentGateway1,
  createPaymentGateway2,
  createPaymentGateway3,
  createPaymentGateway4,
} from "./paymentFeatures/paymentSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { step, msg } = useSelector((state) => state.payment);
  useEffect(() => {
    if (step === 0) {
      dispatch(createPaymentGateway1());
    } else if (step === 1) {
      dispatch(createPaymentGateway2());
    } else if (step === 2) {
      dispatch(createPaymentGateway3());
    } else if (step === 3) {
      dispatch(createPaymentGateway4());
    }
  }, [step, dispatch]);
  // const buttonHandler1 = () => {
  //   dispatch(createPaymentGateway1());
  // };
  // const buttonHandler2 = () => {
  //   dispatch(createPaymentGateway2());
  // };
  // const buttonHandler3 = () => {
  //   dispatch(createPaymentGateway3());
  // };
  // const buttonHandler4 = () => {
  //   dispatch(createPaymentGateway4());
  // };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>step : {step}</p>
        <p>The message from the gate way</p>
        <p>{msg}</p>
        {/* <button
          onClick={buttonHandler1}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Step 1
        </button>
        <button
          onClick={buttonHandler2}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Step 2
        </button>
        <button
          onClick={buttonHandler3}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Step 3
        </button>
        <button
          onClick={buttonHandler4}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Step 4
        </button> */}
      </header>
    </div>
  );
}

export default App;
