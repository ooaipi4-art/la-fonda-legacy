import { useState, useEffect } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  category_id: string | null;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  sort_order: number;
}

export const MenuSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const [categoriesRes, itemsRes] = await Promise.all([
        supabase.from('categories').select('*').order('sort_order'),
        supabase.from('menu_items').select('*').eq('is_available', true).order('sort_order'),
      ]);

      if (categoriesRes.data) {
        setCategories(categoriesRes.data);
        if (categoriesRes.data.length > 0) {
          setActiveCategory(categoriesRes.data[0].id);
        }
      }
      if (itemsRes.data) {
        setMenuItems(itemsRes.data);
      }
    } catch (error) {
      console.error('Error fetching menu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image_url: item.image_url ?? undefined,
    });
    toast({
      title: '¡Agregado al carrito!',
      description: `${item.name} se agregó a tu pedido`,
    });
  };

  const filteredItems = activeCategory
    ? menuItems.filter((item) => item.category_id === activeCategory)
    : menuItems;

  if (isLoading) {
    return (
      <section id="menu" className="section-padding bg-secondary">
        <div className="container-custom flex justify-center items-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      </section>
    );
  }

  return (
    <section id="menu" className="section-padding bg-secondary">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm">
            Nuestra Carta
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            El Menú
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubrí nuestros platos preparados con la mejor selección de ingredientes y el sabor único del fuego a leña.
          </p>
        </div>

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  'px-5 py-2.5 rounded-full font-medium transition-all duration-200',
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-foreground hover:bg-primary/10'
                )}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Menu Items */}
        {filteredItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                {item.image_url && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <span className="text-accent font-bold text-lg whitespace-nowrap ml-2">
                      {item.price > 0 ? `$${item.price.toLocaleString('es-AR')}` : 'Consultar'}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-full btn-charret-gold justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Próximamente agregaremos nuestros deliciosos platos al menú digital.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};