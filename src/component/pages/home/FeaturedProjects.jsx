// import media
import mythBusters from '../../../assets/project-assets/img/mythbusters.png';



function FeaturedProjects () {
    return (
        <section className="featured-projects grid grid-cols-12 col-span-12 border-3 border-black bg-white -mx-4 md:-mx-5 lg:-mx-6">

            {/* vertical title */}
            <div className="col-span-1 flex items-center justify-center border-r-3 border-black p-8">
                <h2 className="font-title text-h3 text-red -rotate-90">FEATURED PROJECTS</h2>
            </div>

            {/* Cols 1–4 — project list */}
            <div className="project-list col-span-3 p-8 border-r-3 border-black">
                <div className="project-item flex flex-col  font-title text-h4 tracking-primary ">
                    <h3>Project 1</h3>
                    <h3>Project 2</h3>
                    <h3>Project 3</h3>
                    <h3>Project 4</h3>
                </div>
                <button className='all-projects-btn'>All Projects</button>
            </div>

            {/* Cols 5–12 — media */}
            <div className="media-container col-span-8">
                <div className="media">
                    <img src={mythBusters} alt="MythBusters" className="w-full h-full object-cover" />
                </div>
            </div>
        </section>
    )};

export default FeaturedProjects;
