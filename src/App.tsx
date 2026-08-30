import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import LeafCursor from "./components/LeafCursor";
import About from "./pages/About";
import SaunaCollection from "./pages/SaunaCollection";
import SaunasCategory from "./pages/SaunasCategory";
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
import PageTransition from "./components/PageTransition";
import ComeMeetUs from "./pages/ComeMeetUs"
import SaunaModels from "./pages/SaunaModels";

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <LeafCursor />
      <ScrollToTop />
      <main className="flex-1">
        <PageTransition>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
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
            <Route path="/model/:model_name" element={<SaunaModels/>} />
            <Route path="/come-meet-us-at-upcoming-expos-sauna-events-in-2026" element={<ComeMeetUs/>} />         
         </Routes>
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}

export default App;