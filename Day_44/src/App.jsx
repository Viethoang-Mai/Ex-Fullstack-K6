import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import ClientsSection from "./Components/Clients/ClientsSection";
import SkillSection from "./Components/Skill/SkillSection";
import Project from "./Components/Project/Project";
import ResumeSection from "./Components/Resume/ResumeSection";
import Popular from "./Components/Popular/Popular";
import Contact from "./Components/Contact/Contact";
import Footer from "./Footer/Footer";
import LinkFixed from "./Components/LinkFixed/Link";
import ClientSay from "./Components/ClientSay/ClientSay";
export const App = () => {
    return (
        <>
            <Header />
            <Hero />
            <ClientsSection />
            <SkillSection />
            <Project />
            <ClientSay />
            <ResumeSection />
            <Popular />
            <Contact />
            <Footer />
            <LinkFixed />
        </>
    );
};
