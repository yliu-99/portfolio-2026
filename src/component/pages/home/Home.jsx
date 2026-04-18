import { lazy, Suspense } from 'react';
import HomeHero from './HomeHero';
import SEO from '../../SEO/SEO';

// FeaturedProjects is below the fold — code-split so it doesn't block the hero
const FeaturedProjects = lazy(() => import('./FeaturedProjects'));

// ── Skeleton shown while the FeaturedProjects chunk downloads ────────────────
function FeaturedProjectsSkeleton() {
  return (
    <section className="col-span-12 -mx-4 md:-mx-5 lg:-mx-16 border-t-3 border-black mt-16">
      {[0, 1, 2].map(i => (
        <div key={i} className="w-full aspect-video bg-black/6 border-b-[3px] border-black animate-pulse" />
      ))}
    </section>
  );
}

function Home() {
  return (
    <div className="home col-span-12">
      <SEO
        title="Yuhan Liu | Multidisciplinary Designer in Vancouver"
        canonicalUrl="/"
      />
      <h1 className="sr-only">Yuhan Liu — Multidisciplinary Designer in Vancouver</h1>
      <HomeHero />
      <Suspense fallback={<FeaturedProjectsSkeleton />}>
        <FeaturedProjects />
      </Suspense>
    </div>
  );
}

export default Home;
