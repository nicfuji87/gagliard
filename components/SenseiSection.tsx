import React, { useRef } from 'react';
import { Medal, GraduationCap, Scroll, ArrowRight, ArrowLeft } from 'lucide-react';

const INSTRUCTORS = [
  {
    name: "Gagliard Peixoto",
    role: "Mestre Principal",
    rank: "Faixa Preta 5º Dan",
    description: "Com décadas de dedicação ao caminho do Judô, lidera nossa academia com excelência técnica e valores inabaláveis. Referência técnica reconhecida pela CBJ e FEMEJU.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvL99t_KcKppoEMyNxl5G64oklLQefHHO4lflGkAo-_YuUdpG7fTackTW3wu2vvst68haelD-o-_JTCs2078pI5B5xS4vWA8cSJ0D6aL8xceb1BHCxknmj-b93-3_bdmllj0SC6pEXEbe7FVHzdxvPcvrHW29Qok3Zc2qq6NqmAW6K7CdO-_froQtqa9uyyOFVu0VaHdtszq5f8OoJL_yX9cRbVqHalGwM_rftcn8qoQ7qoBf4qP7hrvG_mmIWfSWYcjqtLrz-hx0",
    highlights: ["Metodologia CBJ", "Tradição Kodokan"]
  },
  {
    name: "Arthur Dayrell",
    role: "Sensei Aikido",
    rank: "4º Dan Aikido",
    description: "Especialista na arte da paz e harmonia. Traz para a academia a filosofia do Aikido, focando na defesa pessoal e no controle da energia.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqaH95z0B7ktGjro3AX9iDRZaYuZjLkLZAvYbUe-1vX_wb_5XdUmqYGH0u0jqidIa-ONx-Tt6U7KCUTAOCOM5iRVdv_cfiEGrxy38GRixl4h6fp6BHP8mKyWMNKZHuoDw0zrvRRvLhK4qraygYRHTgvCbxRddbYf0DoWMZQkyS26ge5RThdDYuVRg_f0xGgrpkwxEjmtOue_3scUZ2QuS6fx0WA7g35ZrVseVhiEv8SZ7stNOFysdpx5IdBYj8O4erTdl3KzxUfUI",
    highlights: ["Defesa Pessoal", "Controle Ki"]
  },
  {
    name: "Equipe Técnica",
    role: "Instrutores & Monitores",
    rank: "Formação Continuada",
    description: "Nossa equipe de apoio é formada por atletas graduados que auxiliam nas aulas infantis e iniciantes, garantindo atenção total a todos os alunos.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPjFby8MQUQeYuDcTOIhJOGQzktxtjdSZSeka3NlgPbcvkZmaezK-OB7LTku980UhGrndFawwvN5MPEz83KitTZJYFJE-pIFS2U4UX2N5t5aDb4rUUI1f5kFzbzQgYBuY98K-3mHyh-7zMYj38ySvXQ2o-e1Rtq6zm6qB0IPwIGotZ2Q_GXGDa_heM2UzDC7bm93dn5_TCaL-DXDTKeoGw6e37fmjAS98V83ogfebHJhFpFkSgs8XslG738amtg1KMkuMkXM1khGo",
    highlights: ["Atenção Individual", "Segurança"]
  }
];

export const SenseiSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400; // Approximate card width
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="sensei" className="py-24 bg-white dark:bg-zinc-900 relative overflow-hidden">
      {/* Skewed background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 dark:bg-black skew-x-12 translate-x-20 z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="font-display text-4xl font-bold text-text-light dark:text-white uppercase leading-tight">
              Nossos <span className="text-primary">Senseis</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
              Conheça os mestres que guiarão sua jornada.
            </p>
          </div>
          
          <div className="hidden md:flex gap-2">
             <button onClick={() => scroll('left')} className="p-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all">
               <ArrowLeft className="h-6 w-6" />
             </button>
             <button onClick={() => scroll('right')} className="p-3 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-primary hover:text-white hover:border-primary transition-all">
               <ArrowRight className="h-6 w-6" />
             </button>
          </div>
        </div>
        
        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden items-center gap-2 text-gray-500 text-sm mb-4 animate-pulse">
           <ArrowLeft className="h-4 w-4" />
           <span>Arraste para conhecer a equipe</span>
           <ArrowRight className="h-4 w-4" />
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:-mx-0 md:px-0 gap-6 md:gap-8 scrollbar-hide"
        >
          {INSTRUCTORS.map((sensei, idx) => (
            <div key={idx} className="flex-shrink-0 w-[90vw] md:w-[900px] snap-center">
              <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 bg-gray-50 dark:bg-zinc-800/30 p-6 md:p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
                
                {/* Image */}
                <div className="w-full lg:w-2/5">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary translate-x-2 translate-y-2 rounded-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1"></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[3/4] md:aspect-[4/5]">
                      <img 
                        alt={sensei.name}
                        className="w-full h-full object-cover" 
                        src={sensei.image}
                      />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-3/5 space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {sensei.role}
                    </div>
                    <h2 className="font-display text-3xl lg:text-4xl font-bold text-text-light dark:text-white uppercase leading-tight mb-2">
                      {sensei.name}
                    </h2>
                    <p className="font-display text-lg text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest border-l-4 border-primary pl-4">
                      {sensei.rank}
                    </p>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {sensei.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {sensei.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
                        <h4 className="font-bold text-base text-text-light dark:text-white flex items-center gap-2">
                          {hIdx === 0 ? <GraduationCap className="text-primary h-5 w-5" /> : <Scroll className="text-primary h-5 w-5" />}
                          {highlight}
                        </h4>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};