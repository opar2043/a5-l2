import Banner from "@/components/Layout/Banner";
import Navbar from "@/components/Layout/Navbar";
import AboutPage from "./About/page";
import GetToKnowUs from "@/components/Layout/Gettoknowus";

export default function Home() {
  return (
    <div className="">
    <Navbar />
    <Banner />
    <GetToKnowUs></GetToKnowUs>
    <AboutPage />
    </div>
  );
}
