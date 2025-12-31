import React, { useEffect } from 'react';
import { X, CheckCircle, Calendar } from 'lucide-react';

export interface ClassData {
    title: string;
    age: string;
    description: string;
    longDescription?: string;
    benefits?: string[];
    schedule?: string[];
    image: string;
}

interface ClassDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: ClassData | null;
}

export const ClassDetailsModal: React.FC<ClassDetailsModalProps> = ({ isOpen, onClose, data }) => {
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

    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[85vh]">

                {/* Image Section */}
                <div className="w-full md:w-2/5 relative h-48 md:h-auto">
                    <img
                        src={data.image}
                        alt={data.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/50"></div>
                    <div className="absolute bottom-4 left-4 text-white md:hidden">
                        <h2 className="text-2xl font-bold font-display uppercase">{data.title}</h2>
                        <p className="text-sm font-medium opacity-90">{data.age}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full backdrop-blur-sm transition-colors md:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-3/5 p-6 md:p-8 overflow-y-auto bg-white dark:bg-zinc-900">
                    <div className="hidden md:flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold font-display uppercase text-gray-900 dark:text-white leading-none mb-2">{data.title}</h2>
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                {data.age}
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-2">Sobre a Modalidade</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base">
                                {data.longDescription || data.description}
                            </p>
                        </div>

                        {data.benefits && (
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-3">Benefícios</h3>
                                <ul className="space-y-2">
                                    {data.benefits.map((benefit, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {data.schedule && (
                            <div className="bg-gray-50 dark:bg-zinc-800/50 rounded-xl p-4">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide mb-3 flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Horários Sugeridos
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.schedule.map((time, idx) => (
                                        <span key={idx} className="text-xs font-medium px-2.5 py-1 bg-white dark:bg-zinc-700 border border-gray-200 dark:border-zinc-600 rounded-md text-gray-600 dark:text-gray-300">
                                            {time}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800">
                        <a
                            href="#contato"
                            onClick={onClose}
                            className="block w-full bg-primary hover:bg-red-700 text-white text-center py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-red-500/20 active:scale-95 transition-all text-sm"
                        >
                            Agendar Aula Experimental
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
