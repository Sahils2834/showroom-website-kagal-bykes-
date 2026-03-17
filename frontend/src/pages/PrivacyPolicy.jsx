import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-hero-dark text-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-display font-black mb-4 uppercase italic">
            Privacy <span className="text-hero-red">Policy</span>
          </h1>
          <p className="text-gray-400 mb-12 uppercase tracking-widest text-sm">Last Updated: March 2026</p>

          <div className="space-y-8 text-gray-300 leading-relaxed font-light">
            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-hero-red pl-4">1. Introduction</h2>
              <p>
                Welcome to Kagal Bykes. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our showroom or website and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-hero-red pl-4">2. The Data We Collect</h2>
              <p>
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-hero-red pl-4">3. How We Use Your Data</h2>
              <p>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc ml-6 mt-4 space-y-2">
                <li>To register you as a new customer.</li>
                <li>To process and deliver your order or service appointment.</li>
                <li>To manage our relationship with you.</li>
                <li>To improve our website, products/services, marketing and customer relationships.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-hero-red pl-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wider border-l-4 border-hero-red pl-4">5. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-6 bg-white/5 border border-white/10 rounded-xl">
                <p className="font-bold text-white">Kagal Bykes</p>
                <p>JAISINGH RAO PARK, Main Road, Kagal, Maharashtra 416216</p>
                <p>Email: savitashete85@gmail.com</p>
                <p>Phone: 9623449324</p>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
