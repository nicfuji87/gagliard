import React, { useState } from 'react';
import { Expand, ZoomIn } from 'lucide-react';
import { ImageModal } from './ImageModal';
import tecnicoImg from '../assets/images/tecnico.jpg';
import equipeImg from '../assets/images/equipe.jpg';
import copaMinasImg from '../assets/images/copaMinas.jpg';
import podioImg from '../assets/images/podioCompeticao.jpg';
import filhaImg from '../assets/images/filha.jpg';
import criancasImg from '../assets/images/criancas.jpg';
import lutadoresImg from '../assets/images/lutadores.jpg';

const IMAGES = [
  {
    src: filhaImg,
    category: 'Família',
    title: 'Filha'
  },
  {
    src: criancasImg,
    category: 'Kids',
    title: 'Crianças'
  },
  {
    src: podioImg,
    category: 'Competições',
    title: 'Pódio Competição'
  },
  {
    src: copaMinasImg,
    category: 'Treinos',
    title: 'Copa Minas'
  },
  {
    src: equipeImg,
    category: 'Equipe',
    title: 'Equipe'
  },
  {
    src: lutadoresImg,
    category: 'Treinos',
    title: 'Lutadores'
  },
  {
    src: tecnicoImg,
    category: 'Competições',
    title: 'Técnico'
  },
];

export const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageTitle, setSelectedImageTitle] = useState<string>('');

  const openModal = (src: string, title: string) => {
    setSelectedImage(src);
    setSelectedImageTitle(title);
  };

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

        {/* Masonry/Grid */}
        <div className="columns-2 md:columns-2 lg:columns-3 gap-3 md:gap-6 space-y-3 md:space-y-6">
          {IMAGES.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openModal(img.src, img.title)}
              className="break-inside-avoid group relative overflow-hidden rounded-lg md:rounded-xl shadow-md md:shadow-lg bg-white dark:bg-card-dark cursor-pointer"
            >
              <img
                alt={img.title}
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                src={img.src}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ZoomIn className="text-white h-8 w-8 drop-shadow-lg" />
              </div>
            </div>
          ))}
        </div>



      </div>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage}
        altText={selectedImageTitle}
      />
    </section>
  );
};