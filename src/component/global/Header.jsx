// import dependencies
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import LogoFull from '../../assets/global-assets/logo-full.png';

// import styles
import './Header.scss';

function Header() {
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.set(logoRef.current, { y: '2rem' });
  }, []);

  return (
    <header className="header ">
      <div className="header-content">
        <div className="nav-items">
            <ul className='font-title text-blue uppercase text-h4 h-18 pl-12 pr-12 grid grid-cols-[1fr_auto_1fr] items-center border-b-3 border-red'>
                <li>
                    <ul className='grid grid-cols-2'>
                        <li className='flex justify-center'><a href="/about">About Me</a></li>
                        <li className='flex justify-center'><a href="/projects">Projects</a></li>
                    </ul>
                </li>
                <li ref={logoRef} className='home-logo flex justify-center px-10'>
                    <a href="/"><img src={LogoFull} alt="Logo" className="logo-img max-w-16"/></a>
                </li>
                <li>
                    <ul className='grid grid-cols-2'>
                        <li className='flex justify-center'><a href="/playground">Playground</a></li>
                        <li className='flex justify-center'><a href="/contact">Contact</a></li>
                    </ul>
                </li>
            </ul>
        </div>

      </div>
    </header>
  );
}

export default Header;