import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Calendar, User, ArrowRight, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Link } from 'react-router-dom';

type BlogPost = {
    id: string;
    titulo: string;
    resumo: string;
    imagem: string;
    categoria: string;
    data_publicacao: string;
    autor?: string;
};

export const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');

    useEffect(() => {
        const fetchPosts = async () => {
            const { data } = await (supabase.from('blog_posts' as any) as any)
                .select('*')
                .eq('ativo', true)
                .order('data_publicacao', { ascending: false });

            setPosts(data || []);
            setLoading(false);
        };

        fetchPosts();
    }, []);

    const categories = ['Todos', ...Array.from(new Set(posts.map(post => post.categoria)))];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.resumo.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || post.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="bg-white min-h-screen pt-20">
            <Helmet>
                <title>Blog Corporativo | Insights e Novidades | Coworking MB</title>
                <meta name="description" content="Acompanhe as últimas tendências sobre empreendedorismo, networking e produtividade em Angola no blog da Coworking MB." />
                <link rel="canonical" href="https://coworking.mulatobusiness.com/blog" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-brand-dark overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-brand-dark"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-3 py-1 rounded-full border border-gold/30 text-gold text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                            Conhecimento & Insights
                        </span>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                            Blog <span className="gold-gradient-text italic">Corporativo</span>
                        </h1>
                        <p className="text-gray-300 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            Dicas de produtividade, novidades do mercado angolano e tudo o que precisa para fazer crescer o seu negócio.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters & Search */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${selectedCategory === cat
                                        ? 'bg-brand-dark text-white border-brand-dark shadow-md'
                                        : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gold hover:text-gold'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Pesquisar artigos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/20 focus:border-gold transition-all text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Blog Grid */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="space-y-4">
                                <Skeleton className="h-56 rounded-2xl w-full" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-8 w-full" />
                                <Skeleton className="h-20 w-full" />
                            </div>
                        ))}
                    </div>
                ) : filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, i) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                            >
                                <Link to={`/blog/${post.id}`} className="block relative overflow-hidden h-56">
                                    <img
                                        src={post.imagem}
                                        alt={post.titulo}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-white/90 backdrop-blur-sm text-gold-dark text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                                            {post.categoria}
                                        </span>
                                    </div>
                                </Link>

                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-4 font-medium uppercase tracking-wider">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} className="text-gold" />
                                            <span>{format(new Date(post.data_publicacao), "dd MMM yyyy", { locale: pt })}</span>
                                        </div>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} className="text-gold" />
                                            <span>5 min leitura</span>
                                        </div>
                                    </div>

                                    <Link to={`/blog/${post.id}`}>
                                        <h3 className="text-xl font-serif font-bold text-brand-dark mb-3 group-hover:text-gold transition-colors line-clamp-2 leading-snug">
                                            {post.titulo}
                                        </h3>
                                    </Link>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.resumo}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                                        <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-xs font-bold text-brand-dark uppercase tracking-widest group/btn">
                                            Continuar Lendo
                                            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform text-gold" />
                                        </Link>

                                        <button className="text-gray-300 hover:text-gold transition-colors">
                                            <Tag size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 px-4">
                        <div className="bg-gray-50 inline-flex p-6 rounded-full mb-6">
                            <Search size={40} className="text-gray-300" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-brand-dark mb-2">Nenhum artigo encontrado</h3>
                        <p className="text-gray-500">Tente ajustar a sua pesquisa ou os filtros de categoria.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('Todos'); }}
                            className="mt-6 text-gold font-bold underline"
                        >
                            Limpar todos os filtros
                        </button>
                    </div>
                )}
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gold/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 gold-gradient-bg opacity-5 rounded-bl-full"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Pronto para elevar o seu negócio?</h2>
                            <p className="text-gray-500 mb-8 max-w-xl mx-auto">
                                Visite os nossos espaços na Centralidade do Kilamba e descubra por que somos o melhor coworking de Luanda.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    to="/contacto"
                                    className="gold-gradient-bg text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm shadow-lg hover:shadow-gold/30 transition-all duration-300"
                                >
                                    Agendar Visita
                                </Link>
                                <button
                                    onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="bg-brand-dark text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-sm hover:bg-black transition-all duration-300"
                                >
                                    Reservar Agora
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
