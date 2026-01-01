import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const { user, loading, signIn } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if already logged in
    if (!loading && user) {
        return <Navigate to="/admin" replace />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsSubmitting(true);

        if (isSignUp) {
            const { supabase } = await import('../lib/supabase');
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) {
                setError(error.message);
            } else {
                setMessage('Conta criada! Tente fazer login agora.');
                setIsSignUp(false);
            }
        } else {
            const { error } = await signIn(email, password);
            if (error) {
                setError('Email ou senha inválidos');
            }
        }

        setIsSubmitting(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
            <div className="w-full max-w-md">
                {/* Logo/Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-4">
                        <Lock className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-3xl font-display font-bold text-white uppercase">
                        {isSignUp ? 'Criar Conta' : 'Admin'}
                    </h1>
                    <p className="text-gray-400 mt-2">
                        {isSignUp ? 'Preencha os dados abaixo' : 'Faça login para acessar o painel'}
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-zinc-700">

                    {/* Success Message */}
                    {message && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-center gap-3 text-green-400">
                            <Lock className="h-5 w-5 flex-shrink-0" />
                            <span>{message}</span>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 text-red-400">
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Email Field */}
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                            Senha
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full pl-12 pr-12 py-3 bg-zinc-900 border border-zinc-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-4 bg-primary hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                <span>{isSignUp ? 'Criando...' : 'Entrando...'}</span>
                            </>
                        ) : (
                            <span>{isSignUp ? 'Criar Conta' : 'Entrar'}</span>
                        )}
                    </button>

                    {/* Toggle Login/SignUp */}
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-primary hover:text-red-400 text-sm font-medium transition-colors"
                        >
                            {isSignUp ? 'Já tenho uma conta. Entrar' : 'Primeiro acesso? Clique aqui'}
                        </button>
                    </div>
                </form>

                {/* Back Link */}
                <div className="text-center mt-6">
                    <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                        ← Voltar para o site
                    </a>
                </div>
            </div>
        </div>
    );
};
