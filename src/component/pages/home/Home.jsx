import { useEffect } from 'react';

// import components
import HomeHero from './HomeHero';
import FeaturedProjects from './FeaturedProjects';

function Home () {
  return (
    <div className="home col-span-full">
      <HomeHero />
      <FeaturedProjects />
    </div>
  );
}

export default Home;