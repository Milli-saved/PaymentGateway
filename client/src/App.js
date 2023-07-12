import logo from "./logo.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import {
  createPaymentGateway1,
  createPaymentGateway2,
} from "./paymentFeatures/paymentSlice";

function App() {
  const dispatch = useDispatch();
  const buttonHandler1 = () => {
    dispatch(createPaymentGateway1());
  };
  const buttonHandler2 = () => {
    dispatch(createPaymentGateway2());
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
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
      </header>
    </div>
  );
}

export default App;
