import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts"
import LeafCursor from "./components/LeafCursor";
import About from "./pages/About";


function App() {
  return (
    <div className="animate-fade-in min-h-screen bg-[#223300] flex-1 flex flex-col">
      <Navbar />
      <LeafCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
