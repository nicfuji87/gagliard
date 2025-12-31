import React from 'react';
import { Calendar, User } from 'lucide-react';

export const EventBanner: React.FC = () => {
  return (
    <section id="horarios" className="py-16 bg-zinc-900 relative overflow-hidden">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)'}}></div>

      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="bg-gradient-to-r from-black to-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-2xl flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-1 bg-primary text-white text-sm font-bold uppercase tracking-widest rounded-sm">Destaque</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase leading-none">
              Aula de <br />
              <span className="text-primary">Inauguração</span> <br />
              Aikido
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="text-primary h-6 w-6" />
                <span className="text-lg font-medium">17 de Junho às 19:00</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <User className="text-primary h-6 w-6" />
                <div>
                  <span className="block text-lg font-bold text-white">Arthur Dayrell</span>
                  <span className="text-sm">4º Dan de Aikido</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
              <div className="bg-white p-4 rounded-xl rotate-3 transform transition-transform hover:rotate-0 duration-300">
                <img 
                  alt="Logo Judô Gagliard" 
                  className="w-32 h-32 object-contain" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqaH95z0B7ktGjro3AX9iDRZaYuZjLkLZAvYbUe-1vX_wb_5XdUmqYGH0u0jqidIa-ONx-Tt6U7KCUTAOCOM5iRVdv_cfiEGrxy38GRixl4h6fp6BHP8mKyWMNKZHuoDw0zrvRRvLhK4qraygYRHTgvCbxRddbYf0DoWMZQkyS26ge5RThdDYuVRg_f0xGgrpkwxEjmtOue_3scUZ2QuS6fx0WA7g35ZrVseVhiEv8SZ7stNOFysdpx5IdBYj8O4erTdl3KzxUfUI"
                  onError={(e) => {
                    e.currentTarget.src = 'https://picsum.photos/150/150';
                  }}
                />
                <div className="text-center mt-2 font-display font-bold text-black text-xl">合氣道</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};