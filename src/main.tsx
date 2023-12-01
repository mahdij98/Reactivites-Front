import ReactDOM from "react-dom/client";
import "./app/layout/style.css";
import App from "./app/layout/App";
import { StoreContext, store } from "./stores/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
);
