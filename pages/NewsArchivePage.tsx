import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, Tag, Search, Filter } from 'lucide-react';
import { fetchNews, NewsArticle, getCategoryInfo, formatShortDate } from '../data/newsData';
import { NewsModal } from '../components/NewsModal';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const ARTICLES_PER_PAGE = 6;

export const NewsArchivePage: React.FC = () => {
    const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadNews = async () => {
            const data = await fetchNews();
            setArticles(data);
            setLoading(false);
        };
        loadNews();
    }, []);

    // Sort articles by date (newest first)
    const sortedArticles = [...articles].sort((a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );

    // Filter by category and search
    const filteredArticles = sortedArticles.filter(article => {
        const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (article.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
        return matchesCategory && matchesSearch;
    });

    // Pagination
    const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ARTICLES_PER_PAGE);

    // Get unique categories
    const categories = [
        { value: 'all', label: 'Todas' },
        { value: 'competicao', label: 'Competições' },
        { value: 'graduacao', label: 'Graduação' },
        { value: 'aviso', label: 'Avisos' },
        { value: 'evento', label: 'Eventos' },
    ];

    const openArticle = (article: NewsArticle) => {
        setSelectedArticle(article);
    };

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gray-50 dark:bg-zinc-900">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-12">
                        <Link
                            to="/"
                            className="inline-flex items-center text-primary hover:text-red-700 font-medium mb-6 transition-colors"
                        >
                            <ChevronLeft className="h-5 w-5 mr-1" />
                            Voltar para o site
                        </Link>
                        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-text-light dark:text-white uppercase">
                            Arquivo de <span className="text-primary">Notícias</span>
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mt-4 text-lg">
                            Todas as notícias e atualizações do Judô Gagliard
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 dark:border-gray-700">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Buscar notícias..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                                    className="px-4 py-3 bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-gray-900 dark:text-white"
                                >
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Results count */}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                            {filteredArticles.length} {filteredArticles.length === 1 ? 'notícia encontrada' : 'notícias encontradas'}
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                            <p className="text-gray-500 mt-4">Carregando notícias...</p>
                        </div>
                    ) : paginatedArticles.length > 0 ? (
                        /* Articles Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {paginatedArticles.map((article) => {
                                const categoryInfo = getCategoryInfo(article.category);
                                return (
                                    <article
                                        key={article.id}
                                        onClick={() => openArticle(article)}
                                        className="bg-white dark:bg-card-dark rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800 cursor-pointer group"
                                    >
                                        {article.image_url ? (
                                            <div className="h-48 relative overflow-hidden">
                                                <img
                                                    alt={article.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    src={article.image_url}
                                                />
                                                {article.featured && (
                                                    <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full uppercase">
                                                        Destaque
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="h-48 relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                                <Tag className="h-12 w-12 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${categoryInfo.bgClass} ${categoryInfo.textClass}`}>
                                                    {categoryInfo.label}
                                                </span>
                                                <span className="text-xs text-gray-500 flex items-center">
                                                    <Clock className="h-3 w-3 mr-1" /> {article.read_time_minutes} min
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                                {article.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                                                {article.excerpt}
                                            </p>
                                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                <Calendar className="h-4 w-4 mr-1" />
                                                {formatShortDate(article.published_at)}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <Tag className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">Nenhuma notícia encontrada</h3>
                            <p className="text-gray-500 dark:text-gray-500 mt-2">Tente ajustar os filtros de busca</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Anterior
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-bold transition-colors ${currentPage === page
                                            ? 'bg-primary text-white'
                                            : 'bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-zinc-700'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors"
                            >
                                Próxima
                            </button>
                        </div>
                    )}

                </div>
            </main>

            <Footer />

            {/* News Modal */}
            <NewsModal
                isOpen={!!selectedArticle}
                onClose={() => setSelectedArticle(null)}
                article={selectedArticle}
            />
        </div>
    );
};
