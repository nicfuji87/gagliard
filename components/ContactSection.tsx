import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contato" className="py-16 md:py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16">
          
          {/* Info Side */}
          <div className="space-y-8 order-2 lg:order-1">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4 uppercase">Entre em Contato</h2>
              <div className="w-16 h-1 bg-primary mb-6"></div>
              <p className="text-gray-600 dark:text-gray-400 text-lg">Venha nos fazer uma visita ou agende sua aula experimental.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-text-light dark:text-white">Endereço</h4>
                  <p className="text-gray-600 dark:text-gray-400">SGAS 608 (L2 SUL) - ACM Brasília<br />Brasília - DF</p>
                </div>
              </div>
            </div>

            <div className="pt-2 md:pt-6">
              <a 
                href="https://wa.me/5561981328873" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full sm:w-auto gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-lg hover:shadow-green-500/30"
              >
                <MessageCircle className="h-6 w-6" />
                Falar no WhatsApp
              </a>
            </div>
          </div>

          {/* Map Side */}
          <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-800 order-1 lg:order-2 h-[300px] lg:h-auto">
            <div className="relative w-full h-full min-h-[300px] lg:min-h-[400px] bg-gray-200 dark:bg-gray-800 flex items-center justify-center group cursor-pointer">
              <iframe 
                src="https://maps.google.com/maps?q=ACM%20Bras%C3%ADlia%20SGAS%20608&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{border:0, position: 'absolute', inset: 0}} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale hover:grayscale-0 transition-all duration-500"
                title="Localização Judô Gagliard"
              ></iframe>
              <div className="absolute bottom-4 left-4 bg-white dark:bg-black/80 px-4 py-2 rounded shadow-lg backdrop-blur-sm pointer-events-none hidden sm:block">
                <p className="font-bold text-sm text-text-light dark:text-white">ACM Brasília - L2 Sul</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};