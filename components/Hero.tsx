import React from 'react';
import { Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import gagliardImg from '../assets/images/gagliard.jpg';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-20 overflow-hidden min-h-[90vh] md:min-h-screen flex items-center">
      {/* Backgrounds */}
      <div className="absolute inset-0 z-0">
        <div className="hero-pattern absolute inset-0 opacity-95 dark:opacity-100"></div>
        {/* Mobile-optimized gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background-light dark:to-background-dark md:bg-gradient-to-t md:from-primary/20 md:to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center w-full">

        {/* Left Content */}
        <div className="w-full md:w-1/2 pt-8 md:pt-0 text-white flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider uppercase">Matrículas Abertas</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-tight uppercase mb-6 max-w-lg md:max-w-none">
            <span className="block text-white">Disciplina,</span>
            <span className="block text-primary">Respeito &</span>
            <span className="block text-white">Evolução</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8 max-w-sm sm:max-w-lg font-light leading-relaxed">
            Desenvolva seu corpo e mente com o Judô. Aulas para todas as idades com mestres qualificados no coração de Brasília.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="https://wa.me/556181328873?text=Ol%C3%A1%2C%20estou%20no%20site%20e%20gostaria%20de%20agendar%20uma%20aula%20experimental."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg shadow-red-600/40 hover:-translate-y-1 w-full sm:w-auto"
            >
              <Calendar className="h-5 w-5" />
              Aula Experimental
            </a>
          </div>

          {/* Mini Profile Card - Mobile Hidden or simplified */}
          <div className="mt-12 p-4 bg-white/5 backdrop-blur-md border-l-4 border-primary rounded-r-lg max-w-md hidden md:block">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.42 12.5C20.67 12.5 21.69 11.5 21.69 10.25C21.69 9 20.69 8 19.42 8C18.17 8 17.17 9 17.17 10.25C17.17 11.5 18.19 12.5 19.42 12.5ZM12.92 10.25C12.92 11.2 11.96 12 10.79 12C9.62004 12 8.67004 11.2 8.67004 10.25C8.67004 9.29999 9.62004 8.5 10.79 8.5C11.96 8.5 12.92 9.29999 12.92 10.25ZM16.33 13.91C16.83 14.25 17.42 14.5 18.04 14.5C19.88 14.5 21.42 13 21.42 11.13C21.42 9.25 19.92 7.75 18.04 7.75C16.71 7.75 15.54 8.5 15 9.5C14.46 8.5 13.29 7.75 11.96 7.75C10.08 7.75 8.54004 9.25 8.54004 11.13C8.54004 13 10.08 14.5 11.96 14.5C12.58 14.5 13.17 14.25 13.67 13.91L15 15.25L16.33 13.91ZM4.92004 15.21C4.50004 14.67 4.25004 14 4.25004 13.29C4.25004 11.63 5.58004 10.29 7.25004 10.29H7.67004V8.79H7.25004C4.75004 8.79 2.75004 10.79 2.75004 13.29C2.75004 14.38 3.12004 15.38 3.75004 16.21L4.92004 15.21ZM15 20.25L10.79 23L9.50004 18.25L15 16.75L20.5 18.25L19.21 23L15 20.25Z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white uppercase">Sensei Gagliard Peixoto</h3>
                <p className="text-gray-400 text-sm">Faixa Preta 5º Dan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Visual */}
        <div className="w-full md:w-1/2 relative mt-12 md:mt-0 flex justify-center md:justify-end">
          {/* Decorative Kanji - Desktop Only */}
          <div className="absolute right-0 top-10 font-display font-bold text-[10rem] opacity-5 text-white pointer-events-none select-none hidden lg:block japanese-vertical leading-none">
            柔道
          </div>

          <div className="relative z-10 w-full max-w-sm md:max-w-lg px-6 md:px-0">
            <div className="absolute -inset-4 bg-primary/30 blur-3xl rounded-full"></div>
            <img
              alt="Sensei Gagliard Peixoto"
              className="relative z-10 w-full h-auto rounded-2xl drop-shadow-2xl grayscale contrast-125 hover:grayscale-0 transition-all duration-700 object-cover aspect-[3/4]"
              src={gagliardImg}
            />

            {/* Floating Badge */}
            <div className="absolute bottom-6 -left-2 md:bottom-10 md:-left-12 bg-card-light dark:bg-card-dark p-3 md:p-4 rounded-lg shadow-xl border border-gray-100 dark:border-gray-800 flex items-center gap-3 z-20 animate-bounce-slow max-w-[80%] md:max-w-none">
              <div className="bg-primary rounded-full p-2 flex-shrink-0">
                <CheckCircle className="text-white h-4 w-4 md:h-5 md:w-5" />
              </div>
              <div>
                <p className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase">Graduado pelo</p>
                <p className="font-display text-sm md:text-base font-bold text-text-light dark:text-text-dark leading-tight">Hombu Dojô no Japão</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};