import Services from "./components/Services";
import Products from "./components/Product"
import AboutCompany from "./components/AboutCompany";
import Portfolio from "./components/Portfolio";
import LocationMap from "./components/LocationMap";
import FAQ from "./components/faq";
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

export default function Home() {
  return (
    // div>
    // <div className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
    //   // style={{ backgroundImage: "url('/Grid.svg')" }}
    //   >
    // </div>
    //     <main>
    //       <Header />
    //       <HeroSection />
    //       <AboutUs />
    //       <QuestionSection />
    //       <Footer />
    //     </main>
    //   </div>

    <div>
      <div>
        <div>
          <main>
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
