import { useState, useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
}

export const SpecialsSection = () => {
  const [specials, setSpecials] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addItem } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    fetchSpecials();
  }, []);

  const fetchSpecials = async () => {
    try {
      const { data } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_special', true)
        .eq('is_available', true)
        .limit(3);

      if (data) setSpecials(data);
    } catch (error) {
      console.error('Error fetching specials:', error);
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

  if (isLoading || specials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-pattern-leather opacity-30" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/50 bg-accent/10 mb-4">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Destacados de la Casa</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Nuestros Especiales
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Los platos que nos han hecho famosos. Preparados con la receta original de la familia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {specials.map((item) => (
            <div
              key={item.id}
              className="bg-charret-brown-light/50 backdrop-blur-sm rounded-xl overflow-hidden border border-accent/20 hover:border-accent/50 transition-all duration-300 group"
            >
              {item.image_url && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-accent fill-accent" />
                  <span className="text-accent text-sm font-semibold">Especial</span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">{item.name}</h3>
                {item.description && (
                  <p className="text-primary-foreground/70 mb-4">{item.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold text-2xl">
                    ${item.price.toLocaleString('es-AR')}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn-charret-gold"
                  >
                    Pedir
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};