import { Link } from 'react-router-dom';
import ScrollInfo from '../components/ScrollInfo';

export default function Hero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Your existing hero content */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#0a1324]">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-sm italic text-gray-400 mb-3 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
            not just a
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
            <span className="text-accent">Compliment</span> Wall
          </h1>
          <p className="text-gray-300 text-lg mb-8 animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
            Anonymous. Thoughtful. Human.
          </p>
          <Link 
            to="/send"
            className="inline-block bg-accent text-black font-semibold px-8 py-3 rounded-full hover:scale-105 transition animate-fadeInUp" 
            style={{ animationDelay: "0.8s" }}
          >
            Send a Compliment
          </Link>
        </div>
      </section>

      {/* Add the scroll section */}
      <ScrollInfo />
    </>
  );
}