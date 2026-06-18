import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import admin from '@/routes/admin';

interface Stats {
  total_tenants: number;
  active_connections: number;
  configured_tenants: number;
  recently_synced: number;
  pending_alerts: number;
  inactive_tenants: number;
}

interface Activity {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  has_mapping: boolean;
  hourly_syncs: number;
  daily_records: number;
  alerts_count: number;
  updated_at: string;
}

interface Props {
  stats: Stats;
  recentActivity: Activity[];
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Admin Dashboard', href: '/admin/admin/dashboard' },
];

export default function AdminDashboard({ stats, recentActivity }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Admin Dashboard" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-sidebar-border/70 p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Tenants</h3>
            <p className="mt-2 text-3xl font-bold">{stats.total_tenants}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats.active_connections} active · {stats.inactive_tenants} inactive
            </p>
          </div>
          <div className="rounded-xl border border-sidebar-border/70 p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Active Connections</h3>
            <p className="mt-2 text-3xl font-bold">{stats.active_connections}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {stats.configured_tenants} with mappings · {stats.recently_synced} synced today
            </p>
          </div>
          <div className="rounded-xl border border-sidebar-border/70 p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Pending Alerts</h3>
            <p className={`mt-2 text-3xl font-bold ${stats.pending_alerts > 0 ? 'text-red-500' : ''}`}>{stats.pending_alerts}</p>
            <p className="mt-1 text-xs text-muted-foreground">Requires attention</p>
          </div>
        </div>

        <div className="rounded-xl border border-sidebar-border/70 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Recent Tenant Activity</h2>
            <Link href={admin.tenants.index()} className="text-sm text-blue-500 hover:underline">View All Tenants →</Link>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-muted-foreground">No tenant activity yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-sidebar-border/70">
                    <th className="text-left py-2 font-medium text-muted-foreground">Tenant</th>
                    <th className="text-left py-2 font-medium text-muted-foreground">Status</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Syncs</th>
                    <th className="text-center py-2 font-medium text-muted-foreground">Alerts</th>
                    <th className="text-right py-2 font-medium text-muted-foreground">Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((t) => (
                    <tr key={t.id} className="border-b border-sidebar-border/50">
                      <td className="py-3 font-medium">{t.name}</td>
                      <td className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                          t.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {t.is_active ? 'Active' : 'Inactive'}
                          {t.has_mapping && t.is_active && ' · Mapped'}
                        </span>
                      </td>
                      <td className="py-3 text-center">{t.hourly_syncs}</td>
                      <td className="py-3 text-center">
                        <span className={t.alerts_count > 0 ? 'text-red-500 font-medium' : ''}>
                          {t.alerts_count}
                        </span>
                      </td>
                      <td className="py-3 text-right text-muted-foreground">{t.updated_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
