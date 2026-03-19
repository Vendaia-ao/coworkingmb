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

  const videoUrl = config.video_url || '/promo-video.mp4';
  const titulo = config.video_titulo || 'Tour Virtual pelo Nosso Espaço';
  const subtitulo = config.video_subtitulo || 'Descubra um ambiente profissional pensado para impulsionar o seu negócio na Centralidade do Kilamba.';

  useEffect(() => {
    supabase.from('site_config').select('chave, valor').then(({ data }) => {
      const map: Record<string, string> = {};
      (data || []).forEach((c: any) => { map[c.chave] = c.valor || ''; });
      setConfig(map);
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!videoRef.current) return;
      if (entry.isIntersecting) {
        videoRef.current.play().catch(e => console.log("Auto-play failed:", e));
        setIsPlaying(true);
      }
      else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, { threshold: 0.3 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [videoUrl]); // Re-observe when videoUrl changes and video element remounts

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl]);

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

  return (
    <section ref={sectionRef} className="bg-white overflow-hidden relative border-y border-gray-100">
      <div className="flex flex-col md:flex-row">

        {/* Left Side: Video Media */}
        <div className="w-full md:w-[65%] relative aspect-video group bg-black">
          {/* Vertical Accent Bar Removed to avoid cutting visual */}

          <video
            key={videoUrl}
            ref={videoRef}
            src={videoUrl}
            muted={isMuted}
            loop
            playsInline
            className="w-full h-full object-cover transition-all duration-700"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            Sinto muito, o seu navegador não suporta vídeos.
          </video>

          {/* Controls */}
          <div className="absolute bottom-6 left-6 flex items-center gap-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold transition-all duration-300"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <button
              onClick={toggleMute}
              className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-gold transition-all duration-300"
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
              <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-2xl scale-100 group-hover:scale-110 transition-transform duration-500">
                <Play size={24} className="text-white ml-1" />
              </div>
            </button>
          )}
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
