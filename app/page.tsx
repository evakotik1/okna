import Services from "./components/Services";
import Products from "./components/Product"
import AboutCompany from "./components/AboutCompany";
import Portfolio from "./components/Portfolio";
import LocationMap from "./components/LocationMap";
import FAQ from "./components/faq";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Header from "./components/Header";

export default function Home() {
  return (
    <div>
      <div>
        <div>
          <main>
            <Header />
            <HeroSection />
            <Services />
            <Products />
            <AboutCompany />
            <Portfolio />
            <LocationMap/>
            <FAQ/>
            <Contacts/>
            <Footer/>
          </main>
        </div>
      </div>
    </div>
  );
}
