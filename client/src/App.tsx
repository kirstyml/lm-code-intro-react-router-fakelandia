import { BrowserRouter } from "react-router-dom";
import SiteRouter from "./router";
import { MisdemeanoursProvider } from "./context/misdemeanour_provider";

import './App.css'

function App() {
  return (
    <>
      <MisdemeanoursProvider>
        <BrowserRouter>
          <SiteRouter />
        </BrowserRouter>
      </MisdemeanoursProvider>
    </>
  )
}

export default App
