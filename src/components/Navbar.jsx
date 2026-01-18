import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    // Listen to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      console.log('🔐 Auth state changed:', user ? `Logged in as ${user.email}` : 'Not logged in');
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
      scrolled 
        ? 'w-[95%] max-w-5xl' 
        : 'w-[98%] max-w-6xl'
    }`}>
      {/* Glowing backdrop effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 blur-2xl rounded-3xl opacity-60"></div>
      
      {/* Main navbar container - heavily blurred */}
      <div className={`relative bg-black/40 backdrop-blur-3xl border rounded-3xl transition-all duration-500 ${
        scrolled 
          ? 'border-accent/20 shadow-2xl shadow-accent/20' 
          : 'border-gray-700/30 shadow-xl shadow-black/50'
      }`}>
        <div className="px-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Logo with animated glow */}
            <Link 
              to="/" 
              className="relative text-2xl font-bold hover:scale-110 transition-all duration-300 group"
              onMouseEnter={() => setActiveLink("home")}
              onMouseLeave={() => setActiveLink("")}
            >
              <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative">
                <span className="text-accent animate-pulse">Compliment</span>
                <span className="text-white">Wall</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center gap-2 bg-black/20 backdrop-blur-xl rounded-full px-3 py-2 border border-gray-800/30">
              <Link 
                to="/send" 
                className="relative px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-300 rounded-full group overflow-hidden"
                onMouseEnter={() => setActiveLink("send")}
                onMouseLeave={() => setActiveLink("")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative font-medium">Send</span>
                {activeLink === "send" && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-ping"></span>
                )}
              </Link>

              <Link 
                to="/inbox" 
                className="relative px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-300 rounded-full group overflow-hidden"
                onMouseEnter={() => setActiveLink("inbox")}
                onMouseLeave={() => setActiveLink("")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative font-medium">Inbox</span>
                {activeLink === "inbox" && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-ping"></span>
                )}
              </Link>

              <Link 
                to="/members" 
                className="relative px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-300 rounded-full group overflow-hidden"
                onMouseEnter={() => setActiveLink("members")}
                onMouseLeave={() => setActiveLink("")}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                <span className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative font-medium">Members</span>
                {activeLink === "members" && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-ping"></span>
                )}
              </Link>

              {isLoggedIn ? (
                <Link 
                  to="/account" 
                  className="relative px-6 py-2.5 text-gray-300 hover:text-white transition-all duration-300 rounded-full group overflow-hidden"
                  onMouseEnter={() => setActiveLink("account")}
                  onMouseLeave={() => setActiveLink("")}
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <span className="absolute inset-0 bg-accent/10 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative font-medium">Account</span>
                  {activeLink === "account" && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-ping"></span>
                  )}
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="relative bg-accent/90 backdrop-blur-sm text-black px-8 py-2.5 rounded-full font-semibold overflow-hidden group ml-2"
                  onMouseEnter={() => setActiveLink("login")}
                  onMouseLeave={() => setActiveLink("")}
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></span>
                  <span className="relative flex items-center gap-2">
                    Login
                    <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <span className="absolute inset-0 rounded-full shadow-lg shadow-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute top-0 left-1/4 w-2 h-2 bg-accent/30 rounded-full blur-md animate-pulse"></div>
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-accent/20 rounded-full blur-md animate-pulse" style={{animationDelay: '300ms'}}></div>
    </nav>
  );
}