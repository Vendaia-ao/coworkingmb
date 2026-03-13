import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { LayoutDashboard, DoorOpen, CalendarDays, Users, Settings, LogOut, Menu, X, Bell, FileEdit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Gestão de Salas', href: '/admin/recursos', icon: DoorOpen },
  { label: 'Calendário de Reservas', href: '/admin/reservas', icon: CalendarDays },
  { label: 'Clientes', href: '/admin/clientes', icon: Users },
  { label: 'Conteúdo do Site', href: '/admin/conteudo', icon: FileEdit },
  { label: 'Configurações', href: '/admin/configuracoes', icon: Settings },
];

export default function AdminLayout() {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newBookings, setNewBookings] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/admin/login'); return; }
      const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', user.id);
      const isAdmin = roles?.some((r: any) => r.role === 'admin' || r.role === 'manager');
      if (!isAdmin) { await supabase.auth.signOut(); navigate('/admin/login'); return; }
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  // Realtime for new bookings
  useEffect(() => {
    const channel = supabase
      .channel('reservas-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'reservas' }, () => {
        setNewBookings(prev => prev + 1);
        toast({ title: '🔔 Nova reserva!', description: 'Foi recebida uma nova reserva.' });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="space-y-4 w-64">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-8 w-1/2" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-brand-dark text-white transform transition-transform duration-300 lg:translate-x-0 lg:static ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-white/10">
          <Link to="/admin">
            <img src="/logotipo.png" alt="MB Admin" className="h-12" />
          </Link>
          <p className="text-xs text-gray-400 mt-2">Back-office</p>
        </div>
        <nav className="p-4 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.href ? 'bg-gold/20 text-gold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {item.label === 'Calendário de Reservas' && newBookings > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{newBookings}</span>
              )}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/5 hover:text-white w-full transition-colors">
            <LogOut size={18} /> Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <div className="relative">
              <Bell size={20} className="text-gray-500" />
              {newBookings > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{newBookings}</span>}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
