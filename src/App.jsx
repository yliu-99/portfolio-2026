// importing dependencies
import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';

// importing global components
import Footer from './component/global/Footer';
import HamburgerMenu from './component/global/HambugerMenu';
import ContactModal from './component/global/ContactModal';
import ScrollWidget from './component/global/ScrollUp';
import { ContactModalProvider } from './context/ContactModalContext';

// importing page components
import Home from './component/pages/home/Home';
import About from './component/pages/about/About';
import Projects from './component/pages/projects/Projects';
import ProjectDetails from './component/pages/project-details/ProjectDetails';
import Playground from './component/pages/playground/Playground';

// Prevent the browser from restoring the previous scroll position on navigation —
// our own scrollTo(0,0) handles it and must not be overridden by the browser.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function Content() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    AOS.refresh();
  }, [location.pathname]);
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/:slug" element={<ProjectDetails />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}

function GridBg() {
  const gridRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const tween = gsap.to(gridRef.current, {
      x: 40, y: 40,
      duration: 20,
      ease: "none",
      repeat: -1,
    });
    return () => tween.kill();
  }, []);

  return <div ref={gridRef} className={`grid-bg transition-opacity duration-500 ${isHome ? 'opacity-100' : 'opacity-30'}`} />;
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <ContactModalProvider>
      <Router>
        <div className="app flex flex-col min-h-screen">
          <div className="nav-wrapper fixed top-0 inset-x-0 z-40"><HamburgerMenu /></div>
          <main className='main-content grid grid-cols-12 gap-4 px-4 md:px-5 lg:px-16 pt-23'>
            <GridBg />
            <Content/>
          </main>
          <Footer />
          {/* Global contact modal — outside <main> so it escapes its stacking context */}
          <ContactModal />
          {/* Fixed scroll-to-top + contact widget */}
          <ScrollWidget />
        </div>
      </Router>
    </ContactModalProvider>
  );
}

export default App;
