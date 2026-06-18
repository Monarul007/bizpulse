import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import admin from '@/routes/admin';

interface Tenant {
    id: number;
    name: string;
    slug: string;
    mysql_host: string | null;
    mysql_database: string | null;
    is_active: boolean;
    sync_config: any;
    created_at: string;
}

interface TenantsPageProps extends PageProps {
    tenants: {
        data: Tenant[];
        meta: any;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/admin/dashboard' },
    { title: 'Tenants', href: '/admin/tenants' },
];

export default function TenantIndex() {
    const { tenants } = usePage<TenantsPageProps>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenants" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Tenants</h2>
                    <Link href={admin.tenants.create()}>
                        <Button>Add Tenant</Button>
                    </Link>
                </div>
                <div className="rounded-xl border border-sidebar-border/70 overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b bg-sidebar/50">
                                <th className="px-4 py-3 text-left font-medium">Name</th>
                                <th className="px-4 py-3 text-left font-medium">Database</th>
                                <th className="px-4 py-3 text-left font-medium">Status</th>
                                <th className="px-4 py-3 text-left font-medium">Mapping</th>
                                <th className="px-4 py-3 text-right font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tenants.data.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                        No tenants yet. Click "Add Tenant" to create one.
                                    </td>
                                </tr>
                            )}
                            {tenants.data.map((tenant) => (
                                <tr key={tenant.id} className="border-b last:border-0">
                                    <td className="px-4 py-3">
                                        <div className="font-medium">{tenant.name}</div>
                                        <div className="text-xs text-muted-foreground">{tenant.slug}</div>
                                    </td>
                                    <td className="px-4 py-3 text-xs">
                                        {tenant.mysql_host && tenant.mysql_database
                                            ? `${tenant.mysql_host}/${tenant.mysql_database}`
                                            : 'Not configured'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                            tenant.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                            {tenant.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-xs">
                                        {tenant.sync_config ? (
                                            <span className="text-green-600">Configured</span>
                                        ) : (
                                            <span className="text-amber-600">Not set</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <Link href={admin.tenants.edit(tenant.id)}>
                                            <Button variant="outline" size="sm">Edit</Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
