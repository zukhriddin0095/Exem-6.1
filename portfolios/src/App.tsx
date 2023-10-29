import { Fragment } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PortfoliosPage from "./pages/PortfoliosPage";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfoliosPage />} />
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
