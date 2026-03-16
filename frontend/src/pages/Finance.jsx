import { useState } from "react";
import { bikesData, financeOptions } from "../data/bikesData";

export default function Finance(){
  const [selectedBike, setSelectedBike] = useState(bikesData[0]);
  const [loanAmount, setLoanAmount] = useState(selectedBike.onRoad);
  const [tenure, setTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(10);

  // Calculate EMI
  const monthlyRate = interestRate / 100 / 12;
  const emi = monthlyRate === 0 
    ? loanAmount / tenure 
    : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);

  return(
    <div className="bg-gray-50 min-h-screen pt-24 pb-10">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Easy Finance Options</h1>
        <p className="text-xl text-gray-600">Affordable bike ownership with flexible payment plans</p>
      </div>

      {/* Finance Options Cards */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {financeOptions.map((option) => (
            <div key={option.id} className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-red-500 hover:shadow-2xl transition">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.logo} {option.name}</h3>
              <p className="text-sm text-gray-600 mb-4 font-semibold">{option.provider}</p>
              <p className="text-gray-700 mb-6">{option.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-y">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Interest Rate</p>
                  <p className="text-lg font-bold text-red-500">{option.interest}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tenure</p>
                  <p className="text-lg font-bold text-red-500">{option.tenure}</p>
                </div>
              </div>

              <h4 className="font-bold text-gray-900 mb-3">Key Features:</h4>
              <ul className="space-y-2 mb-6">
                {option.features.map((feature, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-center">
                    <span className="text-red-500 mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-red-500 text-white px-4 py-3 rounded-lg font-bold hover:bg-red-600 transition transform hover:scale-105">
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EMI Calculator */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-12 rounded-xl">
          <h2 className="text-4xl font-bold mb-8 text-center">EMI Calculator</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Calculator Inputs */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Select Bike</label>
                <select
                  value={selectedBike.id}
                  onChange={(e) => {
                    const bike = bikesData.find(b => b.id === Number(e.target.value));
                    setSelectedBike(bike);
                    setLoanAmount(bike.onRoad);
                  }}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border border-gray-600"
                >
                  {bikesData.map(bike => (
                    <option key={bike.id} value={bike.id}>
                      {bike.name} - ₹{bike.onRoad.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Loan Amount (₹)</label>
                <input
                  type="range"
                  min="0"
                  max={selectedBike.onRoad}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-2xl font-bold text-red-500 mt-2">
                  ₹{loanAmount.toLocaleString()}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Tenure (Months)</label>
                <div className="flex gap-2">
                  {[12, 24, 36, 48, 60].map(t => (
                    <button
                      key={t}
                      onClick={() => setTenure(t)}
                      className={`flex-1 py-2 rounded-lg font-bold transition ${
                        tenure === t
                          ? "bg-red-500 text-white"
                          : "bg-gray-700 text-white hover:bg-gray-600"
                      }`}
                    >
                      {t}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Interest Rate (%)</label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-lg font-bold text-amber-400 mt-2">
                  {interestRate}% per annum
                </div>
              </div>
            </div>

            {/* EMI Results */}
            <div className="bg-gray-800 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-8">Your EMI Details</h3>
              
              <div className="space-y-6">
                <div className="border-b border-gray-700 pb-4">
                  <p className="text-gray-400 text-sm mb-1">Monthly EMI</p>
                  <p className="text-4xl font-bold text-green-400">
                    ₹{Math.round(emi).toLocaleString()}
                  </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <p className="text-gray-400 text-sm mb-1">Total Amount</p>
                  <p className="text-2xl font-bold text-white">
                    ₹{Math.round(emi * tenure).toLocaleString()}
                  </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <p className="text-gray-400 text-sm mb-1">Total Interest</p>
                  <p className="text-2xl font-bold text-red-400">
                    ₹{Math.round((emi * tenure) - loanAmount).toLocaleString()}
                  </p>
                </div>

                <div className="bg-gray-700 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm mb-2">Bike Details</p>
                  <p className="font-bold text-white">{selectedBike.name}</p>
                  <p className="text-gray-300 text-sm">On-Road: ₹{selectedBike.onRoad.toLocaleString()}</p>
                </div>

                <button className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition mt-6">
                  Apply for Finance
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Finance Process */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Choose Your Bike</h3>
            <p className="text-gray-600 text-sm">Select from our collection of bikes</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Choose Finance Option</h3>
            <p className="text-gray-600 text-sm">Pick your preferred lender</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Submit Documents</h3>
            <p className="text-gray-600 text-sm">Provide KYC and financial documents</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              4
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Get Approval</h3>
            <p className="text-gray-600 text-sm">Quick approval & bike delivery</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Finance Benefits</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Approval</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ 24-hour approval</li>
              <li>✓ Minimal documentation</li>
              <li>✓ Online application</li>
              <li>✓ Same-day disbursement</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-green-500">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Terms</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ 12-60 month tenure</li>
              <li>✓ Competitive interest rates</li>
              <li>✓ No hidden charges</li>
              <li>✓ Easy EMI options</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl shadow-lg border-l-4 border-purple-500">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Security & Trust</h3>
            <ul className="space-y-2 text-gray-700">
              <li>✓ Secure transactions</li>
              <li>✓ Data protection</li>
              <li>✓ Insurance coverage</li>
              <li>✓ Legal compliance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {[
            { q: "What documents do I need for bike finance?", a: "You need ID proof, address proof, income proof (salary slip or ITR), and bank statements for the last 6 months." },
            { q: "How long does the approval process take?", a: "Our in-house finance can approve within 24 hours, while bank financing takes 3-5 business days." },
            { q: "Can I pay off the loan early?", a: "Yes, you can pay off the entire loan early without any prepayment penalties." },
            { q: "What is the maximum loan tenure available?", a: "We offer financing from 12 months to 60 months based on your bike selection and financial profile." }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
              <p className="text-gray-700">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-12 rounded-xl text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Finance Your Bike?</h2>
          <p className="text-lg mb-8">Get instant approval and drive home your dream bike today!</p>
          <button className="bg-white text-red-500 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition transform hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>

    </div>
  );
}