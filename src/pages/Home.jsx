import CtaBlock from '../components/home/CtaBlock.jsx'
import Expertise from '../components/home/Expertise.jsx'
import FeaturedProjects from '../components/home/FeaturedProjects.jsx'
import Hero from '../components/home/Hero.jsx'
import Palmares from '../components/home/Palmares.jsx'

export default function Home() {
    return (
        <>
            <Hero />
            <Expertise />
            <FeaturedProjects />
            <Palmares />
            <CtaBlock />
        </>
    )
}
