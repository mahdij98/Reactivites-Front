import ReactDOM from "react-dom/client";
import "./app/layout/style.css";
import App from "./app/layout/App";
import { StoreContext, store } from "./stores/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>
);
