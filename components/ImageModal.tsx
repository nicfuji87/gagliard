import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string | null;
    altText?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, altText }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen || !imageUrl) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-10"
            >
                <X className="h-8 w-8" />
            </button>

            <div
                className="relative max-w-full max-h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={imageUrl}
                    alt={altText || 'Imagem ampliada'}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                />
            </div>

            {/* Click outside to close */}
            <div className="absolute inset-0 -z-10" onClick={onClose}></div>
        </div>
    );
};
