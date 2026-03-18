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
    <section ref={sectionRef} className="bg-white overflow-hidden relative">
      <div className="flex flex-col md:flex-row min-h-[500px] md:h-[650px]">

        {/* Left Side: Video Media */}
        <div className="w-full md:w-[65%] relative h-[350px] md:h-full group">
          {/* Vertical Accent Bar */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 md:w-2 bg-gold-dark z-30" />

          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            playsInline
            className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
          />

          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Controls */}
          <div className="absolute bottom-8 left-8 flex items-center gap-3 z-30">
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all duration-300"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all duration-300"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          {/* Central Play Button Overlay */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center z-20 group"
            >
              <div className="p-1 rounded-full border border-white/30 group-hover:border-gold transition-colors duration-500">
                <div className="w-20 h-20 rounded-full gold-gradient-bg flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500">
                  <Play size={32} className="text-white ml-1" />
                </div>
              </div>
            </button>
          )}

          {/* Organic Wave Divider for PC - Right edge of video side */}
          <div className="hidden md:block absolute top-0 -right-1 h-full w-32 z-20 pointer-events-none">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full fill-white">
              <path d="M100,0 C80,20 100,40 80,60 C60,80 80,100 100,100 L100,100 L0,100 L0,0 Z" transform="rotate(180 50 50)" />
            </svg>
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-[35%] bg-white flex items-center p-8 md:p-12 lg:p-16 relative">
          {/* Subtle Background Accent */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-16 bg-gold-dark/40 rounded-l-full" />

          <motion.div
            className="relative z-10 max-w-lg"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h4 className="text-gold-dark font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs mb-4 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-gold-dark/30" />
              Tour Virtual
            </h4>

            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-dark mb-6 leading-[1.15]">
              {titulo.includes('Espaço') ? (
                <>Veja por dentro o <br /><span className="text-gold-dark italic">seu novo espaço</span></>
              ) : titulo}
            </h2>

            <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 font-light">
              {subtitulo}
            </p>

            <motion.a
              href="#booking"
              className="inline-flex items-center gap-4 group"
              whileHover={{ x: 10 }}
            >
              <div className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-gold group-hover:bg-gold transition-all duration-500">
                <Play size={18} className="text-brand-dark group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm font-bold text-brand-dark uppercase tracking-widest border-b border-transparent group-hover:border-gold transition-all">
                Agendar Visita Real
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
