import React from 'react';
import { Calendar, ArrowRight, Clock, ChevronRight, Tag } from 'lucide-react';

export const NewsSection: React.FC = () => {
  return (
    <section id="noticias" className="py-20 bg-gray-50 dark:bg-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-display text-base text-primary font-bold tracking-wide uppercase mb-2">Fique Atualizado</h2>
          <h1 className="font-display text-4xl font-extrabold text-text-light dark:text-white sm:text-5xl uppercase">
            Últimas Notícias
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer bg-white dark:bg-card-dark h-full border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl">
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img 
                  alt="Campeonato Regional de Judô" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsPOVLAjgAsOIrwM2ZMU8W5VaRWVe7nWWWInF1gPA2EAuqRs412PvqX6eJHzjNZao57h80MdNKRjJw1kboANnesbSQ0HlPywYqzlt_lr46rqEw72xq5ga7hAwvwpJ4jS2o8yt07QHXr-nqBsCLk6du5mALfuSw11RPNbX3C4mXCDbFzRWalmES0P2v4Mk4mOgt1NVNRumCdXUgsoQy5TT9_ZhvJVEjNvPQA1OjNCtDKk-JglCQCA1qfOLyuI6F_v1ruEvSgrDzKYY"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Destaque</div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>15 de Outubro, 2023</span>
                  <span className="mx-2">•</span>
                  <span className="text-primary font-medium">Competições</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                  Judô Gagliard conquista 5 medalhas no Regional
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  Nossos atletas demonstraram técnica e garra excepcionais no último fim de semana. Confira os destaques das lutas e a lista completa dos medalhistas.
                </p>
                <a className="inline-flex items-center text-primary font-bold hover:text-red-700 transition-colors" href="#">
                  Ler matéria completa <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar Articles List */}
          <div className="space-y-6">
            
            {/* Article 1 */}
            <article className="bg-white dark:bg-card-dark rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 flex flex-col">
              <div className="h-32 relative overflow-hidden">
                 <img alt="Cerimônia de Troca de Faixas" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiARgu_wEpWaUFogqljDTMdLcMSnQ6V8EmDDZNVkisEEuxbFLcQ7HxQz8hh9eTzHhYS-QF49-9YTUFo0QU923g_Mdc2QqItQemoTwT6nlbvSSZdAjEUcQjj4OdtpJhIAl7RJrxDh3xlNSkX2KQWSSNzmoItBq0pyXEIazmRmp16XOR3Yo23xeWMuzC78eKtjTt5s2aqXGfAt77pGvP5_L1zesQxsI98i7yjU8MoGd0qTLPz7z630SuOkpI5HQPlLk20eESYzaCxbA" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded">Graduação</span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 3 min
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                  Cerimônia de Troca de Faixas 2023.2
                </h3>
                <div className="flex items-center justify-between mt-2">
                   <span className="text-xs text-gray-400">28 Set, 2023</span>
                   <ChevronRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            </article>

            {/* Article 2 */}
            <article className="bg-white dark:bg-card-dark rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 flex flex-col">
               <div className="h-32 relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                 <Tag className="h-10 w-10 text-gray-400" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 uppercase bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded">Aviso</span>
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 1 min
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary cursor-pointer transition-colors">
                  Horário de Funcionamento no Feriado
                </h3>
                <div className="flex items-center justify-between mt-2">
                   <span className="text-xs text-gray-400">10 Out, 2023</span>
                   <ChevronRight className="h-4 w-4 text-primary" />
                </div>
              </div>
            </article>

          </div>
        </div>

      </div>
    </section>
  );
};