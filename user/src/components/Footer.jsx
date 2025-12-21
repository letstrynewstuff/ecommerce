import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-slate-950 via-purple-950 to-slate-900 text-white py-16 border-t border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              SECURECOMM GLOBAL
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Your trusted provider of military-grade secure communication
              devices. Delivering encrypted technology worldwide, including
              restricted and military zones.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons Placeholder */}
              <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all">
                <span className="text-sm">FB</span>
              </div>
              <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all">
                <span className="text-sm">TW</span>
              </div>
              <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all">
                <span className="text-sm">IG</span>
              </div>
              <div className="w-10 h-10 bg-purple-600/30 rounded-full flex items-center justify-center hover:bg-purple-600 transition-all">
                <span className="text-sm">LI</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-purple-300">
              Quick Links
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a href="/" className="hover:text-purple-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/shop"
                  className="hover:text-purple-400 transition-colors"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="hover:text-purple-400 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-purple-400 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/tracking"
                  className="hover:text-purple-400 transition-colors"
                >
                  Order Tracking
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-purple-300">
              Categories
            </h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <a
                  href="/phones"
                  className="hover:text-purple-400 transition-colors"
                >
                  Encrypted Phones
                </a>
              </li>
              <li>
                <a
                  href="/laptops"
                  className="hover:text-purple-400 transition-colors"
                >
                  Secure Laptops
                </a>
              </li>
              <li>
                <a
                  href="/satellite"
                  className="hover:text-purple-400 transition-colors"
                >
                  Satellite Phones
                </a>
              </li>
              <li>
                <a
                  href="/radios"
                  className="hover:text-purple-400 transition-colors"
                >
                  Secure Radios
                </a>
              </li>
              <li>
                <a
                  href="/networks"
                  className="hover:text-purple-400 transition-colors"
                >
                  Network Devices
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Security */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-purple-300">
              Secure Contact
            </h4>
            <p className="text-gray-400 mb-4">
              Email: support@securecomm.global
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Worldwide Delivery Available
            </p>
            <p className="text-sm text-purple-300 font-semibold">
              ISO 27001 Certified • Military-Grade Security
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/30 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 SecureComm Global. All rights reserved. | Privacy Policy
            | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
