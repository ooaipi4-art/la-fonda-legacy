import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const CartPanel = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-charret-black/50 z-40" onClick={() => setIsOpen(false)} />
      <div className={cn(
        "fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl flex flex-col",
        "animate-slide-in-right"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-accent" />
            <h2 className="font-display text-xl font-bold">Tu Pedido ({totalItems})</h2>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Tu carrito está vacío</p>
              <button onClick={() => setIsOpen(false)} className="btn-charret mt-4">
                Ver Menú
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 bg-muted/50 rounded-lg p-3">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-accent font-bold">${item.price.toLocaleString('es-AR')}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-background border flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-medium w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-background border flex items-center justify-center hover:bg-accent hover:text-accent-foreground">
                        <Plus className="w-3 h-3" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="ml-auto text-destructive hover:text-destructive/80">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Subtotal:</span>
              <span className="text-accent">${totalPrice.toLocaleString('es-AR')}</span>
            </div>
            <Link to="/checkout" onClick={() => setIsOpen(false)} className="btn-charret-gold w-full justify-center text-lg py-4">
              Continuar Pedido
            </Link>
          </div>
        )}
      </div>
    </>
  );
};