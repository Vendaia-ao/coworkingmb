import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield, ShieldOff, UserCheck } from 'lucide-react';

type Profile = { id: string; full_name: string | null; email: string | null; created_at: string };
type UserRole = { id: string; user_id: string; role: 'admin' | 'manager' };

export default function AdminUsuarios() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchData = async () => {
    const [pRes, rRes] = await Promise.all([
      supabase.from('profiles').select('*').order('created_at', { ascending: false }),
      supabase.from('user_roles').select('*'),
    ]);
    setProfiles((pRes.data as any[]) || []);
    setRoles((rRes.data as any[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const getUserRoles = (userId: string) => roles.filter(r => r.user_id === userId);

  const addRole = async (userId: string, role: 'admin' | 'manager') => {
    const existing = roles.find(r => r.user_id === userId && r.role === role);
    if (existing) return;
    await supabase.from('user_roles').insert({ user_id: userId, role });
    toast({ title: `Role ${role} atribuída` });
    fetchData();
  };

  const removeRole = async (roleId: string) => {
    await supabase.from('user_roles').delete().eq('id', roleId);
    toast({ title: 'Role removida' });
    fetchData();
  };

  if (loading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-20" />)}</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gestão de Utilizadores</h1>
        <p className="text-gray-500 text-sm">Gerir utilizadores e permissões de acesso</p>
      </div>

      {profiles.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-gray-400">
          <UserCheck size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nenhum utilizador registado ainda.</p>
          <p className="text-sm mt-2">Os utilizadores aparecem aqui depois de se registarem no sistema.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {profiles.map(p => {
            const userRoles = getUserRoles(p.id);
            return (
              <Card key={p.id}>
                <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{p.full_name || 'Sem nome'}</p>
                    <p className="text-sm text-gray-500">{p.email || '—'}</p>
                    <div className="flex gap-2 mt-2">
                      {userRoles.map(r => (
                        <span key={r.id} className="inline-flex items-center gap-1 text-xs bg-gold/10 text-gold-dark px-2 py-1 rounded-full font-medium">
                          <Shield size={12} /> {r.role}
                          <button onClick={() => removeRole(r.id)} className="ml-1 text-red-400 hover:text-red-600"><ShieldOff size={12} /></button>
                        </span>
                      ))}
                      {userRoles.length === 0 && <span className="text-xs text-gray-400">Sem permissões</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select onValueChange={(v) => addRole(p.id, v as 'admin' | 'manager')}>
                      <SelectTrigger className="w-[140px]"><SelectValue placeholder="Atribuir role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
