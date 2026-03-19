import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Tag } from 'lucide-react';
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
};

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (supabase.from('blog_posts' as any) as any).select('*').eq('ativo', true).order('data_publicacao', { ascending: false }).limit(3)
      .then(({ data }: any) => { setPosts(data || []); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-48 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-96 rounded-2xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  const [featured, ...rest] = posts;

  return (
    <section className="py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="inline-block text-xs tracking-[0.25em] text-gold uppercase font-semibold mb-4">Conhecimento</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">
            Blog <span className="text-gold-dark">Corporativo</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">Insights, dicas e novidades do mundo do coworking e empreendedorismo em Angola.</p>
          <div className="w-16 h-[2px] gold-gradient-bg mx-auto rounded-full mt-4" />
        </motion.div>

        {posts.length === 1 ? (
          // Single post - full-width
          <BlogCard post={featured} i={0} featured />
        ) : posts.length === 2 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post, i) => <BlogCard key={post.id} post={post} i={i} />)}
          </div>
        ) : (
          // 3 posts: 1 featured large left + 2 stacked right
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
              <BlogCard post={featured} i={0} featured />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-6">
              {rest.map((post, i) => <BlogCard key={post.id} post={post} i={i + 1} compact />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

function BlogCard({ post, i, featured = false, compact = false }: { post: BlogPost; i: number; featured?: boolean; compact?: boolean }) {
  return (
    <Link to={`/blog/${post.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer flex flex-col h-full"
        style={{ boxShadow: '0 2px 24px -4px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)' }}
      >
        {/* Image */}
        <div className={`overflow-hidden relative flex-shrink-0 ${compact ? 'h-40' : featured ? 'h-72 md:h-80' : 'h-52'}`}>
          <img
            src={post.imagem}
            alt={post.titulo}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Category pill */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-gold-dark text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
              <Tag size={10} />
              {post.categoria}
            </span>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className={`flex flex-col flex-1 ${compact ? 'p-5' : 'p-7'}`}>
          <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-3 font-medium tracking-wide">
            <Clock size={11} />
            <span>{format(new Date(post.data_publicacao), "dd MMM yyyy", { locale: pt })}</span>
          </div>
          <h3 className={`font-bold text-brand-dark mb-2 group-hover:text-gold-dark transition-colors duration-300 leading-snug ${featured ? 'text-xl md:text-2xl' : compact ? 'text-base' : 'text-lg'} line-clamp-2`}>
            {post.titulo}
          </h3>
          {!compact && (
            <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-2 flex-1">{post.resumo}</p>
          )}
          <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-dark uppercase tracking-wider group-hover:gap-3 transition-all duration-300">
              Ler Mais <ArrowRight size={13} />
            </span>
            <div className="w-7 h-7 rounded-full bg-gray-100 group-hover:bg-gold/10 flex items-center justify-center transition-colors duration-300">
              <ArrowRight size={13} className="text-gray-400 group-hover:text-gold transition-colors duration-300" />
            </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
