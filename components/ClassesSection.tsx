import React, { useRef } from 'react';
import { User, Users, Trophy, Sparkles, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';

const CLASSES = [
  {
    title: 'Baby Judô',
    age: '3 a 5 anos',
    description: 'Introdução lúdica ao judô, focada no desenvolvimento motor, disciplina básica e socialização.',
    icon: Sparkles,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp1amdxXCgQoYgknLYNo3y_64dPHZBPku9Am-lkr8_zsG7bLR3GUI1jdpVm10E1kML-rZDusgTfGFeYoKDqISiN5izlRTSQvXEKyZH4Ft2NKt1ql_rsvMb0j2Qj9AQyKeD5ZuGtrT14jGea6aEntc3xjFxtk3mV1CYUYWVbKSJEgtr--zaI_eGRaJ_kcb52zJ8w3KzaAW-WHRtcBGAgKVXweVrJBhjVPFBYs60Hxu6LwgLNdh8Zk-7ZTZ5JZhoVlKH7gGKafCbFzo'
  },
  {
    title: 'Judô Infantil',
    age: '6 a 12 anos',
    description: 'Aprendizado técnico, fundamentos de queda, respeito ao próximo e autoconfiança.',
    icon: User,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7k053GWCJymb-T5HrL8qqcIaiE3b3fzXBzy3-lDMXXogc3AY3JuQT7AXEiUX7guNJXqaJwYEpMkoEMCFanBaFxNzs1kPt2nsRfC6XyjKsnpCi4yU5t9kiQk8w8yYvmYPwBRX-cSCN_lykVkTaoxLefSZeJ944dYzlcFyNWPYB_hvB4DYisOwYHAUD4gRbnnUKRtGTGQFc9qpqLvXOU_liycFRmG1JZWhrIxgUEl5boAE8wro0bwn7y9GVjbCdJu6BVvZ_o0VINOE'
  },
  {
    title: 'Adulto & Competição',
    age: '13+ anos',
    description: 'Treinamento de alto rendimento, defesa pessoal e condicionamento físico intenso.',
    icon: Trophy,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAAQcKB3EPf9UvqkorMdHdQ1nfXi80eNCDUoBFAS973y97pQ0Y2LHEvl9eiLof4Yu6U_dvJTkPy23RVXlwbaxeINP0gAWJvdTxGQ0wH_t4xHvpKGWgZsa0s5ZoXWy5UrsZQSB7vdVqcJ7FHj-7oRHoQ4zxKg4neC150lMadhhVv7mKQ6KiaudQtil9ZHnlgitMcuzgu94kmuHzzQIeznZqHuODbE3KWVWODVOBkuLmtb7jhRB0-lwsxMQJby5pRlD4bBRqHnq_LI0'
  },
  {
    title: 'Aikido',
    age: 'Todas as idades',
    description: 'A arte da paz. Técnicas de defesa baseadas na não-resistência e harmonia com o oponente.',
    icon: Users,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqaH95z0B7ktGjro3AX9iDRZaYuZjLkLZAvYbUe-1vX_wb_5XdUmqYGH0u0jqidIa-ONx-Tt6U7KCUTAOCOM5iRVdv_cfiEGrxy38GRixl4h6fp6BHP8mKyWMNKZHuoDw0zrvRRvLhK4qraygYRHTgvCbxRddbYf0DoWMZQkyS26ge5RThdDYuVRg_f0xGgrpkwxEjmtOue_3scUZ2QuS6fx0WA7g35ZrVseVhiEv8SZ7stNOFysdpx5IdBYj8O4erTdl3KzxUfUI'
  }
];

export const ClassesSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="aulas" className="py-16 md:py-24 bg-background-light dark:bg-background-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-6 md:mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4 uppercase">Nossas Modalidades</h2>
          <div className="w-16 md:w-24 h-1 bg-primary mx-auto mb-4 md:mb-6"></div>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400">
            Oferecemos turmas divididas por faixa etária e nível técnico.
          </p>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex md:hidden items-center justify-center gap-2 text-gray-500 text-sm mb-4 animate-pulse">
           <ArrowLeft className="h-4 w-4" />
           <span>Deslize para ver mais</span>
           <ArrowRight className="h-4 w-4" />
        </div>

        {/* Scroll Container */}
        <div className="relative group/container">
          {/* Desktop Nav Button Left */}
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 z-20 bg-white dark:bg-zinc-800 p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover/container:opacity-100"
            aria-label="Anterior"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>

          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-4 px-4 md:mx-0 md:px-0 gap-4 md:gap-6 scrollbar-hide"
          >
            {CLASSES.map((cls, idx) => (
              <div key={idx} className="flex-shrink-0 w-[85vw] sm:w-[350px] snap-center group relative bg-white dark:bg-card-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-800">
                <div className="h-48 md:h-56 overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img 
                    src={cls.image} 
                    alt={cls.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6 relative">
                  <div className="absolute -top-6 right-4 bg-primary text-white p-3 rounded-full shadow-lg">
                    <cls.icon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl text-text-light dark:text-white mb-1">{cls.title}</h3>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-4">{cls.age}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 min-h-[40px] md:min-h-auto">
                    {cls.description}
                  </p>
                  
                  <button className="text-primary font-bold text-sm uppercase tracking-wider hover:text-red-700 transition-colors flex items-center gap-1 group/btn w-full md:w-auto justify-center md:justify-start py-2 md:py-0 border md:border-none rounded-lg border-primary/20 md:rounded-none">
                    Saiba mais 
                    <ChevronRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Nav Button Right */}
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 translate-x-4 -translate-y-1/2 z-20 bg-white dark:bg-zinc-800 p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all opacity-0 group-hover/container:opacity-100"
            aria-label="Próximo"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

      </div>
    </section>
  );
};