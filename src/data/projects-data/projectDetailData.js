// ── Project Detail Data ───────────────────────────────────────────────────────
// Aggregates all individual project detail files into a single array.
// Import projectDetailData wherever you need to look up a project's full detail
// by slug, id, or any other field.
//
// Usage:
//   import { projectDetailData } from '../data/projects-data/projectDetailData';
//   const detail = projectDetailData.find(p => p.slug === slug);

import { mythbustersDetail }         from './individual-project-data/mythbusters';
import { trueHorizonsDetail }        from './individual-project-data/trueHorizons';
import { apexMountainBikesDetail }   from './individual-project-data/apexMountainBikes';
import { fableFragrancesDetail }     from './individual-project-data/fableFragrances';
import { vhsFilmFestivalDetail }     from './individual-project-data/vhsFilmFestival';
import { submarineCdBookletDetail }  from './individual-project-data/submarineCdBooklet';
// import { sectionMapDemoDetail }      from './individual-project-data/sectionMapDemo'; // local dev only — gitignored

export const projectDetailData = [
    submarineCdBookletDetail,
    mythbustersDetail,
    trueHorizonsDetail,
    apexMountainBikesDetail,
    fableFragrancesDetail,
    vhsFilmFestivalDetail,
    // sectionMapDemoDetail,
];
