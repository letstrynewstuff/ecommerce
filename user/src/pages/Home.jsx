import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Shield,
  Globe,
  Zap,
  Lock,
  Award,
  Users,
} from "lucide-react";

import laptopDesk from "../assets/laptop-desk.png";
import onlineShoppingIllus from "../assets/online-shopping-illus.png";
import Footer from "../components/Footer";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-950/95 backdrop-blur-lg border-b border-purple-500/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              SECURECOMM GLOBAL
            </div>

            <div className="hidden md:flex space-x-8">
              <a
                href="#home"
                className="hover:text-purple-400 transition-colors"
              >
                Home
              </a>
              <a
                href="#about"
                className="hover:text-purple-400 transition-colors"
              >
                About
              </a>
              <a
                href="#features"
                className="hover:text-purple-400 transition-colors"
              >
                Features
              </a>
              <a
                href="#contact"
                className="hover:text-purple-400 transition-colors"
              >
                Contact
              </a>
            </div>

            <button
              onClick={handleLoginClick}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              LOGIN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                  BEST SALES
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                  ALL WEEK
                </span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed">
                Experience military-grade secure communication devices with
                global delivery. We provide cutting-edge encrypted technology
                for businesses, government agencies, and security-conscious
                individuals worldwide. Our devices meet the highest standards of
                data protection and reliability.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all hover:scale-105">
                  LEARN MORE
                </button>
                <button className="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all">
                  SHOP NOW
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="animate-float">
                <img
                  src={onlineShoppingIllus}
                  alt="Secure Online Shopping Experience"
                  className="w-full rounded-3xl shadow-2xl shadow-purple-600/60"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
              Our Premium Features
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-12 h-12" />,
                title: "Military-Grade Encryption",
                description:
                  "Bank-level AES-256 encryption ensures your communications remain completely secure and private from any unauthorized access.",
              },
              {
                icon: <Globe className="w-12 h-12" />,
                title: "Global Delivery",
                description:
                  "We deliver to over 190 countries worldwide with secure shipping options, including specialized delivery to military zones.",
              },
              {
                icon: <Zap className="w-12 h-12" />,
                title: "Lightning Fast",
                description:
                  "Our devices feature cutting-edge processors and optimized networks for instant, lag-free communication anywhere in the world.",
              },
              {
                icon: <Shield className="w-12 h-12" />,
                title: "Tamper-Proof Hardware",
                description:
                  "Physical security features prevent unauthorized access and modifications, meeting military security standards.",
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: "Premium Quality",
                description:
                  "Built with aerospace-grade materials and components designed to withstand extreme conditions and intensive use.",
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "24/7 Support",
                description:
                  "Round-the-clock technical support and customer service from our team of security communication experts.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-2xl border border-purple-500/30 backdrop-blur-sm hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
              >
                <div className="text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-purple-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative order-last md:order-first">
              <img
                src={laptopDesk}
                alt="Professional Secure Workspace"
                className="w-full rounded-3xl shadow-2xl shadow-purple-600/60"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                  About SecureComm Global
                </span>
              </h2>

              <p className="text-gray-300 leading-relaxed">
                <strong className="text-purple-300">SecureComm Global</strong>{" "}
                is a leading provider of military-grade secure communication
                devices and encrypted technology solutions. With over 15 years
                of experience, we serve government agencies, defense
                contractors, corporate enterprises, and security-conscious
                individuals worldwide.
              </p>

              <p className="text-gray-300 leading-relaxed">
                Our mission is to protect critical communications with
                state-of-the-art encryption technology while maintaining ease of
                use and reliability. Every device we manufacture undergoes
                rigorous testing and meets international security certifications
                including FIPS 140-2, Common Criteria, and NATO security
                standards.
              </p>

              <p className="text-gray-300 leading-relaxed">
                We offer comprehensive solutions including secure smartphones,
                encrypted laptops, satellite communication devices, and custom
                security solutions tailored to your specific requirements. Our
                global logistics network ensures safe delivery to any location,
                including remote and military zones.
              </p>

              <div className="pt-4">
                <p className="text-purple-300 font-semibold mb-2">
                  What We Offer:
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Encrypted Communication Devices | Secure Mobile Solutions |
                  Military-Grade Laptops | Satellite Communication Systems |
                  Custom Security Hardware | 24/7 Technical Support | Global
                  Delivery Network | Training & Consultation Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "190+", label: "Countries Served" },
              { number: "50,000+", label: "Devices Deployed" },
              { number: "15+", label: "Years Experience" },
              { number: "99.9%", label: "Uptime Guarantee" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Secure Your Communications?
          </h2>
          <p className="text-xl text-purple-100">
            Join thousands of satisfied clients who trust SecureComm Global for
            their secure communication needs
          </p>
          <button className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:scale-105 hover:shadow-2xl transition-all">
            GET STARTED TODAY
          </button>
        </div>
      </section>

      {/* Footer */}
     <Footer />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
