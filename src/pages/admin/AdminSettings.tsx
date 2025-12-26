import { useState, useEffect } from 'react';
import { Save, Truck, ShoppingBag, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface Settings {
  delivery_enabled: boolean;
  pickup_enabled: boolean;
  dine_in_enabled: boolean;
  delivery_fee: number;
  orders_open: boolean;
  restaurant_phone: string;
  restaurant_address: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    delivery_enabled: true,
    pickup_enabled: true,
    dine_in_enabled: true,
    delivery_fee: 500,
    orders_open: true,
    restaurant_phone: '',
    restaurant_address: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase.from('settings').select('*');

    if (data) {
      const settingsMap: Record<string, any> = {};
      data.forEach((s) => {
        try {
          settingsMap[s.key] = JSON.parse(String(s.value));
        } catch {
          settingsMap[s.key] = s.value;
        }
      });

      setSettings({
        delivery_enabled: settingsMap.delivery_enabled ?? true,
        pickup_enabled: settingsMap.pickup_enabled ?? true,
        dine_in_enabled: settingsMap.dine_in_enabled ?? true,
        delivery_fee: Number(settingsMap.delivery_fee) || 500,
        orders_open: settingsMap.orders_open ?? true,
        restaurant_phone: settingsMap.restaurant_phone || '',
        restaurant_address: settingsMap.restaurant_address || '',
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);

    const updates = [
      { key: 'delivery_enabled', value: JSON.stringify(settings.delivery_enabled) },
      { key: 'pickup_enabled', value: JSON.stringify(settings.pickup_enabled) },
      { key: 'dine_in_enabled', value: JSON.stringify(settings.dine_in_enabled) },
      { key: 'delivery_fee', value: JSON.stringify(settings.delivery_fee) },
      { key: 'orders_open', value: JSON.stringify(settings.orders_open) },
      { key: 'restaurant_phone', value: JSON.stringify(settings.restaurant_phone) },
      { key: 'restaurant_address', value: JSON.stringify(settings.restaurant_address) },
    ];

    for (const { key, value } of updates) {
      await supabase.from('settings').update({ value }).eq('key', key);
    }

    toast({ title: 'Guardado', description: 'Configuración actualizada' });
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <AdminLayout title="Configuración">
        <div className="flex justify-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Configuración">
      <div className="max-w-2xl space-y-6">
        {/* Orders Status */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-xl font-bold mb-4">Estado del Restaurante</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Pedidos Activos</p>
              <p className="text-sm text-muted-foreground">
                {settings.orders_open ? 'Aceptando pedidos' : 'Pedidos cerrados'}
              </p>
            </div>
            <Switch
              checked={settings.orders_open}
              onCheckedChange={(checked) => setSettings({ ...settings, orders_open: checked })}
            />
          </div>
        </div>

        {/* Modalities */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-xl font-bold mb-4">Modalidades de Pedido</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Consumir en Local</p>
                  <p className="text-sm text-muted-foreground">Permitir pedidos para consumir en el salón</p>
                </div>
              </div>
              <Switch
                checked={settings.dine_in_enabled}
                onCheckedChange={(checked) => setSettings({ ...settings, dine_in_enabled: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Retiro en Local</p>
                  <p className="text-sm text-muted-foreground">Permitir pedidos para retirar</p>
                </div>
              </div>
              <Switch
                checked={settings.pickup_enabled}
                onCheckedChange={(checked) => setSettings({ ...settings, pickup_enabled: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Delivery</p>
                  <p className="text-sm text-muted-foreground">Permitir pedidos con envío a domicilio</p>
                </div>
              </div>
              <Switch
                checked={settings.delivery_enabled}
                onCheckedChange={(checked) => setSettings({ ...settings, delivery_enabled: checked })}
              />
            </div>
          </div>
        </div>

        {/* Delivery Fee */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-xl font-bold mb-4">Costo de Envío</h2>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold">$</span>
            <input
              type="number"
              value={settings.delivery_fee}
              onChange={(e) => setSettings({ ...settings, delivery_fee: Number(e.target.value) })}
              className="w-32 px-4 py-2 rounded-lg border border-input bg-background text-lg font-bold"
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-display text-xl font-bold mb-4">Información de Contacto</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Teléfono</label>
              <input
                type="tel"
                value={settings.restaurant_phone}
                onChange={(e) => setSettings({ ...settings, restaurant_phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                placeholder="+54 11 1234-5678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Dirección</label>
              <input
                type="text"
                value={settings.restaurant_address}
                onChange={(e) => setSettings({ ...settings, restaurant_address: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                placeholder="Av. del Campo 1234, Buenos Aires"
              />
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={isSaving} className="btn-charret-gold w-full justify-center py-3">
          <Save className="w-5 h-5 mr-2" />
          {isSaving ? 'Guardando...' : 'Guardar Configuración'}
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;