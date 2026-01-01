import React, { useRef, useState } from 'react';
import { User, Users, Trophy, Sparkles, ChevronRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { ClassDetailsModal, ClassData } from './ClassDetailsModal';
import babyJudoImg from '../assets/images/4a7anos.jpg';
import infantilJudoImg from '../assets/images/8a13anos.jpg';
import adultoJudoImg from '../assets/images/adulto_competicao.jpg';

const CLASSES: (ClassData & { icon: any })[] = [
  {
    title: 'Baby Judô',
    age: '4 a 7 anos',
    description: 'Introdução lúdica ao judô, focada no desenvolvimento motor, disciplina básica e socialização.',
    longDescription: 'O Baby Judô é projetado especificamente para a primeira infância. Através de brincadeiras e exercícios lúdicos, as crianças aprendem a conhecer seu próprio corpo, desenvolvem coordenação motora, equilíbrio e iniciam o aprendizado de valores como respeito e disciplina. Tudo em um ambiente seguro e acolhedor.',
    benefits: ['Desenvolvimento motor e coordenação', 'Socialização com outras crianças', 'Disciplina de forma divertida', 'Gasto de energia saudável'],
    schedule: ['Terça e Quinta: 08:00 - 09:00', 'Segunda e Quarta: 17:30 - 18:15'],
    icon: Sparkles,
    image: babyJudoImg
  },
  {
    title: 'Judô Infantil',
    age: '8 a 13 anos',
    description: 'Aprendizado técnico, fundamentos de queda, respeito ao próximo e autoconfiança.',
    longDescription: 'Nesta fase, o ensino técnico é aprofundado. As crianças aprendem os fundamentos do Judô (quedas, imobilizações e projeções) de forma estruturada. O foco vai além do tatame: buscamos formar cidadãos resilientes, respeitosos e autoconfiantes.',
    benefits: ['Melhora da concentração escolar', 'Defesa pessoal', 'Controle emocional', 'Fortalecimento físico'],
    schedule: ['Segunda e Quarta: 09:00 - 10:00', 'Terça e Quinta: 18:30 - 19:30'],
    icon: User,
    image: infantilJudoImg
  },
  {
    title: 'Adulto & Competição',
    age: '13+ anos',
    description: 'Treinamento de alto rendimento, defesa pessoal e condicionamento físico intenso.',
    longDescription: 'Para adolescentes e adultos que buscam desde a prática por hobby e saúde até o alto rendimento competitivo. Os treinos são intensos, focados em técnica apurada, estratégia de luta e condicionamento físico de elite.',
    benefits: ['Condicionamento físico completo', 'Alívio do estresse', 'Defesa pessoal real', 'Espírito de equipe e superação'],
    schedule: ['Segunda a Sexta: 19:30 - 21:00', 'Sábado: 09:00 - 11:00'],
    icon: Trophy,
    image: adultoJudoImg
  },

];

export const ClassesSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);

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



        {/* Scroll Container */}
        <div className="relative group/container">
          {/* Desktop Nav Button Left */}
          <button
            onClick={() => scroll('left')}
            className="flex absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-4 z-30 bg-white/80 dark:bg-zinc-800/80 md:bg-white md:dark:bg-zinc-800 backdrop-blur-sm md:backdrop-blur-none p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white active:scale-95 transition-all opacity-100 md:opacity-0 md:group-hover/container:opacity-100"
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

                  <button
                    onClick={() => setSelectedClass(cls)}
                    className="text-primary font-bold text-sm uppercase tracking-wider hover:text-red-700 transition-colors flex items-center gap-1 group/btn w-full md:w-auto justify-center md:justify-start py-2 md:py-0 border md:border-none rounded-lg border-primary/20 md:rounded-none"
                  >
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
            className="flex absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-4 z-30 bg-white/80 dark:bg-zinc-800/80 md:bg-white md:dark:bg-zinc-800 backdrop-blur-sm md:backdrop-blur-none p-3 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white active:scale-95 transition-all opacity-100 md:opacity-0 md:group-hover/container:opacity-100"
            aria-label="Próximo"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

      </div>

      <ClassDetailsModal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        data={selectedClass}
      />
    </section>
  );
};