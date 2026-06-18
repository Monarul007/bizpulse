import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import admin from '@/routes/admin';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/admin/dashboard' },
    { title: 'Tenants', href: '/admin/tenants' },
    { title: 'Create', href: '/admin/tenants/create' },
];

export default function CreateTenant() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        mysql_host: '',
        mysql_port: '3306',
        mysql_database: '',
        mysql_username: '',
        mysql_password: '',
        is_active: true,
        rate_limit_per_minute: 60,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(admin.tenants.store().url);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Tenant" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 max-w-2xl">
                <h2 className="text-xl font-semibold">Create New Tenant</h2>
                <form onSubmit={submit} className="space-y-6">
                    <div className="rounded-xl border border-sidebar-border/70 p-6 space-y-4">
                        <h3 className="font-medium">General</h3>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Business Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="slug">Slug (URL identifier)</Label>
                            <Input id="slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} required placeholder="e.g. emartway" />
                            <InputError message={errors.slug} />
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 p-6 space-y-4">
                        <h3 className="font-medium">MySQL Connection</h3>
                        <div className="grid gap-2">
                            <Label htmlFor="mysql_host">Host</Label>
                            <Input id="mysql_host" value={data.mysql_host} onChange={(e) => setData('mysql_host', e.target.value)} required placeholder="e.g. 192.168.1.1 or db.example.com" />
                            <InputError message={errors.mysql_host} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="mysql_port">Port</Label>
                                <Input id="mysql_port" type="number" value={data.mysql_port} onChange={(e) => setData('mysql_port', e.target.value)} required />
                                <InputError message={errors.mysql_port} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="mysql_database">Database Name</Label>
                                <Input id="mysql_database" value={data.mysql_database} onChange={(e) => setData('mysql_database', e.target.value)} required />
                                <InputError message={errors.mysql_database} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mysql_username">Username (read-only)</Label>
                            <Input id="mysql_username" value={data.mysql_username} onChange={(e) => setData('mysql_username', e.target.value)} required />
                            <InputError message={errors.mysql_username} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mysql_password">Password</Label>
                            <Input id="mysql_password" type="password" value={data.mysql_password} onChange={(e) => setData('mysql_password', e.target.value)} />
                            <InputError message={errors.mysql_password} />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>Create Tenant</Button>
                        <Link href={admin.tenants.index()}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
