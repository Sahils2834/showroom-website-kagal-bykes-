import { useState, useEffect } from "react";
import { useBikes } from "../context/BikesContext";

export default function QuoteCalculator() {
  const { bikes } = useBikes();
  
  // Safe default initialization
  const initialBike = bikes && bikes.length > 0 ? bikes[0] : null;
  const [selectedBike, setSelectedBike] = useState(initialBike);
  const [downPayment, setDownPayment] = useState(initialBike ? (initialBike.price * 1.15) * 0.2 : 0);
  
  const [tenure, setTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(10);
  const [emi, setEmi] = useState(null);

  // Update selected default when bikes load asynchronously
  useEffect(() => {
    if (bikes && bikes.length > 0 && !selectedBike) {
      const firstBike = bikes[0];
      setSelectedBike(firstBike);
      setDownPayment((firstBike.price * 1.15) * 0.2);
    }
  }, [bikes, selectedBike]);

  if (!bikes || bikes.length === 0 || !selectedBike) {
    return <div className="bg-hero-dark rounded-xl shadow-2xl p-8 border border-white/5 text-white text-center">Loading Calculator...</div>;
  }

  // Calculate generic OnRoad price (15% tax/insurance)
  const onRoadPrice = selectedBike.onRoad || (selectedBike.price * 1.15);
  const loanAmount = onRoadPrice - downPayment;

  const handleCalculate = () => {
    const monthlyRate = interestRate / 100 / 12;
    if (monthlyRate === 0) {
      setEmi(loanAmount / tenure);
    } else {
      const emiValue = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                       (Math.pow(1 + monthlyRate, tenure) - 1);
      setEmi(emiValue);
    }
  };

  const handleBikeChange = (bikeId) => {
    const bike = bikes.find(b => b.id === Number(bikeId)) || bikes[0];
    const bikeOnRoad = bike.onRoad || (bike.price * 1.15);
    setSelectedBike(bike);
    setDownPayment(bikeOnRoad * 0.2);
    setEmi(null);
  };

  const totalAmount = emi ? Math.round(emi * tenure) : 0;
  const totalInterest = totalAmount - loanAmount;

  return (
    <div className="bg-hero-dark rounded-xl shadow-2xl p-8 md:p-12 border border-white/5 relative z-10 w-full">
      <div className="mb-10 text-center md:text-left">
        <h3 className="text-hero-red uppercase tracking-[0.2em] font-bold text-sm mb-2">Finance Your Ride</h3>
        <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight">
          Instant Quotation
        </h2>
        <p className="text-gray-400 mt-2 font-light">Calculate the approximate cost of your selected machine</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Section */}
        <div className="space-y-8">
          {/* Bike Selection */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
              Select Your Machine
            </label>
            <select
              value={selectedBike.id}
              onChange={(e) => handleBikeChange(e.target.value)}
              className="w-full bg-black border border-white/10 text-white p-4 rounded focus:outline-none focus:border-hero-red font-display uppercase tracking-wide transition-colors"
            >
              {bikes.map(bike => (
                <option key={bike.id} value={bike.id} className="bg-gray-800 text-white">
                  {bike.name} - ₹{(bike.price || 0).toLocaleString()}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-3 font-display tracking-widest uppercase">
              On-Road Estim: <span className="font-bold text-white">₹{Math.round(onRoadPrice).toLocaleString()}</span>
            </p>
          </div>

          {/* Down Payment */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white font-bold mb-3 flex justify-between">
              <span>Down Payment</span>
              <span className="text-hero-red">₹{Math.round(downPayment).toLocaleString()}</span>
            </label>
            <input
              type="range"
              min="0"
              max={onRoadPrice}
              value={downPayment}
              onChange={(e) => {
                setDownPayment(Number(e.target.value));
                setEmi(null);
              }}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-hero-red"
            />
            <p className="text-xs text-gray-500 mt-3 font-display tracking-widest uppercase flex justify-between">
              <span>Loan Amount</span>
              <span className="font-bold text-white">₹{Math.round(loanAmount).toLocaleString()}</span>
            </p>
          </div>

          {/* Tenure */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">
              Loan Tenure (Months)
            </label>
            <div className="grid grid-cols-5 gap-3">
              {[12, 24, 36, 48, 60].map(month => (
                <button
                  key={month}
                  onClick={() => {
                    setTenure(month);
                    setEmi(null);
                  }}
                  className={`py-3 rounded font-bold transition-all duration-300 font-display ${
                    tenure === month
                      ? "bg-hero-red text-white shadow-[0_0_15px_rgba(231,25,34,0.4)]"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-white font-bold mb-3 flex justify-between">
              <span>Interest Rate</span>
              <span className="text-hero-red">{interestRate}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              step="0.5"
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value));
                setEmi(null);
              }}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-hero-red"
            />
            <p className="text-xs text-gray-500 mt-3 font-light">Adjust based on your credit profile</p>
          </div>

          {/* Calculate Button */}
          <button
            onClick={handleCalculate}
            className="w-full bg-hero-red text-white px-6 py-4 rounded font-bold uppercase tracking-widest hover:bg-hero-red-light transition transform hover:-translate-y-1 shadow-lg shadow-hero-red/20"
          >
            Calculate Quotation
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-black/80 backdrop-blur-sm border border-white/10 text-white p-8 md:p-10 rounded-xl flex flex-col justify-center">
          <h3 className="text-xl font-display font-bold uppercase tracking-widest text-gray-300 border-b border-white/10 pb-4 mb-8">
            Quotation Summary
          </h3>

          {emi ? (
            <div className="space-y-6">
              <div className="bg-hero-gray/50 p-6 rounded border-l-4 border-hero-red relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-5 text-6xl">₹</div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2 font-bold">Monthly EMI</p>
                <p className="text-5xl font-display font-black text-white">
                  ₹{Math.round(emi).toLocaleString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-hero-gray/30 p-5 rounded border border-white/5">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Loan Amount</p>
                  <p className="text-xl font-display font-bold text-white">
                    ₹{Math.round(loanAmount).toLocaleString()}
                  </p>
                </div>
                <div className="bg-hero-gray/30 p-5 rounded border border-white/5">
                  <p className="text-gray-500 text-[10px] uppercase tracking-widest mb-1 font-bold">Down Payment</p>
                  <p className="text-xl font-display font-bold text-white">
                    ₹{Math.round(downPayment).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <p className="text-gray-400">Total Amount ({tenure} months)</p>
                  <p className="font-bold">₹{Math.round(totalAmount).toLocaleString()}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p className="text-gray-400">Total Interest</p>
                  <p className="font-bold text-hero-red">₹{Math.round(totalInterest).toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4">
                <button className="w-full bg-white text-black px-6 py-4 rounded font-bold uppercase tracking-widest hover:bg-gray-200 transition">
                  Apply for Finance
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 text-gray-500">
                <span className="text-2xl">—</span>
              </div>
              <p className="font-display uppercase tracking-widest text-lg text-white mb-2">Awaiting Parameters</p>
              <p className="text-sm text-gray-500 font-light max-w-[200px]">
                Adjust the values and calculate to generate your custom quotation
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}