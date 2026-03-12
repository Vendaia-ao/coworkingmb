import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2 } from 'lucide-react';

type Recurso = {
  id: string; nome: string; descricao: string | null; tipo: string; capacidade: number;
  preco_hora: number | null; preco_info: string | null; tour_virtual_url: string | null;
  galeria: string[]; ativo: boolean;
};

const TIPOS = [
  { value: 'sala_reuniao', label: 'Sala de Reunião' },
  { value: 'sala_formacao', label: 'Sala de Formação' },
  { value: 'sala_privada', label: 'Sala Privada' },
  { value: 'hot_desk', label: 'Hot Desk / Secretária' },
];

const emptyForm = { nome: '', descricao: '', tipo: 'sala_reuniao', capacidade: 1, preco_hora: '', preco_info: '', tour_virtual_url: '', ativo: true };

export default function AdminRecursos() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const { toast } = useToast();

  const fetchRecursos = async () => {
    const { data } = await supabase.from('recursos').select('*').order('created_at', { ascending: false });
    setRecursos((data as any[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchRecursos(); }, []);

  const handleSave = async () => {
    const payload = {
      nome: form.nome, descricao: form.descricao || null, tipo: form.tipo,
      capacidade: Number(form.capacidade), preco_hora: form.preco_hora ? Number(form.preco_hora) : null,
      preco_info: form.preco_info || null, tour_virtual_url: form.tour_virtual_url || null, ativo: form.ativo,
    };
    if (editing) {
      await supabase.from('recursos').update(payload).eq('id', editing);
      toast({ title: 'Recurso atualizado' });
    } else {
      await supabase.from('recursos').insert(payload);
      toast({ title: 'Recurso criado' });
    }
    setDialogOpen(false);
    setEditing(null);
    setForm(emptyForm);
    fetchRecursos();
  };

  const handleEdit = (r: Recurso) => {
    setEditing(r.id);
    setForm({ nome: r.nome, descricao: r.descricao || '', tipo: r.tipo, capacidade: r.capacidade, preco_hora: r.preco_hora?.toString() || '', preco_info: r.preco_info || '', tour_virtual_url: r.tour_virtual_url || '', ativo: r.ativo });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar este recurso?')) return;
    await supabase.from('recursos').delete().eq('id', id);
    toast({ title: 'Recurso eliminado' });
    fetchRecursos();
  };

  const toggleAtivo = async (id: string, ativo: boolean) => {
    await supabase.from('recursos').update({ ativo: !ativo }).eq('id', id);
    toast({ title: ativo ? 'Recurso desativado' : 'Recurso ativado' });
    fetchRecursos();
  };

  if (loading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-20" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Salas</h1>
          <p className="text-gray-500 text-sm">Gerir salas, secretárias e espaços</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditing(null); setForm(emptyForm); } }}>
          <DialogTrigger asChild>
            <Button className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" /> Adicionar</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? 'Editar Recurso' : 'Novo Recurso'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nome</Label><Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></div>
              <div><Label>Tipo</Label>
                <Select value={form.tipo} onValueChange={v => setForm({ ...form, tipo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{TIPOS.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Capacidade</Label><Input type="number" value={form.capacidade} onChange={e => setForm({ ...form, capacidade: Number(e.target.value) })} /></div>
                <div><Label>Preço/Hora (Kz)</Label><Input type="number" value={form.preco_hora} onChange={e => setForm({ ...form, preco_hora: e.target.value })} /></div>
              </div>
              <div><Label>Info de Preço</Label><Input value={form.preco_info} onChange={e => setForm({ ...form, preco_info: e.target.value })} placeholder="Ex: 5.000 Kz até às 12H" /></div>
              <div><Label>Descrição</Label><Textarea value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} /></div>
              <div><Label>Link Tour Virtual</Label><Input value={form.tour_virtual_url} onChange={e => setForm({ ...form, tour_virtual_url: e.target.value })} /></div>
              <div className="flex items-center gap-3">
                <Switch checked={form.ativo} onCheckedChange={v => setForm({ ...form, ativo: v })} />
                <Label>Visível no site</Label>
              </div>
              <Button onClick={handleSave} className="w-full gold-gradient-bg text-white">{editing ? 'Guardar' : 'Criar'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {recursos.map(r => (
          <Card key={r.id} className={`${!r.ativo ? 'opacity-60' : ''}`}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${r.ativo ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div>
                  <p className="font-semibold">{r.nome}</p>
                  <p className="text-xs text-gray-500">{TIPOS.find(t => t.value === r.tipo)?.label} · {r.capacidade} pessoas · {r.preco_info || (r.preco_hora ? `${r.preco_hora} Kz/h` : '—')}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={r.ativo} onCheckedChange={() => toggleAtivo(r.id, r.ativo)} />
                <Button variant="ghost" size="icon" onClick={() => handleEdit(r)}><Pencil size={16} /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(r.id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {recursos.length === 0 && <p className="text-gray-400 text-center py-8">Nenhum recurso criado ainda.</p>}
      </div>
    </div>
  );
}
