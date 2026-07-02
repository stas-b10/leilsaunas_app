import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts"
import LeafCursor from "./components/LeafCursor";
import About from "./pages/About";
import SaunaCollection from "./pages/SaunaCollection"
import SaunasCategory from "./pages/SaunasCategory"
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import News from "./pages/News";
import SeriesPage from "./pages/SeriesPage";
import AllSeriesPage from "./pages/AllSeriesPage";
import Faq from "./pages/Faq";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import SaunaCulture from "./pages/SaunaCulture";
import ColdFirst from "./pages/ColdFirst";
import PackingUp from "./pages/PackingUp";


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
        <Route path="/sauna-category/:categorySlug" element={<SaunasCategory />} />
        <Route path="/series/:slug" element={<SeriesPage />} />
        <Route path="/series" element={<AllSeriesPage />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/cold-first-then-heat" element={<ColdFirst />} />
        <Route path="/sauna-culture" element={<SaunaCulture />} />
        <Route path="/were-packing-up-our-saunas" element={<PackingUp />} />
      </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
