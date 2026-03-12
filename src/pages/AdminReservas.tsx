import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Lock, CalendarDays } from 'lucide-react';

export default function AdminReservas() {
  const [reservas, setReservas] = useState<any[]>([]);
  const [recursos, setRecursos] = useState<any[]>([]);
  const [clientes, setClientes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bloqueioOpen, setBloqueioOpen] = useState(false);
  const [form, setForm] = useState({ cliente_id: '', cliente_nome: '', recurso_id: '', data: '', hora_inicio: '', hora_fim: '', status: 'pendente', notas: '' });
  const [bloqueio, setBloqueio] = useState({ recurso_id: '', data: '', hora_inicio: '', hora_fim: '', motivo: '' });
  const [view, setView] = useState<'list' | 'grid'>('list');
  const { toast } = useToast();

  const fetchAll = async () => {
    const [resR, recR, cliR] = await Promise.all([
      supabase.from('reservas').select('*, recursos(nome)').order('data', { ascending: false }),
      supabase.from('recursos').select('*').eq('ativo', true),
      supabase.from('clientes').select('id, nome'),
    ]);
    setReservas(resR.data || []);
    setRecursos(recR.data || []);
    setClientes(cliR.data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
    // Realtime
    const channel = supabase.channel('reservas-admin').on('postgres_changes', { event: '*', schema: 'public', table: 'reservas' }, () => fetchAll()).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleCreateReserva = async () => {
    const payload = { ...form, cliente_id: form.cliente_id || null, cliente_nome: form.cliente_nome || null };
    await supabase.from('reservas').insert(payload);
    toast({ title: 'Reserva criada' });
    setDialogOpen(false);
    setForm({ cliente_id: '', cliente_nome: '', recurso_id: '', data: '', hora_inicio: '', hora_fim: '', status: 'pendente', notas: '' });
    fetchAll();
  };

  const handleBloqueio = async () => {
    await supabase.from('bloqueios').insert(bloqueio);
    toast({ title: 'Horário bloqueado' });
    setBloqueioOpen(false);
    setBloqueio({ recurso_id: '', data: '', hora_inicio: '', hora_fim: '', motivo: '' });
  };

  const updateStatus = async (id: string, status: string) => {
    await supabase.from('reservas').update({ status }).eq('id', id);
    toast({ title: `Reserva ${status}` });
    fetchAll();
  };

  if (loading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-16" />)}</div>;

  const pendentes = reservas.filter(r => r.status === 'pendente');
  const confirmadas = reservas.filter(r => r.status === 'confirmada');
  const canceladas = reservas.filter(r => r.status === 'cancelada');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendário de Reservas</h1>
          <p className="text-gray-500 text-sm">Gerir todas as marcações</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={bloqueioOpen} onOpenChange={setBloqueioOpen}>
            <DialogTrigger asChild><Button variant="outline"><Lock size={16} className="mr-2" /> Bloquear Horário</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Bloquear Horário</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Sala</Label>
                  <Select value={bloqueio.recurso_id} onValueChange={v => setBloqueio({ ...bloqueio, recurso_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecionar sala" /></SelectTrigger>
                    <SelectContent>{recursos.map(r => <SelectItem key={r.id} value={r.id}>{r.nome}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Data</Label><Input type="date" value={bloqueio.data} onChange={e => setBloqueio({ ...bloqueio, data: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Início</Label><Input type="time" value={bloqueio.hora_inicio} onChange={e => setBloqueio({ ...bloqueio, hora_inicio: e.target.value })} /></div>
                  <div><Label>Fim</Label><Input type="time" value={bloqueio.hora_fim} onChange={e => setBloqueio({ ...bloqueio, hora_fim: e.target.value })} /></div>
                </div>
                <div><Label>Motivo</Label><Input value={bloqueio.motivo} onChange={e => setBloqueio({ ...bloqueio, motivo: e.target.value })} placeholder="Ex: Manutenção" /></div>
                <Button onClick={handleBloqueio} className="w-full">Bloquear</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild><Button className="gold-gradient-bg text-white"><Plus size={16} className="mr-2" /> Nova Reserva</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Nova Reserva</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Cliente</Label>
                  <Select value={form.cliente_id} onValueChange={v => setForm({ ...form, cliente_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecionar cliente" /></SelectTrigger>
                    <SelectContent>{clientes.map(c => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Ou nome do cliente</Label><Input value={form.cliente_nome} onChange={e => setForm({ ...form, cliente_nome: e.target.value })} /></div>
                <div><Label>Sala</Label>
                  <Select value={form.recurso_id} onValueChange={v => setForm({ ...form, recurso_id: v })}>
                    <SelectTrigger><SelectValue placeholder="Selecionar sala" /></SelectTrigger>
                    <SelectContent>{recursos.map(r => <SelectItem key={r.id} value={r.id}>{r.nome}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Data</Label><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Início</Label><Input type="time" value={form.hora_inicio} onChange={e => setForm({ ...form, hora_inicio: e.target.value })} /></div>
                  <div><Label>Fim</Label><Input type="time" value={form.hora_fim} onChange={e => setForm({ ...form, hora_fim: e.target.value })} /></div>
                </div>
                <Button onClick={handleCreateReserva} className="w-full gold-gradient-bg text-white">Criar Reserva</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="pendentes">
        <TabsList>
          <TabsTrigger value="pendentes">Pendentes ({pendentes.length})</TabsTrigger>
          <TabsTrigger value="confirmadas">Confirmadas ({confirmadas.length})</TabsTrigger>
          <TabsTrigger value="canceladas">Canceladas ({canceladas.length})</TabsTrigger>
          <TabsTrigger value="todas">Todas ({reservas.length})</TabsTrigger>
        </TabsList>

        {['pendentes', 'confirmadas', 'canceladas', 'todas'].map(tab => (
          <TabsContent key={tab} value={tab}>
            <ReservasList
              reservas={tab === 'todas' ? reservas : tab === 'pendentes' ? pendentes : tab === 'confirmadas' ? confirmadas : canceladas}
              onUpdateStatus={updateStatus}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function ReservasList({ reservas, onUpdateStatus }: { reservas: any[]; onUpdateStatus: (id: string, status: string) => void }) {
  if (reservas.length === 0) return <p className="text-gray-400 text-center py-8">Nenhuma reserva.</p>;
  return (
    <div className="space-y-3 mt-4">
      {reservas.map((r: any) => (
        <Card key={r.id}>
          <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-semibold">{r.cliente_nome || '—'}</p>
              <p className="text-sm text-gray-500">{r.recursos?.nome || '—'} · {r.data} · {r.hora_inicio} - {r.hora_fim}</p>
            </div>
            <div className="flex gap-2">
              {r.status === 'pendente' && (
                <>
                  <Button size="sm" variant="outline" className="text-green-600 border-green-200" onClick={() => onUpdateStatus(r.id, 'confirmada')}>Confirmar</Button>
                  <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => onUpdateStatus(r.id, 'cancelada')}>Cancelar</Button>
                </>
              )}
              {r.status === 'confirmada' && (
                <Button size="sm" variant="outline" className="text-red-600 border-red-200" onClick={() => onUpdateStatus(r.id, 'cancelada')}>Cancelar</Button>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                r.status === 'confirmada' ? 'bg-green-100 text-green-700' :
                r.status === 'cancelada' ? 'bg-red-100 text-red-700' :
                'bg-amber-100 text-amber-700'
              }`}>{r.status}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
