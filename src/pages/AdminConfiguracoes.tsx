import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Save } from 'lucide-react';

export default function AdminConfiguracoes() {
  const [configs, setConfigs] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('site_config').select('*');
      const map: Record<string, string> = {};
      (data || []).forEach((c: any) => { map[c.chave] = c.valor || ''; });
      setConfigs(map);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    const promises = Object.entries(configs).map(([chave, valor]) =>
      supabase.from('site_config').update({ valor, updated_at: new Date().toISOString() }).eq('chave', chave)
    );
    await Promise.all(promises);
    toast({ title: 'Configurações guardadas' });
  };

  if (loading) return <div className="space-y-4">{[1,2,3].map(i => <Skeleton key={i} className="h-16" />)}</div>;

  const fields = [
    { key: 'telefone', label: 'Telefone', placeholder: '+244 924 006 984' },
    { key: 'email', label: 'E-mail', placeholder: 'geral@mulatobusiness.com' },
    { key: 'morada', label: 'Morada', placeholder: 'Centralidade do Kilamba...' },
    { key: 'horario', label: 'Horário', placeholder: 'Segunda - Sexta: 08:00 - 17:00' },
    { key: 'google_reviews_widget', label: 'Widget Google Reviews (embed code)', placeholder: 'Cole o código embed aqui' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="text-gray-500 text-sm">Gerir informações do site</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Informações de Contacto</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {fields.map(f => (
            <div key={f.key}>
              <Label>{f.label}</Label>
              <Input value={configs[f.key] || ''} onChange={e => setConfigs({ ...configs, [f.key]: e.target.value })} placeholder={f.placeholder} />
            </div>
          ))}
          <Button onClick={handleSave} className="gold-gradient-bg text-white"><Save size={16} className="mr-2" /> Guardar Alterações</Button>
        </CardContent>
      </Card>
    </div>
  );
}
