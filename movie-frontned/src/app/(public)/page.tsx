import Banner from "@/components/Layout/Banner";

import GetToKnowUs from "@/components/Layout/Gettoknowus";
import AboutPage from "./about/page";

export default function Home() {
  return (
    <div className="">
      <Banner />
      <GetToKnowUs></GetToKnowUs>
      <AboutPage />
    </div>
  );
}
