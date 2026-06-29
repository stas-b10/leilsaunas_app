import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts"
import LeafCursor from "./components/LeafCursor";
import About from "./pages/About";
import SaunaCollection from "./pages/SaunaCollection"
import Saunas from "./pages/Saunas"
import Footer from "./components/Footer";


function App() {
  return (
    <div className="animate-fade-in min-h-screen flex flex-col">
      <Navbar />
      <LeafCursor />
       <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/sauna-collection/:collection" element={<SaunaCollection />} />
        <Route path="/saunas" element={<Saunas />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
