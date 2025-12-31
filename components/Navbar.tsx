import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Início', href: '#inicio' },
  { label: 'A Academia', href: '#academia' },
  { label: 'Sensei', href: '#sensei' },
  { label: 'Aulas', href: '#aulas' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Notícias', href: '#noticias' },
  { label: 'Contato', href: '#contato' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#inicio');

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Active section tracking logic
  useEffect(() => {
    const handleScroll = () => {
      // Offset for the fixed navbar height (approx 100px)
      const scrollPosition = window.scrollY + 120;

      for (const item of NAV_ITEMS) {
        const sectionId = item.href.substring(1);
        const section = document.getElementById(sectionId);

        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(item.href);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed w-full z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Area */}
            <div className="flex-shrink-0 flex items-center gap-3 z-50">
              <img
                alt="Logotipo Judô Gagliard"
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover"
                src="/logo.png"

              />
              <span className="font-display font-bold text-xl md:text-2xl tracking-wide uppercase text-text-light dark:text-text-dark">
                Judô <span className="text-primary">Gagliard</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-6">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`relative transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium uppercase tracking-wider group ${activeSection === item.href
                      ? 'text-primary font-bold'
                      : 'text-text-light dark:text-text-dark hover:text-primary dark:hover:text-primary'
                      }`}
                  >
                    {item.label}
                    {/* Animated Underline */}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transform transition-transform duration-300 origin-left ${activeSection === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                  </a>
                ))}
                <a
                  href="#contato"
                  className="bg-primary hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-red-500/30 hover:-translate-y-0.5"
                >
                  Matricule-se
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex lg:hidden z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-text-light dark:text-text-dark hover:text-primary focus:outline-none"
                aria-label="Menu principal"
              >
                {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background-light dark:bg-background-dark lg:hidden transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
          }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 pb-8 overflow-y-auto">
          <div className="space-y-2">
            {NAV_ITEMS.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                className={`group flex items-center justify-between py-5 border-b border-gray-100 dark:border-gray-800 transition-colors ${activeSection === item.href ? 'border-l-4 border-l-primary pl-4' : ''
                  }`}
                onClick={() => setIsOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className={`text-2xl font-display font-bold transition-colors ${activeSection === item.href
                  ? 'text-primary'
                  : 'text-text-light dark:text-text-dark group-hover:text-primary'
                  }`}>
                  {item.label}
                </span>
                <ChevronRight className={`h-6 w-6 transition-colors ${activeSection === item.href
                  ? 'text-primary'
                  : 'text-gray-300 dark:text-gray-600 group-hover:text-primary'
                  }`} />
              </a>
            ))}
          </div>

          <div className="mt-auto pt-8">
            <a
              href="#contato"
              className="block w-full bg-primary hover:bg-red-700 text-white text-center py-4 rounded-xl text-lg font-bold shadow-xl shadow-red-500/20 active:scale-95 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Matricule-se Agora
            </a>
            <p className="text-center text-gray-400 text-sm mt-6">
              © Judô Gagliard
            </p>
          </div>
        </div>
      </div>
    </>
  );
};