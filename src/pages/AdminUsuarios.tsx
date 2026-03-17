import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield, ShieldOff, UserCheck, Plus, Pencil, Trash2 } from 'lucide-react';

type Profile = { id: string; full_name: string | null; email: string | null; created_at: string };
type UserRole = { id: string; user_id: string; role: 'admin' | 'manager' };

export default function AdminUsuarios() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<Profile | null>(null);
  const [createForm, setCreateForm] = useState({ email: '', password: '', full_name: '', role: 'manager' });
  const [editForm, setEditForm] = useState({ email: '', password: '', full_name: '' });
  const [saving, setSaving] = useState(false);
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

  const callManageUsers = async (payload: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    const res = await supabase.functions.invoke('manage-users', {
      body: payload,
    });
    if (res.error) throw new Error(res.error.message);
    if (res.data?.error) throw new Error(res.data.error);
    return res.data;
  };

  const handleCreateUser = async () => {
    if (!createForm.email || !createForm.password) return;
    setSaving(true);
    try {
      await callManageUsers({
        action: 'create',
        email: createForm.email,
        password: createForm.password,
        full_name: createForm.full_name,
        role: createForm.role,
      });
      toast({ title: 'Utilizador criado com sucesso' });
      setCreateOpen(false);
      setCreateForm({ email: '', password: '', full_name: '', role: 'manager' });
      fetchData();
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleEditUser = async () => {
    if (!editingUser) return;
    setSaving(true);
    try {
      await callManageUsers({
        action: 'update',
        user_id: editingUser.id,
        email: editForm.email || undefined,
        password: editForm.password || undefined,
        full_name: editForm.full_name,
      });
      toast({ title: 'Utilizador atualizado' });
      setEditOpen(false);
      setEditingUser(null);
      fetchData();
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Eliminar este utilizador permanentemente?')) return;
    try {
      await callManageUsers({ action: 'delete', user_id: userId });
      toast({ title: 'Utilizador eliminado' });
      fetchData();
    } catch (err: any) {
      toast({ title: 'Erro', description: err.message, variant: 'destructive' });
    }
  };

  const addRole = async (userId: string, role: 'admin' | 'manager') => {
    await supabase.from('user_roles').delete().eq('user_id', userId);
    await supabase.from('user_roles').insert({ user_id: userId, role });
    toast({ title: `Role de acesso alterada para ${role}` });
    fetchData();
  };

  const removeRole = async (roleId: string) => {
    await supabase.from('user_roles').delete().eq('id', roleId);
    toast({ title: 'Role removida' });
    fetchData();
  };

  if (loading) return <div className="space-y-4">{[1, 2, 3].map(i => <Skeleton key={i} className="h-20" />)}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestão de Utilizadores</h1>
          <p className="text-gray-500 text-sm">Gerir utilizadores e permissões de acesso</p>
        </div>
        <Button onClick={() => setCreateOpen(true)} className="gold-gradient-bg text-white">
          <Plus size={16} className="mr-2" /> Novo Utilizador
        </Button>
      </div>

      {profiles.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-gray-400">
          <UserCheck size={48} className="mx-auto mb-4 opacity-50" />
          <p>Nenhum utilizador registado ainda.</p>
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
                        </span>
                      ))}
                      {userRoles.length === 0 && <span className="text-xs text-gray-400">Sem permissões</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={userRoles[0]?.role || ''} onValueChange={(v) => addRole(p.id, v as 'admin' | 'manager')}>
                      <SelectTrigger className="w-[140px]"><SelectValue placeholder="Atribuir role" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" size="icon" onClick={() => {
                      setEditingUser(p);
                      setEditForm({ email: p.email || '', password: '', full_name: p.full_name || '' });
                      setEditOpen(true);
                    }}><Pencil size={16} /></Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDeleteUser(p.id)}><Trash2 size={16} /></Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create User Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Novo Utilizador</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nome Completo</Label><Input value={createForm.full_name} onChange={e => setCreateForm({ ...createForm, full_name: e.target.value })} /></div>
            <div><Label>E-mail</Label><Input type="email" value={createForm.email} onChange={e => setCreateForm({ ...createForm, email: e.target.value })} required /></div>
            <div><Label>Palavra-passe</Label><Input type="password" value={createForm.password} onChange={e => setCreateForm({ ...createForm, password: e.target.value })} required /></div>
            <div><Label>Role</Label>
              <Select value={createForm.role} onValueChange={v => setCreateForm({ ...createForm, role: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreateUser} disabled={saving} className="w-full gold-gradient-bg text-white">
              {saving ? 'A criar...' : 'Criar Utilizador'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Editar Utilizador</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nome Completo</Label><Input value={editForm.full_name} onChange={e => setEditForm({ ...editForm, full_name: e.target.value })} /></div>
            <div><Label>E-mail</Label><Input type="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} /></div>
            <div><Label>Nova Palavra-passe (deixar vazio para manter)</Label><Input type="password" value={editForm.password} onChange={e => setEditForm({ ...editForm, password: e.target.value })} /></div>
            <Button onClick={handleEditUser} disabled={saving} className="w-full gold-gradient-bg text-white">
              {saving ? 'A guardar...' : 'Guardar'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
