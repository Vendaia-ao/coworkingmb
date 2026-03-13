import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

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
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-48 mx-auto mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1,2,3].map(i => <Skeleton key={i} className="h-80 rounded-xl" />)}
          </div>
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark mb-4">
            Blog <span className="text-gold-dark">Corporativo</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Insights, dicas e novidades do mundo do coworking e empreendedorismo em Angola.</p>
          <div className="w-24 h-1 gold-gradient-bg mx-auto rounded-full mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="h-48 overflow-hidden relative">
                <img src={post.imagem} alt={post.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.categoria}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                  <Clock size={12} />
                  <span>{format(new Date(post.data_publicacao), "dd MMM yyyy", { locale: pt })}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2 group-hover:text-gold-dark transition-colors line-clamp-2">{post.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.resumo}</p>
                <span className="inline-flex items-center gap-1 text-sm font-bold text-gold-dark uppercase tracking-wider group-hover:gap-2 transition-all">
                  Ler Mais <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
