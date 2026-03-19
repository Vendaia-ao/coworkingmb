import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Link as LinkIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}

export function ImageUpload({ value, onChange, label = 'Imagem', accept = 'image/*' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<'url' | 'upload'>('url');
  const { toast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split('.').pop();
    const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const { error } = await supabase.storage.from('galeria').upload(path, file);
    if (error) {
      console.error('Upload error:', error);
      toast({ title: 'Erro de upload', description: 'Não foi possível carregar o ficheiro. Verifique o tamanho e o formato.', variant: 'destructive' });
      setUploading(false);
      return;
    }
    toast({ title: 'Sucesso', description: 'Ficheiro carregado com sucesso!' });
    const { data: { publicUrl } } = supabase.storage.from('galeria').getPublicUrl(path);
    onChange(publicUrl);
    setUploading(false);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2 mb-2">
        <Button type="button" variant={mode === 'url' ? 'default' : 'outline'} size="sm" onClick={() => setMode('url')}>
          <LinkIcon size={14} className="mr-1" /> URL
        </Button>
        <Button type="button" variant={mode === 'upload' ? 'default' : 'outline'} size="sm" onClick={() => setMode('upload')}>
          <Upload size={14} className="mr-1" /> Upload
        </Button>
      </div>
      {mode === 'url' ? (
        <Input value={value} onChange={e => onChange(e.target.value)} placeholder="https://..." />
      ) : (
        <div>
          <input type="file" accept={accept} onChange={handleUpload} className="text-sm" disabled={uploading} />
          {uploading && <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> A carregar...</p>}
        </div>
      )}
      {value && value !== '/placeholder.svg' && !value.match(/\.(mp4|webm|ogg)$/i) && (
        <img src={value} alt="Preview" className="w-20 h-20 object-cover rounded mt-2 border" />
      )}
      {value && value.match(/\.(mp4|webm|ogg)$/i) && (
        <video src={value} controls className="w-40 h-24 object-contain rounded mt-2 border bg-black" />
      )}
    </div>
  );
}
