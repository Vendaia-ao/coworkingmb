import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CalendarDays, DoorOpen, Clock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ clientes: 0, reservas: 0, recursos: 0, pendentes: 0 });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [clientesRes, reservasRes, recursosRes, pendentesRes, recentRes] = await Promise.all([
        supabase.from('clientes').select('id', { count: 'exact', head: true }),
        supabase.from('reservas').select('id', { count: 'exact', head: true }),
        supabase.from('recursos').select('id', { count: 'exact', head: true }),
        supabase.from('reservas').select('id', { count: 'exact', head: true }).eq('status', 'pendente'),
        supabase.from('reservas').select('*, recursos(nome)').order('created_at', { ascending: false }).limit(5),
      ]);
      setStats({
        clientes: clientesRes.count || 0,
        reservas: reservasRes.count || 0,
        recursos: recursosRes.count || 0,
        pendentes: pendentesRes.count || 0,
      });
      setRecentBookings(recentRes.data || []);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statCards = [
    { label: 'Clientes', value: stats.clientes, icon: Users, color: 'text-blue-500' },
    { label: 'Total Reservas', value: stats.reservas, icon: CalendarDays, color: 'text-green-500' },
    { label: 'Salas/Recursos', value: stats.recursos, icon: DoorOpen, color: 'text-purple-500' },
    { label: 'Pendentes', value: stats.pendentes, icon: Clock, color: 'text-amber-500' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-28" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm">Visão geral do coworking</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <Card key={s.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gray-50 ${s.color}`}>
                <s.icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-sm text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Últimas Reservas</CardTitle>
        </CardHeader>
        <CardContent>
          {recentBookings.length === 0 ? (
            <p className="text-gray-400 text-sm py-4">Sem reservas ainda.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="pb-2 font-medium">Cliente</th>
                    <th className="pb-2 font-medium">Sala</th>
                    <th className="pb-2 font-medium">Data</th>
                    <th className="pb-2 font-medium">Horário</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b: any) => (
                    <tr key={b.id} className="border-b last:border-0">
                      <td className="py-3">{b.cliente_nome || '—'}</td>
                      <td className="py-3">{b.recursos?.nome || '—'}</td>
                      <td className="py-3">{b.data}</td>
                      <td className="py-3">{b.hora_inicio} - {b.hora_fim}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          b.status === 'confirmada' ? 'bg-green-100 text-green-700' :
                          b.status === 'cancelada' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
