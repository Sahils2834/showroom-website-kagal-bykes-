import ExploreSection from "../components/ExploreSection";
import FindYourRide from "../components/FindYourRide";

export default function ExplorePage() {
  return (
    <div className="bg-hero-dark min-h-screen pt-24">
      <FindYourRide />
      <ExploreSection />
    </div>
  );
}
