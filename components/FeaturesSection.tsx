import React from 'react';
import { Brain, Dumbbell, Users } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-text-light dark:text-text-dark mb-4 uppercase">Por que treinar conosco?</h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <Brain className="text-primary text-3xl group-hover:text-white transition-colors h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4 text-text-light dark:text-white">Filosofia & Tradição</h3>
            <p className="text-gray-600 dark:text-gray-400">Mais que um esporte, ensinamos o caminho suave. Respeito, honra e disciplina são os pilares de nossa metodologia.</p>
          </div>

          {/* Feature 2 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <Dumbbell className="text-primary text-3xl group-hover:text-white transition-colors h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4 text-text-light dark:text-white">Condicionamento Físico</h3>
            <p className="text-gray-600 dark:text-gray-400">Melhore sua flexibilidade, força e resistência cardiovascular em um ambiente seguro e motivador.</p>
          </div>

          {/* Feature 3 */}
          <div className="group p-8 rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2">
            <div className="w-14 h-14 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
              <Users className="text-primary text-3xl group-hover:text-white transition-colors h-8 w-8" />
            </div>
            <h3 className="font-display text-2xl font-bold mb-4 text-text-light dark:text-white">Ambiente Familiar</h3>
            <p className="text-gray-600 dark:text-gray-400">Um dojo acolhedor para crianças, jovens e adultos. Faça parte da família Judô Gagliard.</p>
          </div>

        </div>
      </div>
    </section>
  );
};