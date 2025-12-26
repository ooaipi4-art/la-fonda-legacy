import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Star } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

interface Category {
  id: string;
  name: string;
  sort_order: number;
}

interface MenuItem {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_special: boolean;
  sort_order: number;
}

const emptyItem: Omit<MenuItem, 'id'> = {
  category_id: null,
  name: '',
  description: '',
  price: 0,
  image_url: '',
  is_available: true,
  is_special: false,
  sort_order: 0,
};

const AdminMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>(emptyItem);
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [categoriesRes, itemsRes] = await Promise.all([
      supabase.from('categories').select('*').order('sort_order'),
      supabase.from('menu_items').select('*').order('sort_order'),
    ]);

    if (categoriesRes.data) {
      setCategories(categoriesRes.data);
      if (!activeCategory && categoriesRes.data.length > 0) {
        setActiveCategory(categoriesRes.data[0].id);
      }
    }
    if (itemsRes.data) {
      setMenuItems(itemsRes.data);
    }
    setIsLoading(false);
  };

  const openNewItemDialog = () => {
    setEditingItem(null);
    setFormData({ ...emptyItem, category_id: activeCategory });
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      category_id: item.category_id,
      name: item.name,
      description: item.description || '',
      price: item.price,
      image_url: item.image_url || '',
      is_available: item.is_available,
      is_special: item.is_special,
      sort_order: item.sort_order,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      toast({ title: 'Error', description: 'Nombre y precio son requeridos', variant: 'destructive' });
      return;
    }

    const payload = {
      ...formData,
      description: formData.description || null,
      image_url: formData.image_url || null,
    };

    if (editingItem) {
      const { error } = await supabase
        .from('menu_items')
        .update(payload)
        .eq('id', editingItem.id);

      if (error) {
        toast({ title: 'Error', description: 'No se pudo actualizar el plato', variant: 'destructive' });
      } else {
        toast({ title: 'Guardado', description: 'Plato actualizado correctamente' });
        fetchData();
      }
    } else {
      const { error } = await supabase.from('menu_items').insert(payload);

      if (error) {
        toast({ title: 'Error', description: 'No se pudo crear el plato', variant: 'destructive' });
      } else {
        toast({ title: 'Creado', description: 'Nuevo plato agregado al menú' });
        fetchData();
      }
    }

    setIsDialogOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este plato?')) return;

    const { error } = await supabase.from('menu_items').delete().eq('id', id);

    if (error) {
      toast({ title: 'Error', description: 'No se pudo eliminar el plato', variant: 'destructive' });
    } else {
      toast({ title: 'Eliminado', description: 'Plato eliminado del menú' });
      fetchData();
    }
  };

  const toggleAvailability = async (id: string, isAvailable: boolean) => {
    await supabase.from('menu_items').update({ is_available: !isAvailable }).eq('id', id);
    fetchData();
  };

  const filteredItems = activeCategory
    ? menuItems.filter((item) => item.category_id === activeCategory)
    : menuItems;

  return (
    <AdminLayout title="Gestión del Menú">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            )}
          >
            {category.name}
            <span className="ml-2 px-2 py-0.5 rounded-full bg-background/50 text-xs">
              {menuItems.filter((i) => i.category_id === category.id).length}
            </span>
          </button>
        ))}
      </div>

      {/* Add Button */}
      <button onClick={openNewItemDialog} className="btn-charret-gold mb-6">
        <Plus className="w-4 h-4 mr-2" />
        Agregar Plato
      </button>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "bg-card rounded-xl border border-border overflow-hidden transition-all",
              !item.is_available && "opacity-60"
            )}
          >
            {item.image_url && (
              <div className="aspect-[16/10] overflow-hidden">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold flex items-center gap-2">
                    {item.name}
                    {item.is_special && <Star className="w-4 h-4 text-accent fill-accent" />}
                  </h3>
                  <p className="text-accent font-bold">${Number(item.price).toLocaleString('es-AR')}</p>
                </div>
                <Switch
                  checked={item.is_available}
                  onCheckedChange={() => toggleAvailability(item.id, item.is_available)}
                />
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => openEditDialog(item)}
                  className="flex-1 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="py-2 px-3 bg-destructive/10 text-destructive rounded-lg hover:bg-destructive/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              {editingItem ? 'Editar Plato' : 'Nuevo Plato'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Nombre *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                placeholder="Nombre del plato"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Categoría</label>
              <select
                value={formData.category_id || ''}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value || null })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
              >
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Precio *</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                placeholder="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Descripción</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background resize-none"
                placeholder="Descripción del plato..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">URL de Imagen</label>
              <input
                type="url"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-input bg-background"
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <Switch
                  checked={formData.is_available}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                />
                <span className="text-sm">Disponible</span>
              </label>
              <label className="flex items-center gap-2">
                <Switch
                  checked={formData.is_special}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_special: checked })}
                />
                <span className="text-sm">Especial</span>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={() => setIsDialogOpen(false)} className="flex-1 btn-charret-outline">
                Cancelar
              </button>
              <button onClick={handleSave} className="flex-1 btn-charret-gold">
                <Save className="w-4 h-4 mr-2" />
                Guardar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminMenu;