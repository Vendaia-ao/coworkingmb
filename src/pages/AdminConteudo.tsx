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
import { Plus, Pencil, Trash2, Users, MessageSquare, FileText, HelpCircle, Building2 } from 'lucide-react';

// ─── Types ─────────────────────────────────
type TeamMember = { id: string; nome: string; cargo: string; imagem: string; linkedin: string; ordem: number; ativo: boolean };
type Testimonial = { id: string; nome: string; empresa: string | null; texto: string; video_url: string | null; ordem: number; ativo: boolean };
type BlogPost = { id: string; titulo: string; resumo: string; imagem: string; categoria: string; data_publicacao: string; ativo: boolean };
type FAQ = { id: string; pergunta: string; resposta: string; ordem: number; ativo: boolean };
type TrustedCompany = { id: string; nome: string; logo_url: string; ordem: number; ativo: boolean };

export default function AdminConteudo() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('team');

  // ─── Team ─────────────────────────────────
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [teamLoading, setTeamLoading] = useState(true);
  const [teamDialog, setTeamDialog] = useState(false);
  const [teamEditing, setTeamEditing] = useState<string | null>(null);
  const [teamForm, setTeamForm] = useState({ nome: '', cargo: '', imagem: '/placeholder.svg', linkedin: '#', ordem: 0, ativo: true });

  const fetchTeam = async () => {
    const { data } = await (supabase.from('team_members' as any) as any).select('*').order('ordem');
    setTeam(data || []);
    setTeamLoading(false);
  };

  // ─── Testimonials ─────────────────────────
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testLoading, setTestLoading] = useState(true);
  const [testDialog, setTestDialog] = useState(false);
  const [testEditing, setTestEditing] = useState<string | null>(null);
  const [testForm, setTestForm] = useState({ nome: '', empresa: '', texto: '', video_url: '', ordem: 0, ativo: true });

  const fetchTestimonials = async () => {
    const { data } = await (supabase.from('testimonials' as any) as any).select('*').order('ordem');
    setTestimonials(data || []);
    setTestLoading(false);
  };

  // ─── Blog ─────────────────────────────────
  const [blog, setBlog] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  const [blogDialog, setBlogDialog] = useState(false);
  const [blogEditing, setBlogEditing] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({ titulo: '', resumo: '', imagem: '/placeholder.svg', categoria: 'Dicas', data_publicacao: new Date().toISOString().split('T')[0], ativo: true });

  const fetchBlog = async () => {
    const { data } = await (supabase.from('blog_posts' as any) as any).select('*').order('data_publicacao', { ascending: false });
    setBlog(data || []);
    setBlogLoading(false);
  };

  // ─── FAQ ──────────────────────────────────
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [faqLoading, setFaqLoading] = useState(true);
  const [faqDialog, setFaqDialog] = useState(false);
  const [faqEditing, setFaqEditing] = useState<string | null>(null);
  const [faqForm, setFaqForm] = useState({ pergunta: '', resposta: '', ordem: 0, ativo: true });

  const fetchFaqs = async () => {
    const { data } = await supabase.from('faqs').select('*').order('ordem');
    setFaqs((data as any[]) || []);
    setFaqLoading(false);
  };

  // ─── Companies ────────────────────────────
  const [companies, setCompanies] = useState<TrustedCompany[]>([]);
  const [compLoading, setCompLoading] = useState(true);
  const [compDialog, setCompDialog] = useState(false);
  const [compEditing, setCompEditing] = useState<string | null>(null);
  const [compForm, setCompForm] = useState({ nome: '', logo_url: '', ordem: 0, ativo: true });

  const fetchCompanies = async () => {
    const { data } = await supabase.from('trusted_companies').select('*').order('ordem');
    setCompanies((data as any[]) || []);
    setCompLoading(false);
  };

  useEffect(() => {
    fetchTeam();
    fetchTestimonials();
    fetchBlog();
    fetchFaqs();
    fetchCompanies();
  }, []);

  // ─── CRUD helpers ─────────────────────────
  const saveTeam = async () => {
    const payload = { nome: teamForm.nome, cargo: teamForm.cargo, imagem: teamForm.imagem, linkedin: teamForm.linkedin, ordem: teamForm.ordem, ativo: teamForm.ativo };
    if (teamEditing) await supabase.from('team_members').update(payload).eq('id', teamEditing);
    else await supabase.from('team_members').insert(payload);
    toast({ title: teamEditing ? 'Membro atualizado' : 'Membro criado' });
    setTeamDialog(false); setTeamEditing(null); setTeamForm({ nome: '', cargo: '', imagem: '/placeholder.svg', linkedin: '#', ordem: 0, ativo: true });
    fetchTeam();
  };

  const saveTestimonial = async () => {
    const payload = { nome: testForm.nome, empresa: testForm.empresa || null, texto: testForm.texto, video_url: testForm.video_url || null, ordem: testForm.ordem, ativo: testForm.ativo };
    if (testEditing) await supabase.from('testimonials').update(payload).eq('id', testEditing);
    else await supabase.from('testimonials').insert(payload);
    toast({ title: testEditing ? 'Testemunho atualizado' : 'Testemunho criado' });
    setTestDialog(false); setTestEditing(null); setTestForm({ nome: '', empresa: '', texto: '', video_url: '', ordem: 0, ativo: true });
    fetchTestimonials();
  };

  const saveBlog = async () => {
    const payload = { titulo: blogForm.titulo, resumo: blogForm.resumo, imagem: blogForm.imagem, categoria: blogForm.categoria, data_publicacao: blogForm.data_publicacao, ativo: blogForm.ativo };
    if (blogEditing) await supabase.from('blog_posts').update(payload).eq('id', blogEditing);
    else await supabase.from('blog_posts').insert(payload);
    toast({ title: blogEditing ? 'Artigo atualizado' : 'Artigo criado' });
    setBlogDialog(false); setBlogEditing(null); setBlogForm({ titulo: '', resumo: '', imagem: '/placeholder.svg', categoria: 'Dicas', data_publicacao: new Date().toISOString().split('T')[0], ativo: true });
    fetchBlog();
  };

  const saveFaq = async () => {
    const payload = { pergunta: faqForm.pergunta, resposta: faqForm.resposta, ordem: faqForm.ordem, ativo: faqForm.ativo };
    if (faqEditing) await supabase.from('faqs').update(payload).eq('id', faqEditing);
    else await supabase.from('faqs').insert(payload);
    toast({ title: faqEditing ? 'FAQ atualizada' : 'FAQ criada' });
    setFaqDialog(false); setFaqEditing(null); setFaqForm({ pergunta: '', resposta: '', ordem: 0, ativo: true });
    fetchFaqs();
  };

  const saveCompany = async () => {
    const payload = { nome: compForm.nome, logo_url: compForm.logo_url, ordem: compForm.ordem, ativo: compForm.ativo };
    if (compEditing) await supabase.from('trusted_companies').update(payload).eq('id', compEditing);
    else await supabase.from('trusted_companies').insert(payload);
    toast({ title: compEditing ? 'Empresa atualizada' : 'Empresa adicionada' });
    setCompDialog(false); setCompEditing(null); setCompForm({ nome: '', logo_url: '', ordem: 0, ativo: true });
    fetchCompanies();
  };

  const deleteItem = async (table: string, id: string, fetchFn: () => void) => {
    if (!confirm('Eliminar este item?')) return;
    await (supabase.from(table as any) as any).delete().eq('id', id);
    toast({ title: 'Item eliminado' });
    fetchFn();
  };

  const toggleAtivo = async (table: string, id: string, current: boolean, fetchFn: () => void) => {
    await (supabase.from(table as any) as any).update({ ativo: !current }).eq('id', id);
    toast({ title: current ? 'Desativado' : 'Ativado' });
    fetchFn();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Conteúdo do Site</h1>
        <p className="text-gray-500 text-sm">Gerir todo o conteúdo visível no website</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="team" className="flex items-center gap-1.5 text-xs"><Users size={14} /> Equipa</TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-1.5 text-xs"><MessageSquare size={14} /> Testemunhos</TabsTrigger>
          <TabsTrigger value="blog" className="flex items-center gap-1.5 text-xs"><FileText size={14} /> Blog</TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-1.5 text-xs"><HelpCircle size={14} /> FAQ</TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-1.5 text-xs"><Building2 size={14} /> Empresas</TabsTrigger>
        </TabsList>

        {/* ─── TEAM TAB ──────────────────── */}
        <TabsContent value="team" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setTeamEditing(null); setTeamForm({ nome: '', cargo: '', imagem: '/placeholder.svg', linkedin: '#', ordem: 0, ativo: true }); setTeamDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" /> Adicionar Membro</Button>
          </div>
          {teamLoading ? [1,2,3].map(i => <Skeleton key={i} className="h-16" />) : team.map(m => (
            <Card key={m.id} className={!m.ativo ? 'opacity-50' : ''}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={m.imagem} alt={m.nome} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm">{m.nome}</p>
                    <p className="text-xs text-gray-500">{m.cargo} · Ordem: {m.ordem}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={m.ativo} onCheckedChange={() => toggleAtivo('team_members', m.id, m.ativo, fetchTeam)} />
                  <Button variant="ghost" size="icon" onClick={() => { setTeamEditing(m.id); setTeamForm({ nome: m.nome, cargo: m.cargo, imagem: m.imagem, linkedin: m.linkedin, ordem: m.ordem, ativo: m.ativo }); setTeamDialog(true); }}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('team_members', m.id, fetchTeam)}><Trash2 size={16} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ─── TESTIMONIALS TAB ──────────── */}
        <TabsContent value="testimonials" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setTestEditing(null); setTestForm({ nome: '', empresa: '', texto: '', video_url: '', ordem: 0, ativo: true }); setTestDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" /> Adicionar Testemunho</Button>
          </div>
          {testLoading ? [1,2].map(i => <Skeleton key={i} className="h-16" />) : testimonials.map(t => (
            <Card key={t.id} className={!t.ativo ? 'opacity-50' : ''}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm">{t.nome}</p>
                  <p className="text-xs text-gray-500">{t.empresa} · {t.video_url ? '🎬 Com vídeo' : '📝 Texto'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={t.ativo} onCheckedChange={() => toggleAtivo('testimonials', t.id, t.ativo, fetchTestimonials)} />
                  <Button variant="ghost" size="icon" onClick={() => { setTestEditing(t.id); setTestForm({ nome: t.nome, empresa: t.empresa || '', texto: t.texto, video_url: t.video_url || '', ordem: t.ordem, ativo: t.ativo }); setTestDialog(true); }}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('testimonials', t.id, fetchTestimonials)}><Trash2 size={16} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ─── BLOG TAB ──────────────────── */}
        <TabsContent value="blog" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setBlogEditing(null); setBlogForm({ titulo: '', resumo: '', imagem: '/placeholder.svg', categoria: 'Dicas', data_publicacao: new Date().toISOString().split('T')[0], ativo: true }); setBlogDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" /> Novo Artigo</Button>
          </div>
          {blogLoading ? [1,2].map(i => <Skeleton key={i} className="h-16" />) : blog.map(b => (
            <Card key={b.id} className={!b.ativo ? 'opacity-50' : ''}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={b.imagem} alt={b.titulo} className="w-12 h-8 rounded object-cover" />
                  <div>
                    <p className="font-semibold text-sm line-clamp-1">{b.titulo}</p>
                    <p className="text-xs text-gray-500">{b.categoria} · {b.data_publicacao}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={b.ativo} onCheckedChange={() => toggleAtivo('blog_posts', b.id, b.ativo, fetchBlog)} />
                  <Button variant="ghost" size="icon" onClick={() => { setBlogEditing(b.id); setBlogForm({ titulo: b.titulo, resumo: b.resumo, imagem: b.imagem, categoria: b.categoria, data_publicacao: b.data_publicacao, ativo: b.ativo }); setBlogDialog(true); }}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('blog_posts', b.id, fetchBlog)}><Trash2 size={16} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ─── FAQ TAB ───────────────────── */}
        <TabsContent value="faq" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setFaqEditing(null); setFaqForm({ pergunta: '', resposta: '', ordem: 0, ativo: true }); setFaqDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" /> Nova FAQ</Button>
          </div>
          {faqLoading ? [1,2].map(i => <Skeleton key={i} className="h-16" />) : faqs.map(f => (
            <Card key={f.id} className={!f.ativo ? 'opacity-50' : ''}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-sm line-clamp-1">{f.pergunta}</p>
                  <p className="text-xs text-gray-500">Ordem: {f.ordem}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={f.ativo} onCheckedChange={() => toggleAtivo('faqs', f.id, f.ativo, fetchFaqs)} />
                  <Button variant="ghost" size="icon" onClick={() => { setFaqEditing(f.id); setFaqForm({ pergunta: f.pergunta, resposta: f.resposta, ordem: f.ordem, ativo: f.ativo }); setFaqDialog(true); }}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('faqs', f.id, fetchFaqs)}><Trash2 size={16} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ─── COMPANIES TAB ─────────────── */}
        <TabsContent value="companies" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => { setCompEditing(null); setCompForm({ nome: '', logo_url: '', ordem: 0, ativo: true }); setCompDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" /> Adicionar Empresa</Button>
          </div>
          {compLoading ? [1,2].map(i => <Skeleton key={i} className="h-16" />) : companies.map(c => (
            <Card key={c.id} className={!c.ativo ? 'opacity-50' : ''}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={c.logo_url} alt={c.nome} className="w-12 h-8 object-contain" />
                  <div>
                    <p className="font-semibold text-sm">{c.nome}</p>
                    <p className="text-xs text-gray-500">Ordem: {c.ordem}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={c.ativo} onCheckedChange={() => toggleAtivo('trusted_companies', c.id, c.ativo, fetchCompanies)} />
                  <Button variant="ghost" size="icon" onClick={() => { setCompEditing(c.id); setCompForm({ nome: c.nome, logo_url: c.logo_url, ordem: c.ordem, ativo: c.ativo }); setCompDialog(true); }}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deleteItem('trusted_companies', c.id, fetchCompanies)}><Trash2 size={16} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* ─── DIALOGS ─────────────────────── */}
      {/* Team Dialog */}
      <Dialog open={teamDialog} onOpenChange={setTeamDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{teamEditing ? 'Editar Membro' : 'Novo Membro'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nome</Label><Input value={teamForm.nome} onChange={e => setTeamForm({ ...teamForm, nome: e.target.value })} /></div>
            <div><Label>Cargo</Label><Input value={teamForm.cargo} onChange={e => setTeamForm({ ...teamForm, cargo: e.target.value })} /></div>
            <div><Label>URL da Imagem</Label><Input value={teamForm.imagem} onChange={e => setTeamForm({ ...teamForm, imagem: e.target.value })} /></div>
            <div><Label>LinkedIn</Label><Input value={teamForm.linkedin} onChange={e => setTeamForm({ ...teamForm, linkedin: e.target.value })} /></div>
            <div><Label>Ordem</Label><Input type="number" value={teamForm.ordem} onChange={e => setTeamForm({ ...teamForm, ordem: Number(e.target.value) })} /></div>
            <div className="flex items-center gap-3"><Switch checked={teamForm.ativo} onCheckedChange={v => setTeamForm({ ...teamForm, ativo: v })} /><Label>Visível no site</Label></div>
            <Button onClick={saveTeam} className="w-full gold-gradient-bg text-white">{teamEditing ? 'Guardar' : 'Criar'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Testimonial Dialog */}
      <Dialog open={testDialog} onOpenChange={setTestDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{testEditing ? 'Editar Testemunho' : 'Novo Testemunho'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nome</Label><Input value={testForm.nome} onChange={e => setTestForm({ ...testForm, nome: e.target.value })} /></div>
            <div><Label>Empresa</Label><Input value={testForm.empresa} onChange={e => setTestForm({ ...testForm, empresa: e.target.value })} /></div>
            <div><Label>Testemunho</Label><Textarea value={testForm.texto} onChange={e => setTestForm({ ...testForm, texto: e.target.value })} /></div>
            <div><Label>URL do Vídeo (opcional)</Label><Input value={testForm.video_url} onChange={e => setTestForm({ ...testForm, video_url: e.target.value })} placeholder="https://..." /></div>
            <div><Label>Ordem</Label><Input type="number" value={testForm.ordem} onChange={e => setTestForm({ ...testForm, ordem: Number(e.target.value) })} /></div>
            <div className="flex items-center gap-3"><Switch checked={testForm.ativo} onCheckedChange={v => setTestForm({ ...testForm, ativo: v })} /><Label>Visível no site</Label></div>
            <Button onClick={saveTestimonial} className="w-full gold-gradient-bg text-white">{testEditing ? 'Guardar' : 'Criar'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Blog Dialog */}
      <Dialog open={blogDialog} onOpenChange={setBlogDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{blogEditing ? 'Editar Artigo' : 'Novo Artigo'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Título</Label><Input value={blogForm.titulo} onChange={e => setBlogForm({ ...blogForm, titulo: e.target.value })} /></div>
            <div><Label>Resumo</Label><Textarea value={blogForm.resumo} onChange={e => setBlogForm({ ...blogForm, resumo: e.target.value })} /></div>
            <div><Label>URL da Imagem</Label><Input value={blogForm.imagem} onChange={e => setBlogForm({ ...blogForm, imagem: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Categoria</Label><Input value={blogForm.categoria} onChange={e => setBlogForm({ ...blogForm, categoria: e.target.value })} /></div>
              <div><Label>Data</Label><Input type="date" value={blogForm.data_publicacao} onChange={e => setBlogForm({ ...blogForm, data_publicacao: e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-3"><Switch checked={blogForm.ativo} onCheckedChange={v => setBlogForm({ ...blogForm, ativo: v })} /><Label>Publicado</Label></div>
            <Button onClick={saveBlog} className="w-full gold-gradient-bg text-white">{blogEditing ? 'Guardar' : 'Criar'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* FAQ Dialog */}
      <Dialog open={faqDialog} onOpenChange={setFaqDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{faqEditing ? 'Editar FAQ' : 'Nova FAQ'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Pergunta</Label><Input value={faqForm.pergunta} onChange={e => setFaqForm({ ...faqForm, pergunta: e.target.value })} /></div>
            <div><Label>Resposta</Label><Textarea value={faqForm.resposta} onChange={e => setFaqForm({ ...faqForm, resposta: e.target.value })} /></div>
            <div><Label>Ordem</Label><Input type="number" value={faqForm.ordem} onChange={e => setFaqForm({ ...faqForm, ordem: Number(e.target.value) })} /></div>
            <div className="flex items-center gap-3"><Switch checked={faqForm.ativo} onCheckedChange={v => setFaqForm({ ...faqForm, ativo: v })} /><Label>Visível no site</Label></div>
            <Button onClick={saveFaq} className="w-full gold-gradient-bg text-white">{faqEditing ? 'Guardar' : 'Criar'}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Company Dialog */}
      <Dialog open={compDialog} onOpenChange={setCompDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{compEditing ? 'Editar Empresa' : 'Nova Empresa'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nome</Label><Input value={compForm.nome} onChange={e => setCompForm({ ...compForm, nome: e.target.value })} /></div>
            <div><Label>URL do Logotipo</Label><Input value={compForm.logo_url} onChange={e => setCompForm({ ...compForm, logo_url: e.target.value })} /></div>
            <div><Label>Ordem</Label><Input type="number" value={compForm.ordem} onChange={e => setCompForm({ ...compForm, ordem: Number(e.target.value) })} /></div>
            <div className="flex items-center gap-3"><Switch checked={compForm.ativo} onCheckedChange={v => setCompForm({ ...compForm, ativo: v })} /><Label>Visível no site</Label></div>
            <Button onClick={saveCompany} className="w-full gold-gradient-bg text-white">{compEditing ? 'Guardar' : 'Criar'}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
