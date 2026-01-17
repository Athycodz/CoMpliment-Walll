export default function ScrollInfo() {
  const features = [
    {
      title: "Sometimes words are hard",
      description: "We get it. Telling someone they're awesome face-to-face? Awkward. Here, you can be brave anonymously.",
      color: "#c4ff0e"
    },
    {
      title: "Completely anonymous",
      description: "Your identity stays hidden. No pressure, no expectations. Just pure, genuine appreciation.",
      color: "#00d4ff"
    },
    {
      title: "Everyone needs to hear it",
      description: "That coworker who always helps? Your friend who's been down lately? They deserve to know they matter.",
      color: "#ff6b9d"
    },
    {
      title: "Spread positivity",
      description: "In a world full of noise, be the voice that lifts someone up. It takes 10 seconds to change someone's day.",
      color: "#ffd93d"
    },
    {
      title: "No strings attached",
      description: "No likes, no follows, no clout. Just humans being kind to humans. That's it.",
      color: "#a78bfa"
    },
    {
      title: "Build a better community",
      description: "Imagine a world where people randomly receive compliments. You can make that happen, right here, right now.",
      color: "#34d399"
    }
  ];

  return (
    <section className="relative min-h-screen py-32 px-4 pb-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1324] via-[#0a0a0a] to-[#0a0a0a]">
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Floating Decorative Elements */}
      {/* Left side floating shapes */}
      <div className="absolute left-10 top-1/4 w-32 h-32 opacity-20" style={{ animation: 'float-large 6s ease-in-out infinite' }}>
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#c4ff0e" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" fill="#c4ff0e" opacity="0.3" />
        </svg>
      </div>
      
      <div className="absolute left-20 top-2/3 w-24 h-24 opacity-20" style={{ animation: 'float-large 5s ease-in-out infinite 1s' }}>
        <svg viewBox="0 0 100 100">
          <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill="#00d4ff" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute left-5 top-1/2 w-16 h-16 opacity-20" style={{ animation: 'spin-fast 8s linear infinite' }}>
        <svg viewBox="0 0 100 100">
          <rect x="25" y="25" width="50" height="50" fill="none" stroke="#ff6b9d" strokeWidth="2" transform="rotate(45 50 50)" />
        </svg>
      </div>

      {/* Right side floating shapes */}
      <div className="absolute right-10 top-1/3 w-28 h-28 opacity-20" style={{ animation: 'float-large 5.5s ease-in-out infinite 0.5s' }}>
        <svg viewBox="0 0 100 100">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="#ffd93d" strokeWidth="2" />
          <circle cx="50" cy="60" r="15" fill="#ffd93d" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute right-16 top-3/4 w-20 h-20 opacity-20" style={{ animation: 'float-large 7s ease-in-out infinite 2s' }}>
        <svg viewBox="0 0 100 100">
          <path d="M50 20 L80 50 L50 80 L20 50 Z" fill="#a78bfa" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute right-8 top-1/2 w-24 h-24 opacity-20" style={{ animation: 'pulse-large 3s ease-in-out infinite' }}>
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" fill="none" stroke="#34d399" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
      </div>

      {/* Center floating particles */}
      <div className="absolute left-1/3 top-20 w-4 h-4 bg-accent rounded-full opacity-30" style={{ animation: 'float-particle-large 4s ease-in-out infinite' }}></div>
      <div className="absolute right-1/3 top-40 w-3 h-3 bg-blue-400 rounded-full opacity-30" style={{ animation: 'float-particle-large 5s ease-in-out infinite 1s' }}></div>
      <div className="absolute left-2/3 bottom-40 w-5 h-5 bg-pink-400 rounded-full opacity-30" style={{ animation: 'float-particle-large 5.5s ease-in-out infinite 2s' }}></div>
      <div className="absolute right-1/4 bottom-60 w-3 h-3 bg-purple-400 rounded-full opacity-30" style={{ animation: 'float-particle-large 4.5s ease-in-out infinite 1.5s' }}></div>

      {/* Curved lines */}
      <svg className="absolute left-0 top-1/4 w-64 h-64 opacity-10" style={{ animation: 'sway 8s ease-in-out infinite' }}>
        <path d="M 0 50 Q 50 0 100 50 T 200 50" fill="none" stroke="#c4ff0e" strokeWidth="2" />
      </svg>

      <svg className="absolute right-0 bottom-1/4 w-64 h-64 opacity-10" style={{ animation: 'sway 10s ease-in-out infinite 1s' }}>
        <path d="M 200 50 Q 150 0 100 50 T 0 50" fill="none" stroke="#00d4ff" strokeWidth="2" />
      </svg>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20 animate-fadeInUp">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Why <span className="text-accent">ComplimentWall</span>?
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Because kindness shouldn't be complicated
          </p>
        </div>

        {/* Feature Cards with Scroll Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="scroll-reveal group bg-gray-900/40 backdrop-blur-xl border border-gray-800/50 rounded-2xl p-8 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-2"
            >
              {/* Animated Icon */}
              <div className="mb-6 relative w-20 h-20 mx-auto">
                {/* Outer rotating ring */}
                <div 
                  className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{
                    background: `conic-gradient(from 0deg, ${feature.color}, transparent, ${feature.color})`,
                    animation: 'spin 8s linear infinite'
                  }}
                ></div>
                
                {/* Middle pulsing circle */}
                <div 
                  className="absolute inset-2 rounded-full"
                  style={{
                    backgroundColor: `${feature.color}20`,
                    animation: 'pulse 3s ease-in-out infinite'
                  }}
                ></div>
                
                {/* Inner animated shape */}
                <svg 
                  className="absolute inset-4" 
                  viewBox="0 0 100 100"
                  style={{ animation: 'float 4s ease-in-out infinite' }}
                >
                  {index % 3 === 0 && (
                    // Heart shape
                    <path
                      d="M50 80 C30 60, 10 40, 30 20 C40 10, 50 15, 50 15 C50 15, 60 10, 70 20 C90 40, 70 60, 50 80 Z"
                      fill={feature.color}
                      opacity="0.8"
                    />
                  )}
                  {index % 3 === 1 && (
                    // Star shape
                    <path
                      d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
                      fill={feature.color}
                      opacity="0.8"
                    />
                  )}
                  {index % 3 === 2 && (
                    // Circle with inner glow
                    <>
                      <circle cx="50" cy="50" r="30" fill={feature.color} opacity="0.6" />
                      <circle cx="50" cy="50" r="20" fill={feature.color} opacity="0.9" />
                    </>
                  )}
                </svg>

                {/* Floating particles */}
                <div 
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: feature.color,
                    top: '10%',
                    right: '10%',
                    animation: 'float-particle 3s ease-in-out infinite'
                  }}
                ></div>
                <div 
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: feature.color,
                    bottom: '15%',
                    left: '15%',
                    animation: 'float-particle 3s ease-in-out infinite 1.5s'
                  }}
                ></div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:text-accent transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="scroll-reveal mt-20 text-center bg-gradient-to-r from-accent/10 via-accent/5 to-transparent border border-accent/20 rounded-3xl p-16 relative overflow-hidden group">
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
              background: 'radial-gradient(circle at center, rgba(196, 255, 14, 0.1), transparent)',
              animation: 'pulse 2s ease-in-out infinite'
            }}
          ></div>
          
          <div className="relative z-10">
            <h3 className="text-4xl font-bold mb-6">
              Ready to make someone's day?
            </h3>
            <p className="text-gray-400 text-xl mb-8">
              It's free. It's anonymous. It's ridiculously simple.
            </p>
            <a
              href="/send"
              className="inline-block bg-accent text-black font-bold px-12 py-5 rounded-full hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-accent/50 text-lg"
            >
              Send Your First Compliment ✨
            </a>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        @keyframes appear {
          from {
            opacity: 0;
            transform: translateY(120px) scale(0.85);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes float-large {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-40px) translateX(20px) rotate(5deg);
          }
          50% {
            transform: translateY(-60px) translateX(-20px) rotate(-5deg);
          }
          75% {
            transform: translateY(-40px) translateX(20px) rotate(5deg);
          }
        }

        @keyframes spin-fast {
          from {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.2);
          }
          to {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes pulse-large {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.4);
            opacity: 0.4;
          }
        }

        @keyframes float-particle-large {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-80px);
            opacity: 0.6;
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: translateX(0px) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(-30px) translateY(-20px) rotate(-5deg);
          }
          50% {
            transform: translateX(0px) translateY(-40px) rotate(0deg);
          }
          75% {
            transform: translateX(30px) translateY(-20px) rotate(5deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0px);
            opacity: 1;
          }
          50% {
            transform: translateY(-20px);
            opacity: 0.5;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        .scroll-reveal {
          animation: appear 1.5s ease-out both;
          animation-timeline: view();
          animation-range: entry 0% cover 50%;
        }

        /* Fallback for browsers that don't support animation-timeline */
        @supports not (animation-timeline: view()) {
          .scroll-reveal {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }

          .scroll-reveal.in-view {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}