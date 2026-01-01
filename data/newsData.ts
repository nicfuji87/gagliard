import { supabase, SITE_ID } from '../lib/supabase';

export interface NewsArticle {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    category: 'competicao' | 'graduacao' | 'aviso' | 'evento';
    published_at: string;
    read_time_minutes: number;
    featured: boolean;
    published: boolean;
}

// Fetch all published news for the current site
export const fetchNews = async (): Promise<NewsArticle[]> => {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('site_id', SITE_ID)
        .eq('published', true)
        .order('published_at', { ascending: false });

    if (error) {
        console.error('Error fetching news:', error);
        return [];
    }

    return data || [];
};

// Fetch a single news article by slug
export const fetchNewsBySlug = async (slug: string): Promise<NewsArticle | null> => {
    const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('site_id', SITE_ID)
        .eq('slug', slug)
        .eq('published', true)
        .single();

    if (error) {
        console.error('Error fetching news by slug:', error);
        return null;
    }

    return data;
};

// Helper function to get category label and colors
export const getCategoryInfo = (category: NewsArticle['category']) => {
    const categories = {
        competicao: { label: 'Competições', bgClass: 'bg-red-100 dark:bg-red-900/30', textClass: 'text-primary' },
        graduacao: { label: 'Graduação', bgClass: 'bg-red-100 dark:bg-red-900/30', textClass: 'text-primary' },
        aviso: { label: 'Aviso', bgClass: 'bg-yellow-100 dark:bg-yellow-900/30', textClass: 'text-yellow-700 dark:text-yellow-400' },
        evento: { label: 'Evento', bgClass: 'bg-blue-100 dark:bg-blue-900/30', textClass: 'text-blue-700 dark:text-blue-400' },
    };
    return categories[category] || categories.aviso;
};

// Helper to format date in Portuguese
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
};

// Helper to format short date
export const formatShortDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate();
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${day} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};
