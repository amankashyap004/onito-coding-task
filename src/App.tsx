import { Provider } from "react-redux";
import { store } from "./store";

import TwoStepForm from "./components/TwoStepForm";
import "./App.css";

function App() {
  return (
    <main>
      <Provider store={store}>
        <TwoStepForm />
      </Provider>
    </main>
  );
}

export default App;
