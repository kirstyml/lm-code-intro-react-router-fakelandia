import { BrowserRouter } from "react-router-dom";
import SiteRouter from "./router";
import { MisdemeanoursProvider } from "./context/misdemeanour_provider";

import "./App.scss";

function App() {
  return (
    <>
      <MisdemeanoursProvider>
        <BrowserRouter>
          <SiteRouter />
        </BrowserRouter>
      </MisdemeanoursProvider>
    </>
  );
}

export default App;
