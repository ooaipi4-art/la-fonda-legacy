import { useState, useEffect } from 'react';
import { Clock, RefreshCw, Eye, CheckCircle, Truck, XCircle } from 'lucide-react';
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

interface Order {
  id: string;
  order_number: number;
  status: OrderStatus;
  modality: string;
  payment_method: string;
  payment_status: string;
  total: number;
  delivery_address: string | null;
  notes: string | null;
  created_at: string;
  customers: { name: string; phone: string; email: string | null } | null;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  subtotal: number;
}

type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
const statusFlow: OrderStatus[] = ['pending', 'preparing', 'ready', 'delivered'];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('orders-admin')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*, customers(name, phone, email)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setIsLoading(false);
  };

  const fetchOrderItems = async (orderId: string) => {
    const { data } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);
    
    setOrderItems((data as OrderItem[]) || []);
  };

  const updateOrderStatus = async (orderId: string, newStatus: OrderStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({ title: 'Error', description: 'No se pudo actualizar el estado', variant: 'destructive' });
    } else {
      toast({ title: 'Estado actualizado', description: `Pedido marcado como ${getStatusLabel(newStatus)}` });
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    }
  };

  const openOrderDetails = async (order: Order) => {
    setSelectedOrder(order);
    await fetchOrderItems(order.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'preparing': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'ready': return 'bg-green-100 text-green-800 border-green-300';
      case 'delivered': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'preparing': return 'Preparando';
      case 'ready': return 'Listo';
      case 'delivered': return 'Entregado';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getModalityLabel = (modality: string) => {
    switch (modality) {
      case 'dine_in': return 'Local';
      case 'pickup': return 'Retiro';
      case 'delivery': return 'Delivery';
      default: return modality;
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  return (
    <AdminLayout title="Gestión de Pedidos">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'pending', 'preparing', 'ready', 'delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-4 py-2 rounded-lg font-medium transition-colors",
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border hover:bg-muted"
            )}
          >
            {status === 'all' ? 'Todos' : getStatusLabel(status)}
            {status !== 'all' && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-background/50 text-xs">
                {orders.filter(o => o.status === status).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <div
            key={order.id}
            className={cn(
              "bg-card rounded-xl border-2 p-4 transition-all hover:shadow-lg cursor-pointer",
              getStatusColor(order.status)
            )}
            onClick={() => openOrderDetails(order)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="font-bold text-lg">#{order.order_number}</span>
                <span className={cn("ml-2 px-2 py-0.5 rounded-full text-xs font-medium", getStatusColor(order.status))}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
              <span className="text-sm opacity-70">
                {new Date(order.created_at).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <p className="font-medium">{order.customers?.name}</p>
            <p className="text-sm opacity-70">{order.customers?.phone}</p>
            
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-current/20">
              <span className="text-sm font-medium">{getModalityLabel(order.modality)}</span>
              <span className="font-bold">${Number(order.total).toLocaleString('es-AR')}</span>
            </div>

            {order.status !== 'delivered' && order.status !== 'cancelled' && (
              <div className="flex gap-2 mt-3">
                {statusFlow.indexOf(order.status) < statusFlow.length - 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextStatus = statusFlow[statusFlow.indexOf(order.status) + 1] as 'pending' | 'preparing' | 'ready' | 'delivered';
                      updateOrderStatus(order.id, nextStatus);
                    }}
                    className="flex-1 py-2 bg-white/50 rounded-lg font-medium hover:bg-white/80 transition-colors flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    {getStatusLabel(statusFlow[statusFlow.indexOf(order.status) + 1])}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No hay pedidos {filter !== 'all' && `con estado "${getStatusLabel(filter)}"`}
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Pedido #{selectedOrder?.order_number}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className={cn("px-3 py-1 rounded-full text-sm font-medium", getStatusColor(selectedOrder.status))}>
                  {getStatusLabel(selectedOrder.status)}
                </span>
                <span className="text-muted-foreground">•</span>
                <span>{getModalityLabel(selectedOrder.modality)}</span>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Cliente</h4>
                <p>{selectedOrder.customers?.name}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.customers?.phone}</p>
                {selectedOrder.customers?.email && (
                  <p className="text-sm text-muted-foreground">{selectedOrder.customers.email}</p>
                )}
                {selectedOrder.delivery_address && (
                  <p className="text-sm mt-2"><strong>Dirección:</strong> {selectedOrder.delivery_address}</p>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-2">Items</h4>
                <div className="space-y-2">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span>${Number(item.subtotal).toLocaleString('es-AR')}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border mt-3 pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-accent">${Number(selectedOrder.total).toLocaleString('es-AR')}</span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div className="bg-yellow-50 rounded-lg p-3 text-sm">
                  <strong>Notas:</strong> {selectedOrder.notes}
                </div>
              )}

              {selectedOrder.status !== 'delivered' && selectedOrder.status !== 'cancelled' && (
                <div className="flex gap-2 pt-4">
                  {statusFlow.indexOf(selectedOrder.status) < statusFlow.length - 1 && (
                    <button
                      onClick={() => {
                        const nextStatus = statusFlow[statusFlow.indexOf(selectedOrder.status) + 1];
                        updateOrderStatus(selectedOrder.id, nextStatus);
                      }}
                      className="flex-1 btn-charret-gold justify-center"
                    >
                      Marcar como {getStatusLabel(statusFlow[statusFlow.indexOf(selectedOrder.status) + 1])}
                    </button>
                  )}
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                    className="px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;