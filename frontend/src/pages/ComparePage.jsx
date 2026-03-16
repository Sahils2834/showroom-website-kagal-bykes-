import BikeComparison from "../components/BikeComparison";

export default function ComparePage() {
  return (
    <div className="bg-hero-dark min-h-screen pt-24">
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-hero-red uppercase tracking-[0.3em] font-bold text-sm mb-3">
              Side by Side
            </h3>
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-4">
              Compare Bikes
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Select two bikes to compare specifications, pricing, and features side by side.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-hero-red to-transparent mx-auto mt-6" />
          </div>
          <BikeComparison />
        </div>
      </section>
    </div>
  );
}
