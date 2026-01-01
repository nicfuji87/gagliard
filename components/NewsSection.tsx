import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Clock, ChevronRight, Tag, Archive } from 'lucide-react';
import { fetchNews, NewsArticle, getCategoryInfo, formatDate, formatShortDate } from '../data/newsData';
import { NewsModal } from './NewsModal';

// Number of articles to show on homepage (excluding featured)
const HOMEPAGE_LIMIT = 2;

export const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
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

  // Sort articles by date (newest first) and get featured
  const sortedArticles = [...articles].sort((a, b) =>
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );

  const featuredArticle = sortedArticles.find(a => a.featured) || sortedArticles[0];
  const otherArticles = featuredArticle
    ? sortedArticles.filter(a => a.id !== featuredArticle.id)
    : sortedArticles.slice(1);

  // Show only limited articles on homepage
  const visibleArticles = otherArticles.slice(0, HOMEPAGE_LIMIT);
  const totalArticles = articles.length;

  const openArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
  };

  if (loading) {
    return (
      <section id="noticias" className="py-20 bg-gray-50 dark:bg-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-500 mt-4">Carregando notícias...</p>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section id="noticias" className="py-20 bg-gray-50 dark:bg-zinc-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-base text-primary font-bold tracking-wide uppercase mb-2">Fique Atualizado</h2>
            <h1 className="font-display text-4xl font-extrabold text-text-light dark:text-white sm:text-5xl uppercase">
              Últimas Notícias
            </h1>
          </div>
          <div className="text-center py-16 bg-white dark:bg-zinc-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <Tag className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 dark:text-gray-400">Nenhuma notícia disponível</h3>
            <p className="text-gray-500 dark:text-gray-500 mt-2">Em breve teremos novidades!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="noticias" className="py-20 bg-gray-50 dark:bg-zinc-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="font-display text-base text-primary font-bold tracking-wide uppercase mb-2">Fique Atualizado</h2>
          <h1 className="font-display text-4xl font-extrabold text-text-light dark:text-white sm:text-5xl uppercase">
            Últimas Notícias
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article - Takes 2 columns */}
          {featuredArticle && (
            <div className="lg:col-span-2">
              <div
                onClick={() => openArticle(featuredArticle)}
                className="relative rounded-2xl overflow-hidden shadow-xl group cursor-pointer bg-white dark:bg-card-dark h-full border border-gray-100 dark:border-gray-800 transition-all hover:shadow-2xl"
              >
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  {featuredArticle.image_url ? (
                    <img
                      alt={featuredArticle.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={featuredArticle.image_url}
                    />
                  ) : (
                    <div className="absolute inset-0 w-full h-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">
                      <Tag className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Destaque</div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{formatDate(featuredArticle.published_at)}</span>
                    <span className="mx-2">•</span>
                    <span className="text-primary font-medium">{getCategoryInfo(featuredArticle.category).label}</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <span className="inline-flex items-center text-primary font-bold hover:text-red-700 transition-colors">
                    Ler matéria completa <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar Articles List */}
          <div className="space-y-6">

            {visibleArticles.map((article) => {
              const categoryInfo = getCategoryInfo(article.category);
              return (
                <article
                  key={article.id}
                  onClick={() => openArticle(article)}
                  className="bg-white dark:bg-card-dark rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 flex flex-col cursor-pointer"
                >
                  {article.image_url ? (
                    <div className="h-32 relative overflow-hidden">
                      <img alt={article.title} className="w-full h-full object-cover" src={article.image_url} />
                    </div>
                  ) : (
                    <div className="h-32 relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Tag className="h-10 w-10 text-gray-400" />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${categoryInfo.bgClass} ${categoryInfo.textClass}`}>
                        {categoryInfo.label}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {article.read_time_minutes} min
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400">{formatShortDate(article.published_at)}</span>
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </article>
              );
            })}

            {/* Archive Button */}
            {totalArticles > 0 && (
              <Link
                to="/noticias"
                className="w-full py-4 px-4 bg-primary hover:bg-red-700 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-white font-bold text-lg group"
              >
                <Archive className="h-5 w-5" />
                <span>Ver arquivo completo</span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{totalArticles}</span>
              </Link>
            )}

          </div>
        </div>

      </div>

      {/* News Modal */}
      <NewsModal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        article={selectedArticle}
      />
    </section>
  );
};