import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Hero() {
  const [heroRef, isVisible] = useScrollAnimation(0.2);

  return (
    <section
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center text-white overflow-hidden transition-all duration-1000 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#0a1324]">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <p
          className={`text-sm italic text-gray-400 mb-3 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          not just a
        </p>

        <h1
          className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <span className="text-accent">Compliment</span> Wall
        </h1>

        <p
          className={`text-gray-300 text-lg mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          Anonymous. Thoughtful. Human.
        </p>

        <button
          className={`bg-accent text-black font-semibold px-8 py-3 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "800ms" }}
        >
          Send a Compliment
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-accent/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-accent rounded-full mt-2 animate-scroll" />
        </div>
      </div>
    </section>
  );
}
