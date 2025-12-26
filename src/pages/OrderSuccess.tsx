import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { Header } from '@/components/layout/Header';

const OrderSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('order');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container-custom pt-32 pb-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">¡Pedido Confirmado!</h1>
          <p className="text-muted-foreground text-lg mb-2">
            Tu pedido fue registrado exitosamente
          </p>
          {orderNumber && (
            <p className="text-2xl font-bold text-accent mb-8">
              Pedido #{orderNumber}
            </p>
          )}
          <p className="text-muted-foreground mb-8">
            Te contactaremos por teléfono para confirmar los detalles de tu pedido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-charret-gold">
              <Home className="w-4 h-4 mr-2" />
              Volver al Inicio
            </Link>
            <Link to="/#menu" className="btn-charret-outline">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Ver Menú
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;