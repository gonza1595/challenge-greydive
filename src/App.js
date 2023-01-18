import "./App.css";
import Home from "./Home/Home";
import Data from "./Data/Data";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/dataform/:id" element={<Data />} />
      </Routes>
    </div>
  );
}

export default App;
