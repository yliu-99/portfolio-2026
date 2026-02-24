import { useEffect } from 'react';

// import components
import HomeHero from './HomeHero';
import FeaturedProjects from './FeaturedProjects';

function Home () {
  return (
    <div className="home col-span-12">
      <HomeHero />
      <FeaturedProjects />
    </div>
  );
}

export default Home;