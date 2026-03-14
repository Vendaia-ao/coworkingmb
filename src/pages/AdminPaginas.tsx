import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Save, Pencil, Trash2, Plus } from 'lucide-react';

type Plan = { id: string; servico: string; nome: string; preco: string; periodo: string; features: string[]; destaque: boolean; promo: string | null; nota: string | null; preco_alt: string | null; ordem: number; ativo: boolean };

export default function AdminPaginas() {
  const { toast } = useToast();
  const [tab, setTab] = useState('sobre');
  const [config, setConfig] = useState<Record<string, string>>({});
  const [configLoading, setConfigLoading] = useState(true);

  // Plans
  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [planDialog, setPlanDialog] = useState(false);
  const [planEditing, setPlanEditing] = useState<string | null>(null);
  const [planForm, setPlanForm] = useState({ servico: 'escritorio-virtual', nome: '', preco: '', periodo: '', features: '', destaque: false, promo: '', nota: '', preco_alt: '', ordem: 0, ativo: true });
  const [planFilter, setPlanFilter] = useState('escritorio-virtual');

  const fetchConfig = async () => {
    const { data } = await supabase.from('site_config').select('*');
    const m: Record<string, string> = {};
    (data || []).forEach((c: any) => { m[c.chave] = c.valor || ''; });
    setConfig(m);
    setConfigLoading(false);
  };

  const fetchPlans = async () => {
    const { data } = await (supabase.from('servicos_planos' as any) as any).select('*').order('ordem');
    setPlans((data as Plan[]) || []);
    setPlansLoading(false);
  };

  useEffect(() => { fetchConfig(); fetchPlans(); }, []);

  const upsertConfig = async (chave: string, valor: string) => {
    const { data } = await supabase.from('site_config').select('id').eq('chave', chave).single();
    if (data) await supabase.from('site_config').update({ valor }).eq('chave', chave);
    else await supabase.from('site_config').insert({ chave, valor });
  };

  const saveAbout = async () => {
    await Promise.all([
      upsertConfig('about_descricao1', config.about_descricao1 || ''),
      upsertConfig('about_descricao2', config.about_descricao2 || ''),
      upsertConfig('about_missao', config.about_missao || ''),
      upsertConfig('about_visao', config.about_visao || ''),
      upsertConfig('about_citacao', config.about_citacao || ''),
    ]);
    toast({ title: 'Página Sobre atualizada' });
  };

  const saveContact = async () => {
    await Promise.all([
      upsertConfig('telefone', config.telefone || ''),
      upsertConfig('email', config.email || ''),
      upsertConfig('morada', config.morada || ''),
      upsertConfig('horario', config.horario || ''),
      upsertConfig('contact_mapa_url', config.contact_mapa_url || ''),
      upsertConfig('contact_subtitulo', config.contact_subtitulo || ''),
    ]);
    toast({ title: 'Página Contacto atualizada' });
  };

  const savePlan = async () => {
    const featuresArr = planForm.features.split('\n').map(f => f.trim()).filter(Boolean);
    const payload = {
      servico: planForm.servico, nome: planForm.nome, preco: planForm.preco, periodo: planForm.periodo,
      features: featuresArr, destaque: planForm.destaque,
      promo: planForm.promo || null, nota: planForm.nota || null, preco_alt: planForm.preco_alt || null,
      ordem: planForm.ordem, ativo: planForm.ativo
    };
    if (planEditing) await (supabase.from('servicos_planos' as any) as any).update(payload).eq('id', planEditing);
    else await (supabase.from('servicos_planos' as any) as any).insert(payload);
    toast({ title: 'Plano guardado' });
    setPlanDialog(false); setPlanEditing(null); fetchPlans();
  };

  const deletePlan = async (id: string) => {
    if (!confirm('Eliminar este plano?')) return;
    await (supabase.from('servicos_planos' as any) as any).delete().eq('id', id);
    toast({ title: 'Plano eliminado' });
    fetchPlans();
  };

  const filteredPlans = plans.filter(p => p.servico === planFilter);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Páginas</h1><p className="text-gray-500 text-sm">Gerir conteúdo das páginas do website</p></div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex flex-wrap gap-1 h-auto">
          <TabsTrigger value="sobre" className="text-xs">Sobre</TabsTrigger>
          <TabsTrigger value="contacto" className="text-xs">Contacto</TabsTrigger>
          <TabsTrigger value="planos" className="text-xs">Planos de Serviço</TabsTrigger>
        </TabsList>

        {/* ABOUT */}
        <TabsContent value="sobre">
          {configLoading ? <Skeleton className="h-64" /> : (
            <Card><CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg">Página Sobre</h3>
              <div><Label>Descrição 1</Label><Textarea rows={3} value={config.about_descricao1 || ''} onChange={e => setConfig({ ...config, about_descricao1: e.target.value })} /></div>
              <div><Label>Descrição 2</Label><Textarea rows={3} value={config.about_descricao2 || ''} onChange={e => setConfig({ ...config, about_descricao2: e.target.value })} /></div>
              <div><Label>Missão</Label><Textarea rows={3} value={config.about_missao || ''} onChange={e => setConfig({ ...config, about_missao: e.target.value })} /></div>
              <div><Label>Visão</Label><Textarea rows={3} value={config.about_visao || ''} onChange={e => setConfig({ ...config, about_visao: e.target.value })} /></div>
              <div><Label>Citação</Label><Input value={config.about_citacao || ''} onChange={e => setConfig({ ...config, about_citacao: e.target.value })} /></div>
              <Button onClick={saveAbout} className="gold-gradient-bg text-white"><Save size={16} className="mr-2" />Guardar</Button>
            </CardContent></Card>
          )}
        </TabsContent>

        {/* CONTACT */}
        <TabsContent value="contacto">
          {configLoading ? <Skeleton className="h-64" /> : (
            <Card><CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-lg">Página Contacto</h3>
              <div><Label>Telefone</Label><Input value={config.telefone || ''} onChange={e => setConfig({ ...config, telefone: e.target.value })} /></div>
              <div><Label>E-mail</Label><Input value={config.email || ''} onChange={e => setConfig({ ...config, email: e.target.value })} /></div>
              <div><Label>Morada</Label><Input value={config.morada || ''} onChange={e => setConfig({ ...config, morada: e.target.value })} /></div>
              <div><Label>Horário</Label><Input value={config.horario || ''} onChange={e => setConfig({ ...config, horario: e.target.value })} /></div>
              <div><Label>Subtítulo da Página</Label><Textarea value={config.contact_subtitulo || ''} onChange={e => setConfig({ ...config, contact_subtitulo: e.target.value })} /></div>
              <div><Label>URL do Mapa (Google Maps Embed)</Label><Input value={config.contact_mapa_url || ''} onChange={e => setConfig({ ...config, contact_mapa_url: e.target.value })} /></div>
              <Button onClick={saveContact} className="gold-gradient-bg text-white"><Save size={16} className="mr-2" />Guardar</Button>
            </CardContent></Card>
          )}
        </TabsContent>

        {/* PLANS */}
        <TabsContent value="planos" className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              {[{ v: 'escritorio-virtual', l: 'Escritório Virtual' }, { v: 'salas', l: 'Salas' }, { v: 'secretarias', l: 'Secretárias' }].map(s => (
                <Button key={s.v} variant={planFilter === s.v ? 'default' : 'outline'} size="sm" onClick={() => setPlanFilter(s.v)}>{s.l}</Button>
              ))}
            </div>
            <Button onClick={() => { setPlanEditing(null); setPlanForm({ servico: planFilter, nome: '', preco: '', periodo: '', features: '', destaque: false, promo: '', nota: '', preco_alt: '', ordem: 0, ativo: true }); setPlanDialog(true); }} className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" />Novo Plano</Button>
          </div>

          {plansLoading ? [1,2,3].map(i => <Skeleton key={i} className="h-20" />) : filteredPlans.map(p => (
            <Card key={p.id} className={!p.ativo ? 'opacity-50' : ''}><CardContent className="p-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2"><p className="font-semibold">{p.nome}</p>{p.destaque && <span className="text-xs bg-gold/20 text-gold-dark px-2 py-0.5 rounded-full">Destaque</span>}</div>
                <p className="text-sm text-gray-500">{p.preco} {p.periodo} · {p.features.length} features</p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={p.ativo} onCheckedChange={async () => { await (supabase.from('servicos_planos' as any) as any).update({ ativo: !p.ativo }).eq('id', p.id); fetchPlans(); }} />
                <Button variant="ghost" size="icon" onClick={() => { setPlanEditing(p.id); setPlanForm({ servico: p.servico, nome: p.nome, preco: p.preco, periodo: p.periodo, features: p.features.join('\n'), destaque: p.destaque, promo: p.promo || '', nota: p.nota || '', preco_alt: p.preco_alt || '', ordem: p.ordem, ativo: p.ativo }); setPlanDialog(true); }}><Pencil size={16} /></Button>
                <Button variant="ghost" size="icon" className="text-red-500" onClick={() => deletePlan(p.id)}><Trash2 size={16} /></Button>
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Plan Dialog */}
      <Dialog open={planDialog} onOpenChange={setPlanDialog}><DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto"><DialogHeader><DialogTitle>{planEditing ? 'Editar' : 'Novo'} Plano</DialogTitle></DialogHeader><div className="space-y-4">
        <div><Label>Serviço</Label>
          <select value={planForm.servico} onChange={e => setPlanForm({ ...planForm, servico: e.target.value })} className="w-full p-2 border rounded-md">
            <option value="escritorio-virtual">Escritório Virtual</option><option value="salas">Salas</option><option value="secretarias">Secretárias</option>
          </select>
        </div>
        <div><Label>Nome do Plano</Label><Input value={planForm.nome} onChange={e => setPlanForm({ ...planForm, nome: e.target.value })} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Preço</Label><Input value={planForm.preco} onChange={e => setPlanForm({ ...planForm, preco: e.target.value })} placeholder="10.500" /></div>
          <div><Label>Período</Label><Input value={planForm.periodo} onChange={e => setPlanForm({ ...planForm, periodo: e.target.value })} placeholder="Kz / mês" /></div>
        </div>
        <div><Label>Características (uma por linha)</Label><Textarea rows={6} value={planForm.features} onChange={e => setPlanForm({ ...planForm, features: e.target.value })} placeholder="Internet de Alta Velocidade&#10;Sala de reunião..." /></div>
        <div><Label>Promoção (opcional)</Label><Textarea value={planForm.promo} onChange={e => setPlanForm({ ...planForm, promo: e.target.value })} /></div>
        <div><Label>Nota (opcional)</Label><Input value={planForm.nota} onChange={e => setPlanForm({ ...planForm, nota: e.target.value })} /></div>
        <div><Label>Preço Alternativo (opcional)</Label><Input value={planForm.preco_alt} onChange={e => setPlanForm({ ...planForm, preco_alt: e.target.value })} /></div>
        <div><Label>Ordem</Label><Input type="number" value={planForm.ordem} onChange={e => setPlanForm({ ...planForm, ordem: Number(e.target.value) })} /></div>
        <div className="flex items-center gap-3"><Switch checked={planForm.destaque} onCheckedChange={v => setPlanForm({ ...planForm, destaque: v })} /><Label>Plano em Destaque</Label></div>
        <div className="flex items-center gap-3"><Switch checked={planForm.ativo} onCheckedChange={v => setPlanForm({ ...planForm, ativo: v })} /><Label>Visível no site</Label></div>
        <Button onClick={savePlan} className="w-full gold-gradient-bg text-white">Guardar</Button>
      </div></DialogContent></Dialog>
    </div>
  );
}
