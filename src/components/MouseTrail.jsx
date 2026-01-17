import { useEffect, useRef } from 'react';

export default function MouseTrail() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let dotX = 0;
    let dotY = 0;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleClick = () => {
      cursor.classList.add('expand');
      setTimeout(() => {
        cursor.classList.remove('expand');
      }, 500);
    };

    const animateCursor = () => {
      // Smooth follow with easing
      cursorX += (mouseX - cursorX) * 0.35;
      cursorY += (mouseY - cursorY) * 0.35;
      
      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      cursor.style.transform = `translate3d(${cursorX - 10}px, ${cursorY - 10}px, 0)`;
      cursorDot.style.transform = `translate3d(${dotX - 20}px, ${dotY - 20}px, 0)`;

      requestAnimationFrame(animateCursor);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);
    animateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <style>{`
        .custom-cursor {
          width: 20px;
          height: 20px;
          position: fixed;
          pointer-events: none;
          z-index: 99999;
          top: 0;
          left: 0;
          will-change: transform;
        }

        .custom-cursor-dot {
          width: 40px;
          height: 40px;
          position: fixed;
          pointer-events: none;
          z-index: 99998;
          top: 0;
          left: 0;
          will-change: transform;
        }

        .cursor-inner {
          width: 20px;
          height: 20px;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 
            0 0 8px #ffffff,
            0 0 15px #ffffff;
          animation: cursorPulse 2s ease-in-out infinite;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .cursor-outer {
          width: 40px;
          height: 40px;
          border: 2px solid rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          box-shadow: 
            0 0 10px rgba(255, 255, 255, 0.5);
          animation: cursorPulse2 2s ease-in-out infinite;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        @keyframes cursorPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(0.9);
            opacity: 0.8;
          }
        }

        @keyframes cursorPulse2 {
          0%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.4;
          }
        }

        @keyframes expandClick {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .expand .cursor-inner {
          animation: expandClick 0.5s forwards;
        }

        .expand .cursor-outer {
          animation: expandClick 0.5s forwards;
        }
      `}</style>
      
      <div ref={cursorRef} className="custom-cursor">
        <div className="cursor-inner"></div>
      </div>
      
      <div ref={cursorDotRef} className="custom-cursor-dot">
        <div className="cursor-outer"></div>
      </div>
    </>
  );
}