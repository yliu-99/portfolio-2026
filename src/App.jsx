// importing dependencies
import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

// importing global components
import Header from './component/global/Header';
import Footer from './component/global/Footer';
import HamburgerMenu from './component/global/HambugerMenu';
import ContactModal from './component/global/ContactModal';
import { ContactModalProvider } from './context/ContactModalContext';

// importing page components
import Home from './component/pages/home/Home';
import About from './component/pages/about/About';
import Projects from './component/pages/projects/Projects';
import Playground from './component/pages/playground/Playground';

// importing styles

function Content() {
  // handle scroll to top on route change
  const location = useLocation();
    useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
       // create routes for each page
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
};

function App() {
  const gridRef = useRef(null);

  useEffect(() => {
    const tween = gsap.to(gridRef.current, {
      x: 40, y: 40,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
    return () => tween.kill();
  }, []);

  return (
    <ContactModalProvider>
      <Router>
        <div className="app flex flex-col min-h-screen">
          <div className="lg:hidden sticky top-0 z-40 bg-beige"><HamburgerMenu /></div>
          <div className="hidden lg:block sticky top-0 z-40 bg-beige"><Header /></div>
          <main className='main-content grid grid-cols-12 gap-4 px-4 md:px-5 lg:px-6 pt-16'>
            <div ref={gridRef} className="grid-bg" />
            <Content/>
          </main>
          <Footer />
          {/* Global contact modal — outside <main> so it escapes its stacking context */}
          <ContactModal />
        </div>
      </Router>
    </ContactModalProvider>
  );
}

export default App;
