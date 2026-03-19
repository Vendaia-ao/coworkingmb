import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Tag, Calendar, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

type BlogPost = {
    id: string;
    titulo: string;
    resumo: string;
    conteudo: string | null;
    imagem: string | null;
    categoria: string;
    data_publicacao: string;
};

export const BlogSinglePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        (supabase.from('blog_posts' as any) as any)
            .select('*')
            .eq('id', id)
            .single()
            .then(({ data, error }: any) => {
                if (error) {
                    console.error("Error fetching blog post:", error);
                } else {
                    setPost(data);
                }
                setLoading(false);
            });

        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="pt-24 min-h-screen bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <Skeleton className="h-6 w-32 mb-8" />
                    <Skeleton className="h-12 w-full mb-6" />
                    <Skeleton className="h-4 w-48 mb-12" />
                    <Skeleton className="h-96 w-full rounded-2xl mb-12" />
                    <div className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="pt-32 min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Artigo não encontrado</h2>
                <p className="text-gray-500 mb-8">O artigo que procura pode ter sido removido ou o link está incorreto.</p>
                <Link to="/" className="gold-gradient-bg text-white px-8 py-3 rounded-sm font-bold shadow-lg">
                    Voltar ao Início
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen bg-white">
            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gold z-50 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
            />

            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                {/* Navigation */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gold-dark transition-colors mb-12 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Voltar para Home
                </Link>

                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-gold/10 text-gold-dark text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-gold/20">
                            {post.categoria}
                        </span>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-medium tracking-wide">
                            <Calendar size={12} />
                            <span>{format(new Date(post.data_publicacao), "dd 'de' MMMM 'de' yyyy", { locale: pt })}</span>
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-dark leading-tight mb-8">
                        {post.titulo}
                    </h1>

                    <p className="text-xl text-gray-500 font-light leading-relaxed border-l-4 border-gold pl-6">
                        {post.resumo}
                    </p>
                </header>

                {/* Featured Image */}
                {post.imagem && (
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-16 aspect-[16/9]">
                        <img
                            src={post.imagem}
                            alt={post.titulo}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content */}
                <div
                    className="prose prose-lg prose-gold max-w-none prose-headings:font-serif prose-headings:text-brand-dark prose-p:text-gray-600 prose-p:leading-relaxed prose-img:rounded-xl shadow-none whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ __html: post.conteudo || '' }}
                />

                {/* Footer info */}
                <footer className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full gold-gradient-bg flex items-center justify-center text-white font-bold">
                            MB
                        </div>
                        <div>
                            <p className="text-sm font-bold text-brand-dark">Equipa Mulato Business</p>
                            <p className="text-xs text-gray-500">Especialistas em Experiência Coworking</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Partilhar:</p>
                        {/* Simple share buttons would go here */}
                        <div className="flex gap-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 hover:bg-gold/10 hover:border-gold transition-colors cursor-pointer" />
                            ))}
                        </div>
                    </div>
                </footer>
            </article>

            {/* Recommended/More Section (Static for now) */}
            <section className="bg-gray-50 py-24 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-serif font-bold text-brand-dark mb-12">Mais Artigos do Nosso Blog</h2>
                    <Link to="/" className="inline-block text-gold-dark font-bold hover:underline mb-8">
                        Ver todos os artigos
                    </Link>
                </div>
            </section>
        </div>
    );
};
