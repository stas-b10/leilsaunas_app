import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LeafCursor from "./components/LeafCursor";


function App() {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      <LeafCursor />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
