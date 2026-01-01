import React, { useEffect } from 'react';
import { X, Calendar, Clock, ArrowLeft } from 'lucide-react';
import { NewsArticle, getCategoryInfo, formatDate } from '../data/newsData';

interface NewsModalProps {
    isOpen: boolean;
    onClose: () => void;
    article: NewsArticle | null;
}

export const NewsModal: React.FC<NewsModalProps> = ({ isOpen, onClose, article }) => {
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

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen || !article) return null;

    const categoryInfo = getCategoryInfo(article.category);

    // Parse markdown-like content (simple bold support)
    const parseContent = (content: string) => {
        return content.split('\n').map((line, idx) => {
            if (line.startsWith('**') && line.endsWith('**')) {
                return (
                    <h3 key={idx} className="font-bold text-lg text-gray-900 dark:text-white mt-6 mb-2">
                        {line.replace(/\*\*/g, '')}
                    </h3>
                );
            }
            if (line.startsWith('- ')) {
                return (
                    <li key={idx} className="text-gray-600 dark:text-gray-300 ml-4">
                        {line.substring(2)}
                    </li>
                );
            }
            if (line.trim() === '') {
                return <br key={idx} />;
            }
            return (
                <p key={idx} className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {line}
                </p>
            );
        });
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 backdrop-blur-sm overflow-y-auto py-8 px-4"
            onClick={onClose}
        >
            <div
                className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-full max-w-3xl my-auto animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    aria-label="Fechar"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Image Header */}
                {article.image_url && (
                    <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-6">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryInfo.bgClass} ${categoryInfo.textClass}`}>
                                {categoryInfo.label}
                            </span>
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="p-6 sm:p-8">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(article.published_at)}
                        </span>
                        <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {article.read_time_minutes} min de leitura
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                        {article.title}
                    </h1>

                    {/* Article Content */}
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        {parseContent(article.content || '')}
                    </article>

                    {/* Back Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={onClose}
                            className="inline-flex items-center text-primary hover:text-red-700 font-bold transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Voltar para notícias
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
