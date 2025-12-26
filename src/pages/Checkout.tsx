import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, MapPin, CreditCard, Banknote, Home, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Header } from '@/components/layout/Header';
import { CartPanel } from '@/components/cart/CartPanel';
import { cn } from '@/lib/utils';

type OrderModality = 'dine_in' | 'pickup' | 'delivery';
type PaymentMethod = 'mercado_pago' | 'cash';

interface CustomerData {
  name: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}

const steps = [
  { id: 1, name: 'Carrito', icon: ShoppingBag },
  { id: 2, name: 'Modalidad', icon: Home },
  { id: 3, name: 'Datos', icon: MapPin },
  { id: 4, name: 'Pago', icon: CreditCard },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [modality, setModality] = useState<OrderModality | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [customerData, setCustomerData] = useState<CustomerData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = modality === 'delivery' ? 500 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return items.length > 0;
      case 2: return modality !== null;
      case 3: return customerData.name && customerData.phone && (modality !== 'delivery' || customerData.address);
      case 4: return paymentMethod !== null;
      default: return false;
    }
  };

  const handleSubmitOrder = async () => {
    if (!modality || !paymentMethod) return;
    setIsSubmitting(true);

    try {
      // Create customer
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: customerData.name,
          phone: customerData.phone,
          email: customerData.email || null,
          address: modality === 'delivery' ? customerData.address : null,
          notes: customerData.notes || null,
        })
        .select()
        .single();

      if (customerError) throw customerError;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          customer_id: customer.id,
          modality,
          payment_method: paymentMethod,
          subtotal: totalPrice,
          delivery_fee: deliveryFee,
          total: finalTotal,
          delivery_address: modality === 'delivery' ? customerData.address : null,
          notes: customerData.notes || null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        menu_item_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
      }));

      const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
      if (itemsError) throw itemsError;

      clearCart();
      toast({
        title: '¡Pedido confirmado!',
        description: `Tu pedido #${order.order_number} fue registrado exitosamente.`,
      });
      navigate(`/order-success?order=${order.order_number}`);
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: 'Error',
        description: 'Hubo un problema al procesar tu pedido. Intentá nuevamente.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && currentStep === 1) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <CartPanel />
        <div className="container-custom pt-32 pb-16 text-center">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground/30 mb-6" />
          <h1 className="font-display text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-muted-foreground mb-8">Agregá productos del menú para continuar</p>
          <button onClick={() => navigate('/#menu')} className="btn-charret-gold">
            Ver Menú
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartPanel />
      <div className="container-custom pt-28 pb-16">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                currentStep >= step.id
                  ? "bg-accent border-accent text-accent-foreground"
                  : "border-border text-muted-foreground"
              )}>
                {currentStep > step.id ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className={cn(
                "ml-2 font-medium hidden sm:inline",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-8 sm:w-16 h-0.5 mx-2 sm:mx-4",
                  currentStep > step.id ? "bg-accent" : "bg-border"
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-xl p-6 shadow-lg">
              {/* Step 1: Cart Review */}
              {currentStep === 1 && (
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6">Revisá tu pedido</h2>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                        {item.image_url && (
                          <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-muted-foreground">Cantidad: {item.quantity}</p>
                        </div>
                        <span className="font-bold text-accent">
                          ${(item.price * item.quantity).toLocaleString('es-AR')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Modality */}
              {currentStep === 2 && (
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6">¿Cómo querés recibir tu pedido?</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { value: 'dine_in' as const, label: 'Consumir en el local', icon: Home, desc: 'Disfrutá en nuestro salón' },
                      { value: 'pickup' as const, label: 'Retiro en local', icon: ShoppingBag, desc: 'Pasás a buscar tu pedido' },
                      { value: 'delivery' as const, label: 'Delivery', icon: Truck, desc: 'Lo llevamos a tu casa (+$500)' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setModality(option.value)}
                        className={cn(
                          "p-6 rounded-xl border-2 text-left transition-all",
                          modality === option.value
                            ? "border-accent bg-accent/10"
                            : "border-border hover:border-accent/50"
                        )}
                      >
                        <option.icon className={cn("w-8 h-8 mb-3", modality === option.value ? "text-accent" : "text-muted-foreground")} />
                        <h3 className="font-semibold mb-1">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Customer Data */}
              {currentStep === 3 && (
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6">Tus datos</h2>
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Nombre *</label>
                        <input
                          type="text"
                          name="name"
                          value={customerData.name}
                          onChange={handleCustomerChange}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Teléfono *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={customerData.phone}
                          onChange={handleCustomerChange}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent"
                          placeholder="+54 11..."
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={customerData.email}
                        onChange={handleCustomerChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent"
                        placeholder="tu@email.com"
                      />
                    </div>
                    {modality === 'delivery' && (
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Dirección de entrega *</label>
                        <input
                          type="text"
                          name="address"
                          value={customerData.address}
                          onChange={handleCustomerChange}
                          className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent"
                          placeholder="Calle, número, piso, depto..."
                          required
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Notas adicionales</label>
                      <textarea
                        name="notes"
                        value={customerData.notes}
                        onChange={handleCustomerChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-accent resize-none"
                        placeholder="Indicaciones especiales, alergias, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div>
                  <h2 className="font-display text-2xl font-bold mb-6">Método de pago</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setPaymentMethod('mercado_pago')}
                      className={cn(
                        "p-6 rounded-xl border-2 text-left transition-all",
                        paymentMethod === 'mercado_pago'
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      <CreditCard className={cn("w-8 h-8 mb-3", paymentMethod === 'mercado_pago' ? "text-accent" : "text-muted-foreground")} />
                      <h3 className="font-semibold mb-1">Mercado Pago</h3>
                      <p className="text-sm text-muted-foreground">Tarjeta, QR o transferencia</p>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={cn(
                        "p-6 rounded-xl border-2 text-left transition-all",
                        paymentMethod === 'cash'
                          ? "border-accent bg-accent/10"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      <Banknote className={cn("w-8 h-8 mb-3", paymentMethod === 'cash' ? "text-accent" : "text-muted-foreground")} />
                      <h3 className="font-semibold mb-1">Efectivo</h3>
                      <p className="text-sm text-muted-foreground">Pagás al recibir</p>
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={() => currentStep === 1 ? navigate('/') : setCurrentStep(currentStep - 1)}
                  className="btn-charret-outline"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {currentStep === 1 ? 'Volver al menú' : 'Anterior'}
                </button>
                {currentStep < 4 ? (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={!canProceed()}
                    className="btn-charret-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Siguiente
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitOrder}
                    disabled={!canProceed() || isSubmitting}
                    className="btn-charret-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
                    <Check className="w-4 h-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-lg sticky top-28">
              <h3 className="font-display text-xl font-bold mb-4">Resumen</h3>
              <div className="space-y-3 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-muted-foreground">{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toLocaleString('es-AR')}</span>
                </div>
                {modality === 'delivery' && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span>${deliveryFee.toLocaleString('es-AR')}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="text-accent">${finalTotal.toLocaleString('es-AR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;