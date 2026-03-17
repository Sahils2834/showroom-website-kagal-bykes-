import { useState } from "react";
import { bikesData, financeOptions } from "../data/bikesData";
import { FaCheck, FaCalculator, FaPercent, FaCalendarAlt, FaMotorcycle } from "react-icons/fa";

export default function Finance() {
  const [selectedBike, setSelectedBike] = useState(bikesData[0]);
  const [loanAmount, setLoanAmount] = useState(selectedBike.onRoad);
  const [tenure, setTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(10);

  // Calculate EMI
  const monthlyRate = interestRate / 100 / 12;
  const emi = monthlyRate === 0 
    ? loanAmount / tenure 
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);

  return (
    <div className="bg-hero-dark min-h-screen pt-32 pb-20 text-white">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-left">
        <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter mb-4 text-white">
          Easy Finance <span className="text-hero-red">Options</span>
        </h1>
        <p className="text-xl text-gray-400 font-light max-w-2xl">
          Affordable bike ownership with flexible payment plans designed to fit your lifestyle.
        </p>
      </div>

      {/* Finance Partner Cards */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {financeOptions.map((option) => (
            <div 
              key={option.id} 
              className="group relative bg-hero-gray/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-hero-red/50 transition-all duration-500 shadow-2xl overflow-hidden flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-black uppercase tracking-tight text-white group-hover:text-hero-red transition-colors">
                      {option.name}
                    </h3>
                    <p className="text-hero-red text-xs font-bold uppercase tracking-widest mt-1">
                      {option.provider}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm font-light leading-relaxed mb-8 h-12">
                  {option.description}
                </p>

                {/* Interest & Tenure Stats */}
                <div className="grid grid-cols-2 gap-px bg-white/5 rounded-xl overflow-hidden mb-8 border border-white/5">
                  <div className="bg-hero-dark/50 p-4">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Interest Rate</p>
                    <p className="text-xl font-display font-black text-hero-red">{option.interest}</p>
                  </div>
                  <div className="bg-hero-dark/50 p-4">
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest mb-1">Tenure</p>
                    <p className="text-xl font-display font-black text-hero-red">{option.tenure}</p>
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-grow">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4 flex items-center gap-2">
                    <span className="w-4 h-[1px] bg-hero-red"></span>
                    Key Features
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {option.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-300 flex items-center gap-3">
                        <FaCheck className="text-hero-red text-[10px]" />
                        <span className="font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-hero-red hover:bg-hero-red-light text-white font-display font-bold uppercase tracking-widest py-4 rounded-xl transition-all duration-300 transform active:scale-95 shadow-[0_0_20px_rgba(231,25,34,0.3)]">
                  Apply Now
                </button>
              </div>

              {/* Background Accent */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-hero-red/10 rounded-full blur-3xl group-hover:bg-hero-red/20 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* EMI Calculator Section */}
      <section id="finance" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hero-red/30 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left: Inputs */}
            <div className="w-full lg:w-1/2">
              <div className="mb-12">
                <span className="text-hero-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Calculator</span>
                <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter">
                  Check Your <span className="text-hero-red">EMI</span>
                </h2>
              </div>

              <div className="space-y-8 bg-hero-gray/30 p-8 rounded-3xl border border-white/5">
                {/* Bike Selection */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">Select Your Motorcycle</label>
                  <div className="relative">
                    <select
                      value={selectedBike.id}
                      onChange={(e) => {
                        const bike = bikesData.find(b => b.id === Number(e.target.value));
                        setSelectedBike(bike);
                        setLoanAmount(bike.onRoad);
                      }}
                      className="w-full bg-hero-dark border border-white/10 text-white p-4 rounded-2xl focus:border-hero-red outline-none transition-all appearance-none font-bold"
                    >
                      {bikesData.map(bike => (
                        <option key={bike.id} value={bike.id}>
                          {bike.name} (Ex-showroom: ₹{bike.price.toLocaleString()})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-hero-red">
                      <FaMotorcycle />
                    </div>
                  </div>
                </div>

                {/* Loan Amount Range */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">Loan Amount</label>
                    <span className="text-2xl font-display font-black text-white italic">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max={selectedBike.onRoad}
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-hero-red h-1.5 bg-white/10 rounded-lg cursor-pointer appearance-none"
                  />
                  <div className="flex justify-between text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                    <span>₹10,000</span>
                    <span>Max: ₹{selectedBike.onRoad.toLocaleString()}</span>
                  </div>
                </div>

                {/* Tenure Selection */}
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">Repayment Period (Months)</label>
                  <div className="grid grid-cols-5 gap-3">
                    {[12, 24, 36, 48, 60].map(t => (
                      <button
                        key={t}
                        onClick={() => setTenure(t)}
                        className={`py-3 rounded-xl font-display font-black text-sm transition-all duration-300 border ${
                          tenure === t
                            ? "bg-hero-red border-hero-red text-white shadow-[0_0_15px_rgba(231,25,34,0.4)]"
                            : "bg-hero-dark border-white/10 text-gray-400 hover:border-hero-red/50 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate */}
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block ml-1">Interest Rate (p.a)</label>
                    <span className="text-2xl font-display font-black text-white italic">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="7"
                    max="18"
                    step="0.5"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-hero-red h-1.5 bg-white/10 rounded-lg cursor-pointer appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Right: Results Card */}
            <div className="w-full lg:w-1/2 lg:mt-24">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-hero-red to-red-800 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                
                <div className="relative bg-[#0d0d0d] p-10 rounded-3xl border border-white/5 space-y-10">
                  <div className="flex items-center gap-4 text-hero-red">
                    <FaCalculator className="text-2xl" />
                    <h3 className="text-xl font-display font-black uppercase tracking-widest">EMI Breakdown</h3>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-between items-center border-b border-white/5 pb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-hero-red"></div>
                        <span className="text-sm text-gray-400 uppercase font-bold tracking-widest">Monthly EMI</span>
                      </div>
                      <span className="text-4xl md:text-5xl font-display font-black text-white italic">₹{Math.round(emi).toLocaleString()}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] block">Total Interest</span>
                        <span className="text-2xl font-display font-black text-red-500">₹{Math.round((emi * tenure) - loanAmount).toLocaleString()}</span>
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.2em] block">Total Payable</span>
                        <span className="text-2xl font-display font-black text-white">₹{Math.round(emi * tenure).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="bg-hero-gray/50 p-6 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-hero-red/10 flex items-center justify-center text-hero-red">
                          <FaMotorcycle />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Model Selection</p>
                          <h4 className="font-display font-black text-white uppercase">{selectedBike.name}</h4>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">On-road Price:</span>
                        <span className="text-white font-bold">₹{selectedBike.onRoad.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-white text-black font-display font-black uppercase tracking-widest py-5 rounded-2xl hover:bg-hero-red hover:text-white transition-all duration-300">
                    Get Best Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-hero-red font-bold uppercase tracking-[0.3em] text-xs mb-4 block underline underline-offset-8">Advantages</span>
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase italic tracking-tighter">
            Why Finance with <span className="text-hero-red">Kagal Bykes?</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Quick Approval", 
              desc: "Get your loan sanctioned within 24 hours with minimum hussle.",
              icon: "24h",
              color: "text-blue-500"
            },
            { 
              title: "Flexible Terms", 
              desc: "Choose from a wide ranges of repayment tenures from 12 to 60 months.",
              icon: "12-60",
              color: "text-green-500"
            },
            { 
              title: "Low Interest", 
              desc: "Benefit from our tied-up partners offering the lowest market rates.",
              icon: "%",
              color: "text-hero-red"
            }
          ].map((benefit, i) => (
            <div key={i} className="bg-hero-gray/30 p-10 rounded-3xl border border-white/5 text-center group hover:border-hero-red/30 transition-all duration-500">
              <div className={`text-4xl font-display font-black mb-6 ${benefit.color} italic group-hover:scale-110 transition-transform`}>
                {benefit.icon}
              </div>
              <h3 className="text-xl font-display font-black uppercase tracking-tight mb-4 text-white">{benefit.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-hero-gray/20 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-4">
              Common <span className="text-hero-red">Questions</span>
            </h2>
          </div>

          <div className="space-y-6">
            {[
              { q: "What documents are required for financing?", a: "Minimum documentation is needed: Proof of Identity (Aadhaar, PAN), Address Proof, and Income Proof (for certain schemes)." },
              { q: "Can I get 100% on-road financing?", a: "Yes, many of our partners offer up to 100% financing on the on-road price for qualified customers." },
              { q: "Is there any hidden processing fee?", a: "Absolutely not. We maintain 100% transparency. All charges are communicated upfront during the application." }
            ].map((faq, i) => (
              <div key={i} className="bg-hero-dark p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-all">
                <h3 className="text-lg font-display font-black uppercase tracking-tight text-white mb-3 flex items-center gap-4">
                  <span className="text-hero-red">Q.</span> {faq.q}
                </h3>
                <p className="text-gray-400 font-light pl-8 border-l border-hero-red/30 leading-relaxed italic">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-gradient-to-br from-hero-red to-[#900] p-12 md:p-20 rounded-[3rem] text-center shadow-[0_0_50px_rgba(231,25,34,0.2)] relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase italic tracking-tighter mb-8 text-white">
              Ready to Drive Your <br className="hidden md:block"/> <span className="text-black/30">Dream Bike?</span>
            </h2>
            <p className="text-white/80 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Experience the power of Hero MotoCorp with our hassle-free financing solutions. Your adventure begins here.
            </p>
            <button className="bg-white text-hero-red hover:bg-black hover:text-white px-12 py-5 rounded-2xl font-display font-black uppercase tracking-widest text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Get Started Now
            </button>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-1000"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] -ml-48 -mb-48 group-hover:scale-110 transition-transform duration-1000"></div>
        </div>
      </div>

    </div>
  );
}