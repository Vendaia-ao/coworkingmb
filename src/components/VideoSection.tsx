import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export const VideoSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [config, setConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    supabase.from('site_config').select('chave, valor').then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((c: any) => { map[c.chave] = c.valor || ''; });
      setConfig(map);
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { videoRef.current?.play(); setIsPlaying(true); }
      else { videoRef.current?.pause(); setIsPlaying(false); }
    }, { threshold: 0.3 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) { videoRef.current.play(); setIsPlaying(true); }
    else { videoRef.current.pause(); setIsPlaying(false); }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  const videoUrl = config.video_url || '/promo-video.mp4';
  const titulo = config.video_titulo || 'Tour Virtual pelo Nosso Espaço';
  const subtitulo = config.video_subtitulo || 'Descubra um ambiente profissional pensado para impulsionar o seu negócio na Centralidade do Kilamba.';

  return (
    <section ref={sectionRef} className="py-20 bg-brand-dark relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-serif">
            {titulo.includes('Espaço') ? <>Tour Virtual pelo Nosso <span className="gold-gradient-text">Espaço</span></> : titulo}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{subtitulo}</p>
        </motion.div>

        <motion.div className="relative rounded-xl overflow-hidden shadow-2xl group" initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <video ref={videoRef} src={videoUrl} muted loop playsInline preload="metadata" className="w-full aspect-video object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
            <button onClick={toggleMute} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>
          {!isPlaying && (
            <button onClick={togglePlay} className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full gold-gradient-bg flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Play size={32} className="text-white ml-1" />
              </div>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};
