import React, { useState } from 'react';
import { Shield, Target, Award, ArrowRight, ZoomIn } from 'lucide-react';
import { ScheduleModal } from './ScheduleModal';
import { ImageModal } from './ImageModal';

export const AcademySection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="academia" className="py-16 md:py-24 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
            <div>
              <h2 className="font-display text-sm md:text-base text-primary font-bold tracking-wide uppercase mb-2">Sobre Nós</h2>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-light dark:text-white uppercase leading-tight mb-4 md:mb-6">
                A Excelência do <br />
                <span className="text-primary">Judô em Brasília</span>
              </h1>
              <div className="w-16 md:w-24 h-1 bg-primary mb-4 md:mb-6"></div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              Fundada com o propósito de transmitir os verdadeiros valores das artes marciais, a Academia Judô Gagliard é referência em ensino técnico e formação de caráter. Nossa estrutura foi pensada para oferecer o melhor ambiente de aprendizado, unindo a tradição dos dojos japoneses com metodologias modernas de treinamento.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2 md:pt-4">
              <div className="flex sm:block items-center sm:space-y-3 gap-4">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-900/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">Segurança</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Tatames olímpicos.</p>
                </div>
              </div>
              <div className="flex sm:block items-center sm:space-y-3 gap-4">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-900/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">Foco</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Turmas reduzidas.</p>
                </div>
              </div>
              <div className="flex sm:block items-center sm:space-y-3 gap-4">
                <div className="w-12 h-12 bg-red-50 dark:bg-red-900/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg dark:text-white">Excelência</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Metodologia CBJ.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center text-primary font-bold hover:text-red-700 transition-colors group text-lg"
              >
                Ver horários de treino
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Image Grid */}
          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div
                className="relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl shadow-lg transform translate-y-4 md:translate-y-8 h-40 md:h-64"
                onClick={() => setSelectedImage('https://lh3.googleusercontent.com/aida-public/AB6AXuDaMegLtk9RdsOUXBgjVrQNz-l_v4-KYORrFqb76uwleL91yjxfIlKouhFtL1-T3iyhil2UqNrS6AaHITFRMxM-5gzjLz9Bz0SlLGdOhU06oTpHOH_NMg-DN0l_5a-hP44MXm8yVylx1TVs3c3XaAy2DSLDuv0ZVGHsFkp9ZTV6fYsqsRKWWby_2vxMVgHwsCaGgqhygZEV4c9p_QXuUGZEKnjrNN_9Nwrz44PeyPIkJEOsyoLlXi4Nyqt9jjl73Iba662T1V0whz0')}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaMegLtk9RdsOUXBgjVrQNz-l_v4-KYORrFqb76uwleL91yjxfIlKouhFtL1-T3iyhil2UqNrS6AaHITFRMxM-5gzjLz9Bz0SlLGdOhU06oTpHOH_NMg-DN0l_5a-hP44MXm8yVylx1TVs3c3XaAy2DSLDuv0ZVGHsFkp9ZTV6fYsqsRKWWby_2vxMVgHwsCaGgqhygZEV4c9p_QXuUGZEKnjrNN_9Nwrz44PeyPIkJEOsyoLlXi4Nyqt9jjl73Iba662T1V0whz0"
                  alt="Interior do Dojo"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="text-white h-8 w-8" />
                </div>
              </div>

              <div
                className="relative group cursor-pointer overflow-hidden rounded-xl md:rounded-2xl shadow-lg h-40 md:h-64"
                onClick={() => setSelectedImage('https://lh3.googleusercontent.com/aida-public/AB6AXuD9hJz6pFb7ljFAipKz5msu2kD07YrdvjGUcAWSRK_UPB3X0PKOeaz-3KN9WMeEGhxHY3kLr-usDXV6kbYybg3eqJSFqOwPilq3X8wlfQ4VNEGy1B3rBdhq2HZERE72rdl38TaB_rb0cUkpX-aOymHobk7KkMmT0mHg9B4ogPV_wMzseGz4sKlzEj5Bxet6DHYBUEqlWFM8AXDIHRCmrZSHwN3gruIBSZqg5BWfvyQwmqIKb_tdhWhujadFP3ANEgFaU6sRSLjGUw4')}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9hJz6pFb7ljFAipKz5msu2kD07YrdvjGUcAWSRK_UPB3X0PKOeaz-3KN9WMeEGhxHY3kLr-usDXV6kbYybg3eqJSFqOwPilq3X8wlfQ4VNEGy1B3rBdhq2HZERE72rdl38TaB_rb0cUkpX-aOymHobk7KkMmT0mHg9B4ogPV_wMzseGz4sKlzEj5Bxet6DHYBUEqlWFM8AXDIHRCmrZSHwN3gruIBSZqg5BWfvyQwmqIKb_tdhWhujadFP3ANEgFaU6sRSLjGUw4"
                  alt="Detalhe Tatame"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <ZoomIn className="text-white h-8 w-8" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <ScheduleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ImageModal isOpen={!!selectedImage} onClose={() => setSelectedImage(null)} imageUrl={selectedImage} />
    </section>
  );
};