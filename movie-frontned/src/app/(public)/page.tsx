import Banner from "@/src/app/components/Layout/Banner";

import GetToKnowUs from "@/src/app/components/Layout/Gettoknowus";
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
