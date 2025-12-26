import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface BusinessHour {
  id: string;
  day_of_week: number;
  is_open: boolean;
  open_time: string | null;
  close_time: string | null;
  open_time_2: string | null;
  close_time_2: string | null;
}

const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const AdminHours = () => {
  const [hours, setHours] = useState<BusinessHour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchHours();
  }, []);

  const fetchHours = async () => {
    const { data } = await supabase
      .from('business_hours')
      .select('*')
      .order('day_of_week');

    if (data) setHours(data);
    setIsLoading(false);
  };

  const updateHour = (dayOfWeek: number, field: keyof BusinessHour, value: any) => {
    setHours((prev) =>
      prev.map((h) =>
        h.day_of_week === dayOfWeek ? { ...h, [field]: value } : h
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);

    for (const hour of hours) {
      const { error } = await supabase
        .from('business_hours')
        .update({
          is_open: hour.is_open,
          open_time: hour.open_time,
          close_time: hour.close_time,
          open_time_2: hour.open_time_2,
          close_time_2: hour.close_time_2,
        })
        .eq('id', hour.id);

      if (error) {
        toast({ title: 'Error', description: 'No se pudieron guardar los horarios', variant: 'destructive' });
        setIsSaving(false);
        return;
      }
    }

    toast({ title: 'Guardado', description: 'Horarios actualizados correctamente' });
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Horarios de Atención">
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Horarios de Atención">
      <div className="bg-card rounded-xl border border-border overflow-hidden max-w-4xl">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <h2 className="font-display text-xl font-bold">Configurar Horarios</h2>
          <button onClick={handleSave} disabled={isSaving} className="btn-charret-gold">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Guardando...' : 'Guardar Cambios'}
          </button>
        </div>

        <div className="divide-y divide-border">
          {hours.map((hour) => (
            <div key={hour.id} className="p-4 flex flex-wrap items-center gap-4">
              <div className="w-32">
                <span className="font-medium">{dayNames[hour.day_of_week]}</span>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={hour.is_open}
                  onCheckedChange={(checked) => updateHour(hour.day_of_week, 'is_open', checked)}
                />
                <span className="text-sm text-muted-foreground">
                  {hour.is_open ? 'Abierto' : 'Cerrado'}
                </span>
              </div>

              {hour.is_open && (
                <>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Turno 1:</label>
                    <input
                      type="time"
                      value={hour.open_time || ''}
                      onChange={(e) => updateHour(hour.day_of_week, 'open_time', e.target.value || null)}
                      className="px-2 py-1 rounded border border-input bg-background text-sm"
                    />
                    <span>-</span>
                    <input
                      type="time"
                      value={hour.close_time || ''}
                      onChange={(e) => updateHour(hour.day_of_week, 'close_time', e.target.value || null)}
                      className="px-2 py-1 rounded border border-input bg-background text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Turno 2:</label>
                    <input
                      type="time"
                      value={hour.open_time_2 || ''}
                      onChange={(e) => updateHour(hour.day_of_week, 'open_time_2', e.target.value || null)}
                      className="px-2 py-1 rounded border border-input bg-background text-sm"
                    />
                    <span>-</span>
                    <input
                      type="time"
                      value={hour.close_time_2 || ''}
                      onChange={(e) => updateHour(hour.day_of_week, 'close_time_2', e.target.value || null)}
                      className="px-2 py-1 rounded border border-input bg-background text-sm"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminHours;