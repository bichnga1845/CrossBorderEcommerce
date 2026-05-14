import Hero from "@/components/home/Hero";
import TrustIndicators from "@/components/home/TrustIndicators";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import GiftBoxes from "@/components/home/GiftBoxes";
import Traceability from "@/components/home/Traceability";
import Testimonials from "@/components/home/Testimonials";
import Gallery from "@/components/home/Gallery";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <Categories />
      <BestSellers />
      <GiftBoxes />
      <Traceability />
      <Testimonials />
      <Gallery />
    </>
  );
}
