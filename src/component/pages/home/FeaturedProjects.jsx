// import media
import mythBusters from '../../../assets/project-assets/img/mythbusters.png';



function FeaturedProjects () {
    return (
        <section className="featured-projects grid grid-cols-12 col-span-12 border-3 border-black bg-white -mx-4 md:-mx-5 lg:-mx-6 h-[85vh] lg:grid-rows-[9rem_1fr] xl:grid-rows-1">

            {/* title — full width on md/lg, sidebar on xl */}
            <div className="col-span-12 xl:col-span-1 flex items-center justify-center p-8 border-b-3 border-black xl:border-b-0 xl:border-r-3 h-24 lg:h-36 xl:h-full">
                <h2 className="font-title text-h3 text-red whitespace-nowrap xl:-rotate-90">FEATURED PROJECTS</h2>
            </div>

            {/* project list — full width on md, 4 cols on lg, 3 cols on xl */}
            <div className="project-list col-span-12 lg:col-span-4 xl:col-span-3 p-8 border-b-3 border-black lg:border-b-0 lg:border-r-3 flex flex-col justify-between">
                <div className="project-item flex flex-col font-title text-h4 tracking-primary">
                    <h3>Project 1</h3>
                    <h3>Project 2</h3>
                    <h3>Project 3</h3>
                    <h3>Project 4</h3>
                </div>
                <button className='btn'>All Projects</button>
            </div>

            {/* media — full width on md, 8 cols on lg/xl */}
            <div className="media-container col-span-12 lg:col-span-8 h-full">
                <div className="media h-full">
                    <img src={mythBusters} alt="MythBusters" className="object-cover w-full h-full" />
                </div>
            </div>
        </section>
    )};

export default FeaturedProjects;
