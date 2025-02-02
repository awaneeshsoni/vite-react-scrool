import React, { useRef, useState, useEffect } from 'react';
import { Home, Camera } from 'lucide-react';

// Define Section Component Types
type SectionProps = {
  id: string;
  component: React.FC;
  bgColor: string;
};

// Hero Section Component
const HeroSection: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-8 px-4">
    <h1 className="text-6xl font-bold text-white tracking-tight">
      Welcome to <span className="text-blue-400">Future</span>
    </h1>
    <p className="text-xl text-gray-200 max-w-2xl text-center">
      Experience the next generation of web design with our revolutionary platform
    </p>
    <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full 
      font-semibold transition-all transform hover:scale-105">
      Get Started
    </button>
  </div>
);

// Features Section Component
const FeaturesSection: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-6xl mx-auto">
    <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-4">Smart Design</h3>
      <p className="text-gray-200">Advanced AI-powered design tools that adapt to your needs</p>
    </div>
    <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm">
      <h3 className="text-2xl font-bold mb-4">Real-time Collaboration</h3>
      <p className="text-gray-200">Work together seamlessly with your team in real-time</p>
    </div>
  </div>
);

// Testimonials Section Component
const TestimonialsSection: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-8 px-4">
    <div className="max-w-3xl text-center">
      <blockquote className="text-2xl italic text-gray-200">
        "This platform has completely transformed how we approach web design."
      </blockquote>
      <p className="mt-4 text-xl font-semibold text-blue-400">- Sarah Johnson, Design Lead</p>
    </div>
  </div>
);

// Contact Section Component
const ContactSection: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-6 px-4">
    <div className="bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-sm max-w-md w-full">
      <h2 className="text-3xl font-bold mb-6 text-center">Get in Touch</h2>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 bg-white bg-opacity-20 rounded-lg text-white placeholder-gray-300"
        />
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors">
          Contact Us
        </button>
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sections: SectionProps[] = [
    { id: 'hero', component: HeroSection, bgColor: 'bg-gradient-to-br from-blue-900 to-black' },
    { id: 'features', component: FeaturesSection, bgColor: 'bg-gradient-to-br from-purple-900 to-black' },
    { id: 'testimonials', component: TestimonialsSection, bgColor: 'bg-gradient-to-br from-green-900 to-black' },
    { id: 'contact', component: ContactSection, bgColor: 'bg-gradient-to-br from-red-900 to-black' },
  ];

  useEffect(() => {
    const container = containerRef.current;
    let touchStart = 0;
    let touchEnd = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEnd = e.changedTouches[0].clientY;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeDistance = touchStart - touchEnd;
      const threshold = 5
      ;

      if (Math.abs(swipeDistance) > threshold) {
        if (swipeDistance > 0 && activeSection < sections.length - 1) {
          setActiveSection((prev) => prev + 1);
        } else if (swipeDistance < 0 && activeSection > 0) {
          setActiveSection((prev) => prev - 1);
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.getAttribute('data-index') || '0', 10);
            setActiveSection(sectionIndex);
          }
        });
      },
      { root: container, threshold: 0.5 }
    );

    document.querySelectorAll('.section').forEach((section) => {
      const element = section as HTMLElement; // Explicit cast to HTMLElement
      observer.observe(element);
      element.addEventListener('touchstart', handleTouchStart);
      element.addEventListener('touchend', handleTouchEnd);
    });

    return () => {
      observer.disconnect();
      document.querySelectorAll('.section').forEach((section) => {
        const element = section as HTMLElement; // Ensure correct type
        element.removeEventListener('touchstart', handleTouchStart);
        element.removeEventListener('touchend', handleTouchEnd);
      });
    };
  }, [activeSection, sections.length]);

  return (
    <div className="relative h-screen">
      {/* Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${activeSection === 0 ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="bg-black bg-opacity-50 text-white p-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-xl font-bold">Your App Name</h1>
          </div>
        </nav>
      </div>

      {/* Persistent Icons */}
      <div className="fixed top-4 right-4 z-50 flex gap-4">
        <button className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors">
          <Home className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75 transition-colors">
          <Camera className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSection === index ? 'bg-white h-4' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
            aria-label={`Go to section ${index + 1}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {sections.map((section, index) => {
          const Component = section.component;
          return (
            <div key={section.id} data-index={index} className={`section h-screen w-full flex items-center justify-center snap-start ${section.bgColor}`}>
              <Component />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
