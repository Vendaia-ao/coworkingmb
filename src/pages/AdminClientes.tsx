import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2, Phone, Mail, MessageCircle, Search } from 'lucide-react';

type Cliente = {
  id: string; nome: string; empresa: string | null; email: string | null;
  telefone: string | null; whatsapp: string | null; creditos_horas: number; notas: string | null;
};

const emptyForm = { nome: '', empresa: '', email: '', telefone: '', whatsapp: '', creditos_horas: '0', notas: '' };

export default function AdminClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState('');
  const { toast } = useToast();

  const fetchClientes = async () => {
    const { data } = await supabase.from('clientes').select('*').order('created_at', { ascending: false });
    setClientes((data as any[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchClientes(); }, []);

  const handleSave = async () => {
    const payload = {
      nome: form.nome, empresa: form.empresa || null, email: form.email || null,
      telefone: form.telefone || null, whatsapp: form.whatsapp || null,
      creditos_horas: Number(form.creditos_horas), notas: form.notas || null,
    };
    if (editing) {
      await supabase.from('clientes').update(payload).eq('id', editing);
      toast({ title: 'Cliente atualizado' });
    } else {
      await supabase.from('clientes').insert(payload);
      toast({ title: 'Cliente adicionado' });
    }
    setDialogOpen(false);
    setEditing(null);
    setForm(emptyForm);
    fetchClientes();
  };

  const handleEdit = (c: Cliente) => {
    setEditing(c.id);
    setForm({ nome: c.nome, empresa: c.empresa || '', email: c.email || '', telefone: c.telefone || '', whatsapp: c.whatsapp || '', creditos_horas: c.creditos_horas.toString(), notas: c.notas || '' });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Eliminar este cliente?')) return;
    await supabase.from('clientes').delete().eq('id', id);
    toast({ title: 'Cliente eliminado' });
    fetchClientes();
  };

  const filtered = clientes.filter(c =>
    c.nome.toLowerCase().includes(search.toLowerCase()) ||
    c.empresa?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-20" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
          <p className="text-gray-500 text-sm">Gestão de clientes e créditos</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) { setEditing(null); setForm(emptyForm); } }}>
          <DialogTrigger asChild><Button className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" /> Adicionar</Button></DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? 'Editar Cliente' : 'Novo Cliente'}</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Nome</Label><Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></div>
              <div><Label>Empresa</Label><Input value={form.empresa} onChange={e => setForm({ ...form, empresa: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>E-mail</Label><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
                <div><Label>Telefone</Label><Input value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>WhatsApp</Label><Input value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} /></div>
                <div><Label>Créditos (horas)</Label><Input type="number" value={form.creditos_horas} onChange={e => setForm({ ...form, creditos_horas: e.target.value })} /></div>
              </div>
              <div><Label>Notas</Label><Textarea value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></div>
              <Button onClick={handleSave} className="w-full gold-gradient-bg text-white">{editing ? 'Guardar' : 'Criar'}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input className="pl-10" placeholder="Pesquisar clientes..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="grid gap-3">
        {filtered.map(c => (
          <Card key={c.id}>
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <p className="font-semibold">{c.nome}</p>
                <p className="text-sm text-gray-500">{c.empresa || '—'}</p>
                <div className="flex gap-3 mt-1">
                  {c.email && <a href={`mailto:${c.email}`} className="text-xs text-blue-500 flex items-center gap-1"><Mail size={12} /> {c.email}</a>}
                  {c.whatsapp && <a href={`https://wa.me/${c.whatsapp.replace(/\D/g, '')}`} target="_blank" className="text-xs text-green-500 flex items-center gap-1"><MessageCircle size={12} /> WhatsApp</a>}
                  {c.telefone && <span className="text-xs text-gray-400 flex items-center gap-1"><Phone size={12} /> {c.telefone}</span>}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center px-4 py-2 bg-gold/10 rounded-lg">
                  <p className="text-lg font-bold text-gold-dark">{c.creditos_horas}h</p>
                  <p className="text-xs text-gray-500">Créditos</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(c)}><Pencil size={16} /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(c.id)} className="text-red-500"><Trash2 size={16} /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && <p className="text-gray-400 text-center py-8">Nenhum cliente encontrado.</p>}
      </div>
    </div>
  );
}
