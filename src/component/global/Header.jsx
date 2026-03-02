// import dependencies
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import LogoFull from '../../assets/global-assets/logo-main.png';
import { useLogoRotation } from '../../hooks/useLogoRotation';
import { useContactModal } from '../../context/ContactModalContext';

// import styles
import './Header.scss';

function Header() {
  const logoRef    = useRef(null);
  const logoImgRef = useRef(null);
  const { openContact } = useContactModal();

  useEffect(() => {
    gsap.set(logoRef.current, { y: '2rem' });
  }, []);

  useLogoRotation(logoImgRef);

  return (
    <header className="header ">
      <div className="header-content">
        <div className="nav-items">
            <ul className='font-title text-blue uppercase text-h4 h-18 pl-12 pr-12 grid grid-cols-[1fr_auto_1fr] items-center border-b-3 border-red'>
                <li>
                    <ul className='grid grid-cols-2'>
                        <li className='flex justify-center'><Link to="/about">About Me</Link></li>
                        <li className='flex justify-center'><Link to="/projects">Projects</Link></li>
                    </ul>
                </li>
                <li ref={logoRef} className='home-logo flex justify-center px-10'>
                    <Link to="/"><img ref={logoImgRef} src={LogoFull} alt="Logo" className="logo-img max-w-16"/></Link>
                </li>
                <li>
                    <ul className='grid grid-cols-2'>
                        <li className='flex justify-center'><Link to="/playground">Playground</Link></li>
                        <li className='flex justify-center'><button onClick={openContact} className="contact-nav-btn">Contact</button></li>
                    </ul>
                </li>
            </ul>
        </div>

      </div>
    </header>
  );
}

export default Header;