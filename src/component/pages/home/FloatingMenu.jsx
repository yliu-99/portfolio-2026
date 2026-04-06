import Energy from './home-menu-components/Energy';
import Status from './home-menu-components/Status';
import AboutMenu from './home-menu-components/AboutMenu';
import Obsessions from './home-menu-components/Obsessions';

function FloatingMenu() {
    return (
        <div className="absolute top-5 left-4 right-4 md:left-5 md:right-5 lg:left-16 lg:right-16 z-1 hidden md:flex items-start justify-center gap-[clamp(1rem,4vw,4rem)] max-[950px]:gap-[clamp(0px,1.5vw,1rem)]">
            <AboutMenu />
            <Energy />
            <Status />
            <Obsessions />
            
        </div>
    );
}

export default FloatingMenu;
