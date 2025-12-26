import { useState, useEffect } from 'react';
import { ShoppingCart, DollarSign, TrendingUp, Clock, ArrowUp, ArrowDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { cn } from '@/lib/utils';

interface DashboardStats {
  todayOrders: number;
  todayRevenue: number;
  pendingOrders: number;
  weeklyOrders: number;
}

interface RecentOrder {
  id: string;
  order_number: number;
  status: string;
  total: number;
  created_at: string;
  customers: { name: string } | null;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    todayOrders: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    weeklyOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchDashboardData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchDashboardData = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);

      // Today's orders
      const { data: todayData } = await supabase
        .from('orders')
        .select('total')
        .gte('created_at', today.toISOString());

      // Pending orders
      const { data: pendingData } = await supabase
        .from('orders')
        .select('id')
        .in('status', ['pending', 'preparing']);

      // Weekly orders
      const { data: weeklyData } = await supabase
        .from('orders')
        .select('id')
        .gte('created_at', weekAgo.toISOString());

      // Recent orders
      const { data: recentData } = await supabase
        .from('orders')
        .select('id, order_number, status, total, created_at, customers(name)')
        .order('created_at', { ascending: false })
        .limit(5);

      setStats({
        todayOrders: todayData?.length || 0,
        todayRevenue: todayData?.reduce((sum, o) => sum + Number(o.total), 0) || 0,
        pendingOrders: pendingData?.length || 0,
        weeklyOrders: weeklyData?.length || 0,
      });

      setRecentOrders((recentData as RecentOrder[]) || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-gray-100 text-gray-800';
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

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pedidos Hoy</p>
              <p className="text-3xl font-bold mt-1">{stats.todayOrders}</p>
            </div>
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-accent" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Ventas Hoy</p>
              <p className="text-3xl font-bold mt-1">${stats.todayRevenue.toLocaleString('es-AR')}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pendientes</p>
              <p className="text-3xl font-bold mt-1">{stats.pendingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Esta Semana</p>
              <p className="text-3xl font-bold mt-1">{stats.weeklyOrders}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-card rounded-xl shadow-sm border border-border">
        <div className="p-6 border-b border-border">
          <h2 className="font-display text-xl font-bold">Pedidos Recientes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">#</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Cliente</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Estado</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Total</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">Hora</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium">#{order.order_number}</td>
                  <td className="px-6 py-4">{order.customers?.name || 'N/A'}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", getStatusColor(order.status))}>
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium">${Number(order.total).toLocaleString('es-AR')}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {new Date(order.created_at).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    No hay pedidos recientes
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;