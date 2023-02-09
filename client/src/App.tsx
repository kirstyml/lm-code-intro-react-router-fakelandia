import { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import SiteRouter from "./router"

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <SiteRouter />
      </BrowserRouter>
    </>
  )
}

export default App
