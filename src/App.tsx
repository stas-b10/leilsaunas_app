import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts"
import LeafCursor from "./components/LeafCursor";
import About from "./pages/About";
import SaunaCollection from "./pages/SaunaCollection"
import Saunas from "./pages/Saunas"
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import News from "./pages/News";
import SeriesPage from "./pages/SeriesPage";


function App() {
  return (
    <div className="animate-fade-in min-h-screen flex flex-col">
      <Navbar />
      <LeafCursor />
       <ScrollToTop />
       <main className="flex-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About />} />
        <Route path="/news" element={<News/>} />
        <Route path="/sauna-collection/:slug" element={<SaunaCollection />} />
        <Route path="/sauna-category/:categorySlug" element={<Saunas />} />
        <Route path="/series/:slug" element={<SeriesPage />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
