// importing dependencies
import React, { use } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

// importing global components
import Header from './component/global/Header';
import Footer from './component/global/Footer';
import HamburgerMenu from './component/global/HambugerMenu';

// importing page components
import Home from './component/pages/home/Home';
import About from './component/pages/about/About';
import Projects from './component/pages/projects/Projects';
import Contact from './component/pages/contact/Contact';
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
      <Route path="/contact" element={<Contact />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
};

function App() {

  // setup state for hamburger menu
  // const [showHamburger, setShowHamburger] = useState(false);


  // useEffect(() => {
  //   // Show hamburger menu on mobile devices
  //   const handleResize = () => {
  //     if (window.innerWidth < 768) {
  //       setShowHamburger(true);
  //     } else {
  //       setShowHamburger(false);
  //     }
  //   };
  //   handleResize();
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);



  return (
    <Router>
      <div className="app flex flex-col min-h-screen">
        <div className="lg:hidden"><HamburgerMenu /></div>
        <div className="hidden lg:block"><Header /></div>
        <main className='main-content grid grid-cols-12 gap-4 px-4 md:px-5 lg:px-6 pt-16'>
          <Content/>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
