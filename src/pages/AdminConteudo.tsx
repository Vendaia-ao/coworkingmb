import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageUpload } from '@/components/admin/ImageUpload';
import { Plus, Pencil, Trash2, Users, MessageSquare, FileText, HelpCircle, Building2, Video, Hash, ImageIcon, Save } from 'lucide-react';

type TeamMember = { id: string; nome: string; cargo: string; imagem: string; linkedin: string; ordem: number; ativo: boolean };
type Testimonial = { id: string; nome: string; empresa: string | null; texto: string; video_url: string | null; ordem: number; ativo: boolean };
type BlogPost = { id: string; titulo: string; resumo: string; imagem: string; categoria: string; data_publicacao: string; ativo: boolean };
type FAQ = { id: string; pergunta: string; resposta: string; ordem: number; ativo: boolean };
type TrustedCompany = { id: string; nome: string; logo_url: string; ordem: number; ativo: boolean };
type GalleryItem = { id: string; url: string; titulo: string | null; descricao: string | null; categoria: string | null; ordem: number; ativo: boolean };

export default function AdminConteudo() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('team');

  // Team state
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamDialog, setTeamDialog] = useState(false);
  const [teamEditing, setTeamEditing] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState({ nome: '', cargo: '', imagem: '/placeholder.svg', linkedin: '#', ordem: 0, ativo: true });

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testLoading, setTestLoading] = useState(true);
  const [testDialog, setTestDialog] = useState(false);
  const [testEditing, setTestEditing] = useState<string | null>(null);
  const [testForm, setTestForm] = useState({ nome: '', empresa: '', texto: '', video_url: '', ordem: 0, ativo: true });

  // Blog state
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogDialog, setBlogDialog] = useState(false);
  const [blogEditing, setBlogEditing] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({ titulo: '', resumo: '', imagem: '/placeholder.svg', categoria: 'Dicas', data_publicacao: new Date().toISOString().split('T')[0], ativo: true });

  // FAQ state
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [faqDialog, setFaqDialog] = useState(false);
  const [faqEditing, setFaqEditing] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({ pergunta: '', resposta: '', ordem: 0, ativo: true });

  // Companies state
  const [companies, setCompanies] = useState<TrustedCompany[]>([]);
  const [compLoading, setCompLoading] = useState(true);
  const [compDialog, setCompDialog] = useState(false);
  const [compEditing, setCompEditing] = useState<string | null>(null);
  const [compForm, setCompForm] = useState({ nome: '', logo_url: '', ordem: 0, ativo: true });

  // Gallery state
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [galLoading, setGalLoading] = useState(true);
  const [galDialog, setGalDialog] = useState(false);
  const [galEditing, setGalEditing] = useState<string | null>(null);
  const [galForm, setGalForm] = useState({ url: '', titulo: '', descricao: '', categoria: '', ordem: 0, ativo: true });

  // Video & Counter config
  const [config, setConfig] = useState<Record<string, string>>({});
  const [configLoading, setConfigLoading] = useState(true);

  const fetchTeam = async () => { const { data } = await (supabase.from('team_members' as any) as any).select('*').order('ordem'); setTeam(data || []); setTeamLoading(false); };
  const fetchTestimonials = async () => { const { data } = await (supabase.from('testimonials' as any) as any).select('*').order('ordem'); setTestimonials(data || []); setTestLoading(false); };
  const fetchBlog = async () => { const { data } = await (supabase.from('blog_posts' as any) as any).select('*').order('data_publicacao', { ascending: false }); setBlog(data || []); setBlogLoading(false); };
  const fetchFaqs = async () => { const { data } = await (supabase.from('faqs' as any) as any).select('*').order('ordem'); setFaqs(data || []); setFaqLoading(false); };
  const fetchCompanies = async () => { const { data } = await (supabase.from('trusted_companies' as any) as any).select('*').order('ordem'); setCompanies(data || []); setCompLoading(false); };
  const fetchGallery = async () => { const { data } = await supabase.from('galeria').select('*').order('ordem'); setGallery((data as any[]) || []); setGalLoading(false); };
  const fetchConfig = async () => { const { data } = await supabase.from('site_config').select('*'); const m: Record<string, string> = {}; (data || []).forEach((c: any) => { m[c.chave] = c.valor || ''; }); setConfig(m); setConfigLoading(false); };

  useEffect(() => { fetchTeam(); fetchTestimonials(); fetchBlog(); fetchFaqs(); fetchCompanies(); fetchGallery(); fetchConfig(); }, []);

  const deleteItem = async (table: string, id: string, fetchFn: () => void) => { if (!confirm('Eliminar?')) return; await (supabase.from(table as any) as any).delete().eq('id', id); toast({ title: 'Eliminado' }); fetchFn(); };
  const toggleAtivo = async (table: string, id: string, current: boolean, fetchFn: () => void) => { await (supabase.from(table as any) as any).update({ ativo: !current }).eq('id', id); toast({ title: current ? 'Desativado' : 'Ativado' }); fetchFn(); };

  const saveTeam = async () => { const p = { ...teamForm }; if (teamEditing) await (supabase.from('team_members' as any) as any).update(p).eq('id', teamEditing); else await (supabase.from('team_members' as any) as any).insert(p); toast({ title: 'Guardado' }); setTeamDialog(false); setTeamEditing(null); fetchTeam(); };
  const saveTestimonial = async () => { const p = { ...testForm, empresa: testForm.empresa || null, video_url: testForm.video_url || null }; if (testEditing) await (supabase.from('testimonials' as any) as any).update(p).eq('id', testEditing); else await (supabase.from('testimonials' as any) as any).insert(p); toast({ title: 'Guardado' }); setTestDialog(false); setTestEditing(null); fetchTestimonials(); };

  const saveBlog = async () => {
    const activeCount = blog.filter(b => b.ativo).length;
    if (!blogEditing && activeCount >= 3 && blogForm.ativo) {
      toast({ title: '⚠️ Limite atingido', description: 'Máximo de 3 artigos ativos. Desative um primeiro.', variant: 'destructive' });
      return;
    }
    const p = { ...blogForm }; if (blogEditing) await (supabase.from('blog_posts' as any) as any).update(p).eq('id', blogEditing); else await (supabase.from('blog_posts' as any) as any).insert(p); toast({ title: 'Guardado' }); setBlogDialog(false); setBlogEditing(null); fetchBlog();
  };

  const saveFaq = async () => { const p = { ...faqForm }; if (faqEditing) await (supabase.from('faqs' as any) as any).update(p).eq('id', faqEditing); else await (supabase.from('faqs' as any) as any).insert(p); toast({ title: 'Guardado' }); setFaqDialog(false); setFaqEditing(null); fetchFaqs(); };
  const saveCompany = async () => { const p = { ...compForm }; if (compEditing) await (supabase.from('trusted_companies' as any) as any).update(p).eq('id', compEditing); else await (supabase.from('trusted_companies' as any) as any).insert(p); toast({ title: 'Guardado' }); setCompDialog(false); setCompEditing(null); fetchCompanies(); };
  const saveGallery = async () => { const p = { url: galForm.url, titulo: galForm.titulo || null, descricao: galForm.descricao || null, categoria: galForm.categoria || null, ordem: galForm.ordem, ativo: galForm.ativo }; if (galEditing) await supabase.from('galeria').update(p).eq('id', galEditing); else await supabase.from('galeria').insert(p); toast({ title: 'Guardado' }); setGalDialog(false); setGalEditing(null); fetchGallery(); };

  const saveConfig = async (keys: string[]) => {
    const promises = keys.map(chave => supabase.from('site_config').update({ valor: config[chave] || '', updated_at: new Date().toISOString() }).eq('chave', chave));
    await Promise.all(promises);
    toast({ title: 'Configuração guardada' });
  };

  const upsertConfig = async (chave: string, valor: string) => {
    const { data } = await supabase.from('site_config').select('id').eq('chave', chave).single();
    if (data) await supabase.from('site_config').update({ valor }).eq('chave', chave);
    else await supabase.from('site_config').insert({ chave, valor });
  };

  const saveVideoConfig = async () => {
    await Promise.all([
      upsertConfig('video_url', config.video_url || ''),
      upsertConfig('video_titulo', config.video_titulo || ''),
      upsertConfig('video_subtitulo', config.video_subtitulo || ''),
    ]);
    toast({ title: 'Vídeo atualizado' });
  };

  const saveCounterConfig = async () => {
    const keys = [1, 2, 3, 4].flatMap(i => [`counter_${i}_valor`, `counter_${i}_label`, `counter_${i}_sufixo`]);
    await Promise.all(keys.map(k => upsertConfig(k, config[k] || '')));
    toast({ title: 'Números atualizados' });
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Conteúdo do Site</h1><p className="text-gray-500 text-sm">Gerir todo o conteúdo visível no website</p></div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex flex-wrap gap-1 h-auto">
          <TabsTrigger value="team" className="text-xs"><Users size={14} className="mr-1" />Equipa</TabsTrigger>
          <TabsTrigger value="testimonials" className="text-xs"><MessageSquare size={14} className="mr-1" />Testemunhos</TabsTrigger>
          <TabsTrigger value="blog" className="text-xs"><FileText size={14} className="mr-1" />Blog</TabsTrigger>
          <TabsTrigger value="faq" className="text-xs"><HelpCircle size={14} className="mr-1" />FAQ</TabsTrigger>
          <TabsTrigger value="companies" className="text-xs"><Building2 size={14} className="mr-1" />Empresas</TabsTrigger>
          <TabsTrigger value="gallery" className="text-xs"><ImageIcon size={14} className="mr-1" />Galeria</TabsTrigger>
          <TabsTrigger value="video" className="text-xs"><Video size={14} className="mr-1" />Vídeo</TabsTrigger>
          <TabsTrigger value="counter" className="text-xs"><Hash size={14} className="mr-1" />Números</TabsTrigger>
        </TabsList>

        {/* TEAM */}
        <TabsContent value="team" className="space-y-4">
          <div className="flex justify-end"><Button onClick={() => { setTeamEditing(null); setTeamForm({ nome: '', cargo: '', imagem: '/placeholder.svg', linkedin: '#', ordem: 0, ativo: true }); setTeamDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" />Adicionar</Button></div>
          {teamLoading ? [1, 2, 3].map(i => <Skeleton key={i} className="h-16" />) : team.map(m => (
            <Card key={m.id} className={!m.ativo ? 'opacity-50' : ''}><CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><img src={m.imagem} alt={m.nome} className="w-10 h-10 rounded-full object-cover" /><div><p className="font-semibold text-sm">{m.nome}</p><p className="text-xs text-gray-500">{m.cargo}</p></div></div>
              <div className="flex items-center gap-2"><Switch checked={m.ativo} onCheckedChange={() => toggleAtivo('team_members', m.id, m.ativo, fetchTeam)} /><Button variant="ghost" size="icon" onClick={() => { setTeamEditing(m.id); setTeamForm(m); setTeamDialog(true); }}><Pencil size={16} /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('team_members', m.id, fetchTeam)}><Trash2 size={16} /></Button></div>
            </CardContent></Card>
          ))}
        </TabsContent>

        {/* TESTIMONIALS */}
        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex justify-end"><Button onClick={() => { setTestEditing(null); setTestForm({ nome: '', empresa: '', texto: '', video_url: '', ordem: 0, ativo: true }); setTestDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" />Adicionar</Button></div>
          {testLoading ? [1, 2].map(i => <Skeleton key={i} className="h-16" />) : testimonials.map(t => (
            <Card key={t.id} className={!t.ativo ? 'opacity-50' : ''}><CardContent className="p-4 flex items-center justify-between">
              <div><p className="font-semibold text-sm">{t.nome}</p><p className="text-xs text-gray-500">{t.empresa} · {t.video_url ? '🎬 Vídeo' : '📝 Texto'}</p></div>
              <div className="flex items-center gap-2"><Switch checked={t.ativo} onCheckedChange={() => toggleAtivo('testimonials', t.id, t.ativo, fetchTestimonials)} /><Button variant="ghost" size="icon" onClick={() => { setTestEditing(t.id); setTestForm({ nome: t.nome, empresa: t.empresa || '', texto: t.texto, video_url: t.video_url || '', ordem: t.ordem, ativo: t.ativo }); setTestDialog(true); }}><Pencil size={16} /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('testimonials', t.id, fetchTestimonials)}><Trash2 size={16} /></Button></div>
            </CardContent></Card>
          ))}
        </TabsContent>

        {/* BLOG */}
        <TabsContent value="blog" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Máximo 3 artigos ativos ({blog.filter(b => b.ativo).length}/3)</p>
            <Button disabled={blog.filter(b => b.ativo).length >= 3} onClick={() => { setBlogEditing(null); setBlogForm({ titulo: '', resumo: '', imagem: '/placeholder.svg', categoria: 'Dicas', data_publicacao: new Date().toISOString().split('T')[0], ativo: true }); setBlogDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" />Novo Artigo</Button>
          </div>
          {blogLoading ? [1, 2].map(i => <Skeleton key={i} className="h-16" />) : blog.map(b => (
            <Card key={b.id} className={!b.ativo ? 'opacity-50' : ''}><CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><img src={b.imagem} alt={b.titulo} className="w-12 h-8 rounded object-cover" /><div><p className="font-semibold text-sm line-clamp-1">{b.titulo}</p><p className="text-xs text-gray-500">{b.categoria} · {b.data_publicacao}</p></div></div>
              <div className="flex items-center gap-2"><Switch checked={b.ativo} onCheckedChange={() => toggleAtivo('blog_posts', b.id, b.ativo, fetchBlog)} /><Button variant="ghost" size="icon" onClick={() => { setBlogEditing(b.id); setBlogForm({ titulo: b.titulo, resumo: b.resumo, imagem: b.imagem, categoria: b.categoria, data_publicacao: b.data_publicacao, ativo: b.ativo }); setBlogDialog(true); }}><Pencil size={16} /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('blog_posts', b.id, fetchBlog)}><Trash2 size={16} /></Button></div>
            </CardContent></Card>
          ))}
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-4">
          <div className="flex justify-end"><Button onClick={() => { setFaqEditing(null); setFaqForm({ pergunta: '', resposta: '', ordem: 0, ativo: true }); setFaqDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" />Nova FAQ</Button></div>
          {faqLoading ? [1, 2].map(i => <Skeleton key={i} className="h-16" />) : faqs.map(f => (
            <Card key={f.id} className={!f.ativo ? 'opacity-50' : ''}><CardContent className="p-4 flex items-center justify-between">
              <div><p className="font-semibold text-sm line-clamp-1">{f.pergunta}</p><p className="text-xs text-gray-500">Ordem: {f.ordem}</p></div>
              <div className="flex items-center gap-2"><Switch checked={f.ativo} onCheckedChange={() => toggleAtivo('faqs', f.id, f.ativo, fetchFaqs)} /><Button variant="ghost" size="icon" onClick={() => { setFaqEditing(f.id); setFaqForm(f); setFaqDialog(true); }}><Pencil size={16} /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('faqs', f.id, fetchFaqs)}><Trash2 size={16} /></Button></div>
            </CardContent></Card>
          ))}
        </TabsContent>

        {/* COMPANIES */}
        <TabsContent value="companies" className="space-y-4">
          <div className="flex justify-end"><Button onClick={() => { setCompEditing(null); setCompForm({ nome: '', logo_url: '', ordem: 0, ativo: true }); setCompDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" />Adicionar</Button></div>
          {compLoading ? [1, 2].map(i => <Skeleton key={i} className="h-16" />) : companies.map(c => (
            <Card key={c.id} className={!c.ativo ? 'opacity-50' : ''}><CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><img src={c.logo_url} alt={c.nome} className="w-12 h-8 object-contain" /><div><p className="font-semibold text-sm">{c.nome}</p><p className="text-xs text-gray-500">Ordem: {c.ordem}</p></div></div>
              <div className="flex items-center gap-2"><Switch checked={c.ativo} onCheckedChange={() => toggleAtivo('trusted_companies', c.id, c.ativo, fetchCompanies)} /><Button variant="ghost" size="icon" onClick={() => { setCompEditing(c.id); setCompForm(c); setCompDialog(true); }}><Pencil size={16} /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('trusted_companies', c.id, fetchCompanies)}><Trash2 size={16} /></Button></div>
            </CardContent></Card>
          ))}
        </TabsContent>

        {/* GALLERY */}
        <TabsContent value="gallery" className="space-y-4">
          <div className="flex justify-end"><Button onClick={() => { setGalEditing(null); setGalForm({ url: '', titulo: '', descricao: '', categoria: '', ordem: 0, ativo: true }); setGalDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" />Adicionar Imagem</Button></div>
          {galLoading ? [1, 2, 3].map(i => <Skeleton key={i} className="h-20" />) : gallery.map(g => (
            <Card key={g.id} className={!g.ativo ? 'opacity-50' : ''}><CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3"><img src={g.url} alt={g.titulo || ''} className="w-16 h-12 rounded object-cover" /><div><p className="font-semibold text-sm">{g.titulo || 'Sem título'}</p><p className="text-xs text-gray-500">{g.categoria ? `[${g.categoria}] ` : ''}{g.descricao || '—'} · Ordem: {g.ordem}</p></div></div>
              <div className="flex items-center gap-2"><Switch checked={g.ativo} onCheckedChange={() => toggleAtivo('galeria', g.id, g.ativo, fetchGallery)} /><Button variant="ghost" size="icon" onClick={() => { setGalEditing(g.id); setGalForm({ url: g.url, titulo: g.titulo || '', descricao: g.descricao || '', categoria: g.categoria || '', ordem: g.ordem, ativo: g.ativo }); setGalDialog(true); }}><Pencil size={16} /></Button><Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('galeria', g.id, fetchGallery)}><Trash2 size={16} /></Button></div>
            </CardContent></Card>
          ))}
        </TabsContent>

        {/* VIDEO */}
        <TabsContent value="video" className="space-y-4">
          {configLoading ? <Skeleton className="h-48" /> : (
            <Card><CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg">Secção de Vídeo</h3>
              <div><Label>URL do Vídeo</Label><Input value={config.video_url || ''} onChange={e => setConfig({ ...config, video_url: e.target.value })} placeholder="/promo-video.mp4 ou https://..." /></div>
              <div><Label>Título</Label><Input value={config.video_titulo || ''} onChange={e => setConfig({ ...config, video_titulo: e.target.value })} /></div>
              <div><Label>Subtítulo</Label><Textarea value={config.video_subtitulo || ''} onChange={e => setConfig({ ...config, video_subtitulo: e.target.value })} /></div>
              <Button onClick={saveVideoConfig} className="gold-gradient-bg text-white"><Save size={16} className="mr-2" />Guardar</Button>
            </CardContent></Card>
          )}
        </TabsContent>

        {/* COUNTER */}
        <TabsContent value="counter" className="space-y-4">
          {configLoading ? <Skeleton className="h-48" /> : (
            <Card><CardContent className="p-6 space-y-6">
              <h3 className="font-bold text-lg">Coworking em Números</h3>
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="grid grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div><Label>Valor {i}</Label><Input type="number" value={config[`counter_${i}_valor`] || ''} onChange={e => setConfig({ ...config, [`counter_${i}_valor`]: e.target.value })} /></div>
                  <div><Label>Rótulo {i}</Label><Input value={config[`counter_${i}_label`] || ''} onChange={e => setConfig({ ...config, [`counter_${i}_label`]: e.target.value })} /></div>
                  <div><Label>Sufixo {i}</Label><Input value={config[`counter_${i}_sufixo`] || ''} onChange={e => setConfig({ ...config, [`counter_${i}_sufixo`]: e.target.value })} placeholder="Ex: +" /></div>
                </div>
              ))}
              <Button onClick={saveCounterConfig} className="gold-gradient-bg text-white"><Save size={16} className="mr-2" />Guardar</Button>
            </CardContent></Card>
          )}
        </TabsContent>
      </Tabs>

      {/* DIALOGS */}
      <Dialog open={teamDialog} onOpenChange={setTeamDialog}><DialogContent className="max-w-md max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{teamEditing ? 'Editar' : 'Novo'} Membro</DialogTitle></DialogHeader><div className="space-y-4">
        <div><Label>Nome</Label><Input value={teamForm.nome} onChange={e => setTeamForm({ ...teamForm, nome: e.target.value })} /></div>
        <div><Label>Cargo</Label><Input value={teamForm.cargo} onChange={e => setTeamForm({ ...teamForm, cargo: e.target.value })} /></div>
        <ImageUpload value={teamForm.imagem} onChange={v => setTeamForm({ ...teamForm, imagem: v })} />
        <div><Label>LinkedIn</Label><Input value={teamForm.linkedin} onChange={e => setTeamForm({ ...teamForm, linkedin: e.target.value })} /></div>
        <div><Label>Ordem</Label><Input type="number" value={teamForm.ordem} onChange={e => setTeamForm({ ...teamForm, ordem: Number(e.target.value) })} /></div>
        <div className="flex items-center gap-3"><Switch checked={teamForm.ativo} onCheckedChange={v => setTeamForm({ ...teamForm, ativo: v })} /><Label>Visível</Label></div>
        <Button onClick={saveTeam} className="w-full gold-gradient-bg text-white">Guardar</Button>
      </div></DialogContent></Dialog>

      <Dialog open={testDialog} onOpenChange={setTestDialog}><DialogContent className="max-w-md max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{testEditing ? 'Editar' : 'Novo'} Testemunho</DialogTitle></DialogHeader><div className="space-y-4">
        <div><Label>Nome</Label><Input value={testForm.nome} onChange={e => setTestForm({ ...testForm, nome: e.target.value })} /></div>
        <div><Label>Empresa</Label><Input value={testForm.empresa} onChange={e => setTestForm({ ...testForm, empresa: e.target.value })} /></div>
        <div><Label>Testemunho</Label><Textarea value={testForm.texto} onChange={e => setTestForm({ ...testForm, texto: e.target.value })} /></div>
        <ImageUpload value={testForm.video_url} onChange={v => setTestForm({ ...testForm, video_url: v })} label="Vídeo (Upload ou Link)" accept="video/*" />
        <div><Label>Ordem</Label><Input type="number" value={testForm.ordem} onChange={e => setTestForm({ ...testForm, ordem: Number(e.target.value) })} /></div>
        <div className="flex items-center gap-3"><Switch checked={testForm.ativo} onCheckedChange={v => setTestForm({ ...testForm, ativo: v })} /><Label>Visível</Label></div>
        <Button onClick={saveTestimonial} className="w-full gold-gradient-bg text-white">Guardar</Button>
      </div></DialogContent></Dialog>

      <Dialog open={blogDialog} onOpenChange={setBlogDialog}><DialogContent className="max-w-md max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{blogEditing ? 'Editar' : 'Novo'} Artigo</DialogTitle></DialogHeader><div className="space-y-4">
        <div><Label>Título</Label><Input value={blogForm.titulo} onChange={e => setBlogForm({ ...blogForm, titulo: e.target.value })} /></div>
        <div><Label>Resumo</Label><Textarea value={blogForm.resumo} onChange={e => setBlogForm({ ...blogForm, resumo: e.target.value })} /></div>
        <ImageUpload value={blogForm.imagem} onChange={v => setBlogForm({ ...blogForm, imagem: v })} />
        <div className="grid grid-cols-2 gap-4"><div><Label>Categoria</Label><Input value={blogForm.categoria} onChange={e => setBlogForm({ ...blogForm, categoria: e.target.value })} /></div><div><Label>Data</Label><Input type="date" value={blogForm.data_publicacao} onChange={e => setBlogForm({ ...blogForm, data_publicacao: e.target.value })} /></div></div>
        <div className="flex items-center gap-3"><Switch checked={blogForm.ativo} onCheckedChange={v => setBlogForm({ ...blogForm, ativo: v })} /><Label>Publicado</Label></div>
        <Button onClick={saveBlog} className="w-full gold-gradient-bg text-white">Guardar</Button>
      </div></DialogContent></Dialog>

      <Dialog open={faqDialog} onOpenChange={setFaqDialog}><DialogContent className="max-w-md"><DialogHeader><DialogTitle>{faqEditing ? 'Editar' : 'Nova'} FAQ</DialogTitle></DialogHeader><div className="space-y-4">
        <div><Label>Pergunta</Label><Input value={faqForm.pergunta} onChange={e => setFaqForm({ ...faqForm, pergunta: e.target.value })} /></div>
        <div><Label>Resposta</Label><Textarea value={faqForm.resposta} onChange={e => setFaqForm({ ...faqForm, resposta: e.target.value })} /></div>
        <div><Label>Ordem</Label><Input type="number" value={faqForm.ordem} onChange={e => setFaqForm({ ...faqForm, ordem: Number(e.target.value) })} /></div>
        <div className="flex items-center gap-3"><Switch checked={faqForm.ativo} onCheckedChange={v => setFaqForm({ ...faqForm, ativo: v })} /><Label>Visível</Label></div>
        <Button onClick={saveFaq} className="w-full gold-gradient-bg text-white">Guardar</Button>
      </div></DialogContent></Dialog>

      <Dialog open={compDialog} onOpenChange={setCompDialog}><DialogContent className="max-w-md"><DialogHeader><DialogTitle>{compEditing ? 'Editar' : 'Nova'} Empresa</DialogTitle></DialogHeader><div className="space-y-4">
        <div><Label>Nome</Label><Input value={compForm.nome} onChange={e => setCompForm({ ...compForm, nome: e.target.value })} /></div>
        <ImageUpload value={compForm.logo_url} onChange={v => setCompForm({ ...compForm, logo_url: v })} label="Logotipo" />
        <div><Label>Ordem</Label><Input type="number" value={compForm.ordem} onChange={e => setCompForm({ ...compForm, ordem: Number(e.target.value) })} /></div>
        <div className="flex items-center gap-3"><Switch checked={compForm.ativo} onCheckedChange={v => setCompForm({ ...compForm, ativo: v })} /><Label>Visível</Label></div>
        <Button onClick={saveCompany} className="w-full gold-gradient-bg text-white">Guardar</Button>
      </div></DialogContent></Dialog>

      <Dialog open={galDialog} onOpenChange={setGalDialog}><DialogContent className="max-w-md max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{galEditing ? 'Editar' : 'Nova'} Imagem</DialogTitle></DialogHeader><div className="space-y-4">
        <ImageUpload value={galForm.url} onChange={v => setGalForm({ ...galForm, url: v })} />
        <div><Label>Título</Label><Input value={galForm.titulo} onChange={e => setGalForm({ ...galForm, titulo: e.target.value })} /></div>
        <div><Label>Descrição</Label><Input value={galForm.descricao} onChange={e => setGalForm({ ...galForm, descricao: e.target.value })} /></div>
        <div><Label>Categoria</Label><Input value={galForm.categoria} onChange={e => setGalForm({ ...galForm, categoria: e.target.value })} placeholder="Ex: Espaços, Equipa..." /></div>
        <div><Label>Ordem</Label><Input type="number" value={galForm.ordem} onChange={e => setGalForm({ ...galForm, ordem: Number(e.target.value) })} /></div>
        <div className="flex items-center gap-3"><Switch checked={galForm.ativo} onCheckedChange={v => setGalForm({ ...galForm, ativo: v })} /><Label>Visível</Label></div>
        <Button onClick={saveGallery} className="w-full gold-gradient-bg text-white">Guardar</Button>
      </div></DialogContent></Dialog>
    </div>
  );
}
