import logo from "./logo.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import { createPaymentGateway1 } from "./paymentFeatures/paymentSlice";

function App() {
  const dispatch = useDispatch()
  const buttonHandler = () => {
    dispatch(createPaymentGateway1())
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={buttonHandler}
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
