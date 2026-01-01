import React, { useState, useEffect } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase, SITE_ID } from '../lib/supabase';
import {
    LogOut, Plus, Edit2, Trash2, Save, X, Upload,
    Newspaper, Home, Eye, EyeOff, Star, StarOff,
    Search, Calendar, Clock, AlertCircle, CheckCircle, Sparkles
} from 'lucide-react';

interface NewsArticle {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image_url: string;
    category: string;
    published_at: string;
    read_time_minutes: number;
    featured: boolean;
    published: boolean;
}

const CATEGORIES = [
    { value: 'competicao', label: 'Competições' },
    { value: 'graduacao', label: 'Graduação' },
    { value: 'aviso', label: 'Aviso' },
    { value: 'evento', label: 'Evento' },
];

export const AdminPage: React.FC = () => {
    const { user, loading, signOut } = useAuth();
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');

    // AI Import State
    const [isImporting, setIsImporting] = useState(false);
    const [importUrl, setImportUrl] = useState('');
    const [importRawText, setImportRawText] = useState('');
    const [importMode, setImportMode] = useState<'url' | 'text'>('url');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

    // Fetch articles - must be before any conditional returns for hooks rules
    useEffect(() => {
        if (user) {
            fetchArticles();
        }
    }, [user]);

    const fetchArticles = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('news')
            .select('*')
            .eq('site_id', SITE_ID)
            .order('published_at', { ascending: false });

        if (error) {
            showNotification('error', 'Erro ao carregar notícias');
        } else {
            setArticles(data || []);
        }
        setIsLoading(false);
    };

    const handleImportAI = async () => {
        if (importMode === 'url' && !importUrl) return;
        if (importMode === 'text' && !importRawText) return;
        setIsGenerating(true);

        try {
            const body = importMode === 'url'
                ? { url: importUrl }
                : { rawText: importRawText };

            const { data, error } = await supabase.functions.invoke('generate-post', {
                body
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            setEditingArticle({
                id: '',
                title: data.title || '',
                slug: '',
                excerpt: data.excerpt || '',
                content: data.content || '', // Expect markdown
                image_url: data.image_url || '',
                category: data.category || 'aviso',
                published_at: new Date().toISOString().split('T')[0],
                read_time_minutes: data.read_time_minutes || 3,
                featured: false,
                published: false // Draft by default
            });

            setIsImporting(false);
            setImportUrl('');
            setImportRawText('');
            setIsCreating(true);
            showNotification('success', 'Conteúdo gerado com IA!');
        } catch (error: any) {
            console.error('AI Error:', error);
            showNotification('error', 'Erro ao gerar conteúdo: ' + (error.message || 'Tente novamente.'));
        } finally {
            setIsGenerating(false);
        }
    };

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message });
        setTimeout(() => setNotification(null), 4000);
    };

    // Redirect if not logged in - after all hooks
    if (!loading && !user) {
        return <Navigate to="/login" replace />;
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // ... existing helpers ...

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const uploadImage = async (file: File): Promise<string | null> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${SITE_ID}/${Date.now()}.${fileExt}`;

        const { error } = await supabase.storage
            .from('media')
            .upload(fileName, file);

        if (error) {
            console.error('Upload error:', error);
            return null;
        }

        const { data } = supabase.storage
            .from('media')
            .getPublicUrl(fileName);

        return data.publicUrl;
    };

    const handleSave = async (article: Partial<NewsArticle>) => {
        let imageUrl = article.image_url;

        // Upload new image if selected
        if (imageFile) {
            const uploadedUrl = await uploadImage(imageFile);
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            } else {
                showNotification('error', 'Erro ao fazer upload da imagem');
                return;
            }
        }

        // Build article data, excluding id for new articles
        const { id, ...articleWithoutId } = article;
        const slug = article.slug || generateSlug(article.title || '');

        if (!slug) {
            showNotification('error', 'O título é obrigatório');
            return;
        }

        const articleData = {
            ...articleWithoutId,
            image_url: imageUrl,
            site_id: SITE_ID,
            slug: slug,
        };

        console.log('Saving article:', articleData);

        if (editingArticle?.id) {
            // Update existing
            const { error } = await supabase
                .from('news')
                .update(articleData)
                .eq('id', editingArticle.id);

            if (error) {
                console.error('Update error:', error);
                showNotification('error', 'Erro ao atualizar: ' + error.message);
            } else {
                showNotification('success', 'Notícia atualizada com sucesso!');
                setEditingArticle(null);
                fetchArticles();
            }
        } else {
            // Create new (don't send id - let database generate it)
            const { error } = await supabase
                .from('news')
                .insert(articleData);

            if (error) {
                console.error('Insert error:', error);
                showNotification('error', 'Erro ao criar: ' + error.message);
            } else {
                showNotification('success', 'Notícia criada com sucesso!');
                setIsCreating(false);
                fetchArticles();
            }
        }

        setImageFile(null);
        setImagePreview('');
        setEditingArticle(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta notícia?')) return;

        const { error } = await supabase
            .from('news')
            .delete()
            .eq('id', id);

        if (error) {
            showNotification('error', 'Erro ao excluir notícia');
        } else {
            showNotification('success', 'Notícia excluída!');
            fetchArticles();
        }
    };

    const togglePublished = async (article: NewsArticle) => {
        const { error } = await supabase
            .from('news')
            .update({ published: !article.published })
            .eq('id', article.id);

        if (!error) {
            fetchArticles();
        }
    };

    const toggleFeatured = async (article: NewsArticle) => {
        const { error } = await supabase
            .from('news')
            .update({ featured: !article.featured })
            .eq('id', article.id);

        if (!error) {
            fetchArticles();
        }
    };

    const filteredArticles = articles.filter(a =>
        a.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-zinc-900">
            {/* Notification */}
            {notification && (
                <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
                    } text-white`}>
                    {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    {notification.message}
                </div>
            )}

            {/* Header */}
            <header className="bg-zinc-800 border-b border-zinc-700 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Newspaper className="h-8 w-8 text-primary" />
                            <h1 className="text-xl font-bold text-white">Admin - Notícias</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                <Home className="h-5 w-5" />
                                <span className="hidden sm:inline">Ver Site</span>
                            </Link>
                            <button
                                onClick={signOut}
                                className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                <span className="hidden sm:inline">Sair</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Actions Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar notícias..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-white"
                        />
                    </div>

                    {/* Botão AI Import */}
                    <button
                        onClick={() => setIsImporting(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors"
                    >
                        <Newspaper className="h-5 w-5" />
                        Criar com IA
                    </button>

                    <button
                        onClick={() => {
                            setIsCreating(true);
                            setEditingArticle({
                                id: '',
                                title: '',
                                slug: '',
                                excerpt: '',
                                content: '',
                                image_url: '',
                                category: 'aviso',
                                published_at: new Date().toISOString().split('T')[0],
                                read_time_minutes: 2,
                                featured: false,
                                published: true,
                            });
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-red-700 text-white rounded-xl font-bold transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        Nova Notícia
                    </button>
                </div>

                {/* ... Rest of stats and list ... */}
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                        <p className="text-gray-400 text-sm">Total</p>
                        <p className="text-2xl font-bold text-white">{articles.length}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                        <p className="text-gray-400 text-sm">Publicadas</p>
                        <p className="text-2xl font-bold text-green-500">{articles.filter(a => a.published).length}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                        <p className="text-gray-400 text-sm">Rascunhos</p>
                        <p className="text-2xl font-bold text-yellow-500">{articles.filter(a => !a.published).length}</p>
                    </div>
                    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700">
                        <p className="text-gray-400 text-sm">Destaque</p>
                        <p className="text-2xl font-bold text-primary">{articles.filter(a => a.featured).length}</p>
                    </div>
                </div>

                {/* Articles List */}
                {isLoading ? (
                    <div className="text-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
                    </div>
                ) : filteredArticles.length === 0 ? (
                    <div className="text-center py-16 bg-zinc-800 rounded-2xl border border-zinc-700">
                        <Newspaper className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-400">Nenhuma notícia encontrada</h3>
                        <p className="text-gray-500 mt-2">Clique em "Nova Notícia" para começar</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredArticles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-zinc-800 rounded-xl border border-zinc-700 overflow-hidden hover:border-zinc-600 transition-colors"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Image */}
                                    {article.image_url && (
                                        <div className="w-full md:w-48 h-32 md:h-auto flex-shrink-0">
                                            <img
                                                src={article.image_url}
                                                alt={article.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="flex-1 p-4 flex flex-col md:flex-row md:items-center gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${article.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                    {article.published ? 'Publicada' : 'Rascunho'}
                                                </span>
                                                {article.featured && (
                                                    <span className="text-xs font-bold uppercase px-2 py-1 rounded bg-primary/20 text-primary">
                                                        Destaque
                                                    </span>
                                                )}
                                                <span className="text-xs text-gray-500">{article.category}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-white">{article.title}</h3>
                                            <p className="text-gray-400 text-sm mt-1 line-clamp-1">{article.excerpt}</p>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="h-4 w-4" />
                                                    {new Date(article.published_at).toLocaleDateString('pt-BR')}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="h-4 w-4" />
                                                    {article.read_time_minutes} min
                                                </span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => toggleFeatured(article)}
                                                className={`p-2 rounded-lg transition-colors ${article.featured ? 'bg-primary/20 text-primary' : 'bg-zinc-700 text-gray-400 hover:text-white'
                                                    }`}
                                                title={article.featured ? 'Remover destaque' : 'Destacar'}
                                            >
                                                {article.featured ? <Star className="h-5 w-5 fill-current" /> : <StarOff className="h-5 w-5" />}
                                            </button>
                                            <button
                                                onClick={() => togglePublished(article)}
                                                className={`p-2 rounded-lg transition-colors ${article.published ? 'bg-green-500/20 text-green-400' : 'bg-zinc-700 text-gray-400 hover:text-white'
                                                    }`}
                                                title={article.published ? 'Despublicar' : 'Publicar'}
                                            >
                                                {article.published ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setEditingArticle(article);
                                                    setIsCreating(true);
                                                }}
                                                className="p-2 rounded-lg bg-zinc-700 text-gray-400 hover:text-white transition-colors"
                                                title="Editar"
                                            >
                                                <Edit2 className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(article.id)}
                                                className="p-2 rounded-lg bg-zinc-700 text-gray-400 hover:text-red-500 transition-colors"
                                                title="Excluir"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* AI Import Modal */}
            {isImporting && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
                    <div className="bg-zinc-800 rounded-2xl w-full max-w-lg shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Newspaper className="h-5 w-5 text-indigo-500" />
                                Criar com IA
                            </h2>
                            <button onClick={() => setIsImporting(false)} className="text-gray-400 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2 mb-6">
                            <button
                                onClick={() => setImportMode('url')}
                                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${importMode === 'url'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                                    }`}
                            >
                                Link
                            </button>
                            <button
                                onClick={() => setImportMode('text')}
                                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${importMode === 'text'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-zinc-700 text-gray-300 hover:bg-zinc-600'
                                    }`}
                            >
                                Texto
                            </button>
                        </div>

                        {importMode === 'url' ? (
                            <>
                                <p className="text-gray-400 mb-4 text-sm">
                                    Cole o link de uma notícia, blog ou post do Instagram.
                                </p>
                                <div className="mb-6">
                                    <input
                                        type="url"
                                        value={importUrl}
                                        onChange={(e) => setImportUrl(e.target.value)}
                                        placeholder="https://..."
                                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-white"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="text-gray-400 mb-4 text-sm">
                                    Cole ou escreva o texto bruto que deseja transformar em notícia.
                                </p>
                                <div className="mb-6">
                                    <textarea
                                        value={importRawText}
                                        onChange={(e) => setImportRawText(e.target.value)}
                                        placeholder="Digite ou cole o texto aqui..."
                                        rows={8}
                                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-white resize-none"
                                    />
                                </div>
                            </>
                        )}

                        <button
                            onClick={handleImportAI}
                            disabled={(importMode === 'url' ? !importUrl : !importRawText) || isGenerating}
                            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-zinc-600 disabled:cursor-not-allowed rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2"
                        >
                            {isGenerating ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                    <span>Gerando...</span>
                                </>
                            ) : (
                                <span>Gerar Notícia</span>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* Edit/Create Modal (Keep existing) */}
            {isCreating && editingArticle && (
                <div className="fixed inset-0 z-50 bg-black/80 flex items-start justify-center overflow-y-auto py-8 px-4">
                    <div className="bg-zinc-800 rounded-2xl w-full max-w-3xl shadow-2xl">
                        {/* ... modal header ... */}
                        <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                            <h2 className="text-xl font-bold text-white">
                                {editingArticle.id ? 'Editar Notícia' : 'Nova Notícia'}
                            </h2>
                            <button
                                onClick={() => {
                                    setIsCreating(false);
                                    setEditingArticle(null);
                                    setImageFile(null);
                                    setImagePreview('');
                                }}
                                className="p-2 rounded-lg bg-zinc-700 text-gray-400 hover:text-white"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Título *</label>
                                <input
                                    type="text"
                                    value={editingArticle.title}
                                    onChange={(e) => setEditingArticle({
                                        ...editingArticle,
                                        title: e.target.value,
                                        slug: generateSlug(e.target.value)
                                    })}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-white"
                                    placeholder="Título da notícia"
                                />
                            </div>

                            {/* Excerpt */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Resumo</label>
                                <textarea
                                    value={editingArticle.excerpt || ''}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, excerpt: e.target.value })}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-white resize-none"
                                    placeholder="Breve resumo da notícia"
                                />
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Conteúdo (Markdown)</label>
                                <textarea
                                    value={editingArticle.content || ''}
                                    onChange={(e) => setEditingArticle({ ...editingArticle, content: e.target.value })}
                                    rows={15}
                                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-white resize-none font-mono text-sm leading-relaxed"
                                    placeholder="# Título\n\nConteúdo da notícia..."
                                />
                                <p className="text-xs text-gray-500 mt-2">Dica: Use Markdown para formatar (negrito com **, listas com -, etc).</p>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Imagem</label>
                                <div className="flex flex-wrap items-center gap-3">
                                    <label className="flex items-center gap-2 px-4 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-xl cursor-pointer transition-colors">
                                        <Upload className="h-5 w-5 text-gray-300" />
                                        <span className="text-gray-300">Selecionar</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                    </label>

                                    <button
                                        type="button"
                                        onClick={async () => {
                                            if (!editingArticle?.title) {
                                                showNotification('error', 'Adicione um título primeiro');
                                                return;
                                            }
                                            setIsGeneratingImage(true);
                                            try {
                                                const { data, error } = await supabase.functions.invoke('generate-image', {
                                                    body: {
                                                        title: editingArticle.title,
                                                        excerpt: editingArticle.excerpt,
                                                        category: editingArticle.category
                                                    }
                                                });
                                                console.log('Generate Image Response:', { data, error });

                                                if (error) {
                                                    console.error('Supabase Function Error:', error);
                                                    throw new Error(error.message || JSON.stringify(error));
                                                }
                                                if (data?.error) {
                                                    console.error('Edge Function Error:', data.error);
                                                    throw new Error(data.error);
                                                }
                                                if (data?.image_url) {
                                                    setEditingArticle({ ...editingArticle, image_url: data.image_url });
                                                    showNotification('success', 'Imagem gerada com IA!');
                                                } else {
                                                    throw new Error('Nenhuma imagem retornada');
                                                }
                                            } catch (err: any) {
                                                console.error('Catch Error:', err);
                                                showNotification('error', 'Erro: ' + (err.message || 'Tente novamente'));
                                            } finally {
                                                setIsGeneratingImage(false);
                                            }
                                        }}
                                        disabled={isGeneratingImage}
                                        className="flex items-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-600 disabled:cursor-not-allowed rounded-xl transition-colors text-white font-medium"
                                    >
                                        {isGeneratingImage ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                                                <span>Gerando...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles className="h-5 w-5" />
                                                <span>Gerar com IA</span>
                                            </>
                                        )}
                                    </button>

                                    {(imagePreview || editingArticle.image_url) && (
                                        <div className="relative group">
                                            <img
                                                src={imagePreview || editingArticle.image_url}
                                                alt="Preview"
                                                className="h-20 w-32 object-cover rounded-lg border border-zinc-600"
                                            />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                <a
                                                    href={imagePreview || editingArticle.image_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-white text-xs hover:underline"
                                                >
                                                    Ver
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">A geração de imagem usa o título e resumo do artigo.</p>
                            </div>

                            {/* Row: Category, Date, Read Time */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
                                    <select
                                        value={editingArticle.category}
                                        onChange={(e) => setEditingArticle({ ...editingArticle, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-white"
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Data</label>
                                    <input
                                        type="date"
                                        value={editingArticle.published_at}
                                        onChange={(e) => setEditingArticle({ ...editingArticle, published_at: e.target.value })}
                                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Tempo de leitura (min)</label>
                                    <input
                                        type="number"
                                        min={1}
                                        value={editingArticle.read_time_minutes}
                                        onChange={(e) => setEditingArticle({ ...editingArticle, read_time_minutes: parseInt(e.target.value) || 2 })}
                                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-primary outline-none text-white"
                                    />
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editingArticle.published}
                                        onChange={(e) => setEditingArticle({ ...editingArticle, published: e.target.checked })}
                                        className="w-5 h-5 rounded border-zinc-600 text-primary focus:ring-primary bg-zinc-900"
                                    />
                                    <span className="text-gray-300">Publicar</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editingArticle.featured}
                                        onChange={(e) => setEditingArticle({ ...editingArticle, featured: e.target.checked })}
                                        className="w-5 h-5 rounded border-zinc-600 text-primary focus:ring-primary bg-zinc-900"
                                    />
                                    <span className="text-gray-300">Destaque</span>
                                </label>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex items-center justify-end gap-4 p-6 border-t border-zinc-700">
                            <button
                                onClick={() => {
                                    setIsCreating(false);
                                    setEditingArticle(null);
                                    setImageFile(null);
                                    setImagePreview('');
                                }}
                                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white rounded-xl font-medium transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleSave(editingArticle)}
                                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-red-700 text-white rounded-xl font-bold transition-colors"
                            >
                                <Save className="h-5 w-5" />
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
