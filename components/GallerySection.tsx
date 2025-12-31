import React, { useState } from 'react';
import { Expand } from 'lucide-react';

const IMAGES = [
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9hJz6pFb7ljFAipKz5msu2kD07YrdvjGUcAWSRK_UPB3X0PKOeaz-3KN9WMeEGhxHY3kLr-usDXV6kbYybg3eqJSFqOwPilq3X8wlfQ4VNEGy1B3rBdhq2HZERE72rdl38TaB_rb0cUkpX-aOymHobk7KkMmT0mHg9B4ogPV_wMzseGz4sKlzEj5Bxet6DHYBUEqlWFM8AXDIHRCmrZSHwN3gruIBSZqg5BWfvyQwmqIKb_tdhWhujadFP3ANEgFaU6sRSLjGUw4',
    category: 'Treinos',
    title: 'Preparação Técnica'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPjFby8MQUQeYuDcTOIhJOGQzktxtjdSZSeka3NlgPbcvkZmaezK-OB7LTku980UhGrndFawwvN5MPEz83KitTZJYFJE-pIFS2U4UX2N5t5aDb4rUUI1f5kFzbzQgYBuY98K-3mHyh-7zMYj38ySvXQ2o-e1Rtq6zm6qB0IPwIGotZ2Q_GXGDa_heM2UzDC7bm93dn5_TCaL-DXDTKeoGw6e37fmjAS98V83ogfebHJhFpFkSgs8XslG738amtg1KMkuMkXM1khGo',
    category: 'Equipe',
    title: 'Sensei Gagliard'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCp1amdxXCgQoYgknLYNo3y_64dPHZBPku9Am-lkr8_zsG7bLR3GUI1jdpVm10E1kML-rZDusgTfGFeYoKDqISiN5izlRTSQvXEKyZH4Ft2NKt1ql_rsvMb0j2Qj9AQyKeD5ZuGtrT14jGea6aEntc3xjFxtk3mV1CYUYWVbKSJEgtr--zaI_eGRaJ_kcb52zJ8w3KzaAW-WHRtcBGAgKVXweVrJBhjVPFBYs60Hxu6LwgLNdh8Zk-7ZTZ5JZhoVlKH7gGKafCbFzo',
    category: 'Kids',
    title: 'Iniciação Esportiva'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ONUTDgcR0S_YUY73XY1YUSQY6ZB3XP1TCnWq479n2c2HhTc33mNGEM9n3utFMHcSm3BIccSQ-OkmrDq6da_wJGofvCYVpT8eqL274FlM788fvhgye7V8ekV893qG1jCPlu9rcdNBRBQc_NbYq1CHfEmxbhG2iFCf8kvIb10k_iYh1qujzNx7HrRRyRrm9rt10vKW3Rch9DtD6-hEwtG5BjNEk7Ma2jspCIKKsweu_fZjfXSmIQ8hpsIcXddal5K_q5w8YfUBar4',
    category: 'Competições',
    title: 'Campeonato Estadual'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAAQcKB3EPf9UvqkorMdHdQ1nfXi80eNCDUoBFAS973y97pQ0Y2LHEvl9eiLof4Yu6U_dvJTkPy23RVXlwbaxeINP0gAWJvdTxGQ0wH_t4xHvpKGWgZsa0s5ZoXWy5UrsZQSB7vdVqcJ7FHj-7oRHoQ4zxKg4neC150lMadhhVv7mKQ6KiaudQtil9ZHnlgitMcuzgu94kmuHzzQIeznZqHuODbE3KWVWODVOBkuLmtb7jhRB0-lwsxMQJby5pRlD4bBRqHnq_LI0',
    category: 'Graduações',
    title: 'Exame de Faixa'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb91Py20_4NvusUsQczinzuc_nHgQuGAK7Es3V8KxbAlQkbPeBWYRbRWjc3Un1PcAIdMbwn12W0Vm0YlffLdbswMPPiZr5f67lGJtwHfjgNyuO7ul0YJ3AfXHpEqqNUvdO8tHPrjS7HFTWBY-hZnJcPcoj2yQKYB-vcAal6AVV5dWUCeSMxQHYXn_hSIa-aJR0IV4IvcHFhwaixoEBMXxb2CD8YIENa52AV3lDQqJqsMJ52xK5QKQHbRnxodGw0j5KdbcMs4hKU7s',
    category: 'Treinos',
    title: 'Técnica de Ippon'
  },
  {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaMegLtk9RdsOUXBgjVrQNz-l_v4-KYORrFqb76uwleL91yjxfIlKouhFtL1-T3iyhil2UqNrS6AaHITFRMxM-5gzjLz9Bz0SlLGdOhU06oTpHOH_NMg-DN0l_5a-hP44MXm8yVylx1TVs3c3XaAy2DSLDuv0ZVGHsFkp9ZTV6fYsqsRKWWby_2vxMVgHwsCaGgqhygZEV4c9p_QXuUGZEKnjrNN_9Nwrz44PeyPIkJEOsyoLlXi4Nyqt9jjl73Iba662T1V0whz0',
    category: 'Treinos',
    title: 'Respeito e Disciplina'
  }
];

const CATEGORIES = ['Todos', 'Competições', 'Treinos', 'Graduações', 'Kids'];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredImages = activeCategory === 'Todos' 
    ? IMAGES 
    : IMAGES.filter(img => img.category === activeCategory);

  return (
    <section id="galeria" className="py-16 md:py-20 bg-background-light dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4 uppercase">
            Nossa História
          </h2>
          <div className="w-16 md:w-24 h-1 bg-primary mx-auto mb-4 md:mb-6"></div>
        </div>

        {/* Filter Buttons - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 mb-8 md:mb-12 scrollbar-hide px-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg ring-2 ring-primary ring-offset-2 ring-offset-background-light dark:ring-offset-background-dark'
                  : 'bg-white dark:bg-card-dark text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 border border-gray-200 dark:border-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry/Grid */}
        <div className="columns-2 md:columns-2 lg:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6">
          {filteredImages.map((img, idx) => (
            <div key={idx} className="break-inside-avoid group relative overflow-hidden rounded-lg md:rounded-xl shadow-md md:shadow-lg bg-white dark:bg-card-dark">
              <img 
                alt={img.title}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                src={img.src}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-6">
                <span className="text-primary font-bold text-[10px] md:text-sm uppercase tracking-wider mb-0.5 md:mb-1">{img.category}</span>
                <h3 className="text-white font-display font-bold text-sm md:text-xl leading-tight">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <button className="inline-flex items-center space-x-2 text-primary hover:text-red-700 font-bold text-base md:text-lg transition-colors group">
            <span>Carregar mais fotos</span>
            <Expand className="h-4 w-4 md:h-5 md:w-5 transform group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};