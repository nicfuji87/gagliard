import React, { useEffect } from 'react';
import { X, Clock } from 'lucide-react';

interface ScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SCHEDULE = [
    { day: 'Segunda', times: ['09:00 - 10:00 (Infantil)', '18:00 - 19:30 (Adulto)', '19:30 - 21:00 (Competição)'] },
    { day: 'Terça', times: ['08:00 - 09:00 (Baby)', '18:30 - 20:00 (Iniciante)', '20:00 - 21:30 (Avançado)'] },
    { day: 'Quarta', times: ['09:00 - 10:00 (Infantil)', '18:00 - 19:30 (Adulto)', '19:30 - 21:00 (Competição)'] },
    { day: 'Quinta', times: ['08:00 - 09:00 (Baby)', '18:30 - 20:00 (Iniciante)', '20:00 - 21:30 (Avançado)'] },
    { day: 'Sexta', times: ['17:00 - 18:00 (Treino Livre)', '18:30 - 20:00 (Geral)'] },
    { day: 'Sábado', times: ['09:00 - 11:00 (Aulão Geral)'] },
];

export const ScheduleModal: React.FC<ScheduleModalProps> = ({ isOpen, onClose }) => {
    // Prevent scrolling when modal is open
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="bg-primary px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white">
                        <Clock className="h-6 w-6" />
                        <h2 className="text-xl font-bold font-display uppercase tracking-wide">Horários de Treino</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 max-h-[70vh] overflow-y-auto">
                    <div className="grid gap-4">
                        {SCHEDULE.map((item, index) => (
                            <div
                                key={item.day}
                                className={`p-4 rounded-xl border ${index % 2 === 0
                                    ? 'bg-gray-50 dark:bg-zinc-800/50 border-gray-100 dark:border-zinc-700'
                                    : 'bg-white dark:bg-zinc-900 border-gray-100 dark:border-zinc-800'
                                    }`}
                            >
                                <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                                    {item.day}-Feira
                                    {item.day === 'Sábado' && <span className="text-xs font-normal text-gray-500 bg-gray-200 dark:bg-zinc-700 px-2 py-0.5 rounded-full ml-auto">Fim de Semana</span>}
                                </h3>
                                <ul className="space-y-2">
                                    {item.times.map((time, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
                                            {time}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-zinc-800/50 p-4 text-center border-t border-gray-100 dark:border-zinc-800">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        * Horários sujeitos a alterações.
                    </p>
                </div>
            </div>
        </div >
    );
};
