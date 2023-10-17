import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import MainContent from "./pages/MainContent";
import Home from "./pages/Home";
import WorkContent from "./pages/WorkContent";
import NoPage from "./pages/NoPage";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainContent />}>
          <Route index element={<Home />} />
          <Route path="work/:contentId" element={<WorkContent />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
