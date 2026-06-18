import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEventHandler, useState } from 'react';
import InputError from '@/components/input-error';
import admin from '@/routes/admin';

interface Tenant {
    id: number;
    name: string;
    slug: string;
    mysql_host: string | null;
    mysql_port: string;
    mysql_database: string | null;
    mysql_username: string | null;
    mysql_password: string | null;
    is_active: boolean;
    sync_config: any;
    rate_limit_per_minute: number;
    created_at: string;
}

interface EditPageProps extends PageProps {
    tenant: Tenant;
    canonicalSchema: Record<string, any>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Admin', href: '/admin/admin/dashboard' },
    { title: 'Tenants', href: '/admin/tenants' },
    { title: 'Edit', href: '/admin/tenants/{id}/edit' },
];

export default function EditTenant() {
    const { tenant, canonicalSchema } = usePage<EditPageProps>().props;

    const { data, setData, put, processing, errors } = useForm({
        name: tenant.name,
        slug: tenant.slug,
        mysql_host: tenant.mysql_host || '',
        mysql_port: tenant.mysql_port,
        mysql_database: tenant.mysql_database || '',
        mysql_username: tenant.mysql_username || '',
        mysql_password: '',
        is_active: tenant.is_active,
        rate_limit_per_minute: tenant.rate_limit_per_minute,
    });

    const existingMapping = tenant.sync_config?.tables || {};
    const [mapping, setMapping] = useState<Record<string, { real_name: string; columns: Record<string, string> }>>(existingMapping);
    const [testResult, setTestResult] = useState<string | null>(null);
    const [testing, setTesting] = useState(false);
    const [autoMapping, setAutoMapping] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/tenants/${tenant.id}`);
    };

    const testConnection = async () => {
        setTesting(true);
        setTestResult(null);
        try {
            const res = await fetch(admin.tenants.testConnection(tenant.id).url, { method: 'POST' });
            const json = await res.json();
            setTestResult(json.success ? `Connected! ${json.tables_count} tables found.` : json.message);
        } catch (err: any) {
            setTestResult('Connection error: ' + err.message);
        } finally {
            setTesting(false);
        }
    };

    const runAutoMap = async () => {
        setAutoMapping(true);
        try {
            const res = await fetch(admin.tenants.autoMap(tenant.id).url, { method: 'POST' });
            const json = await res.json();
            if (json.tables) {
                setMapping((prev) => ({ ...prev, ...json.tables }));
            }
        } catch (err: any) {
            console.error('Auto-map failed:', err);
        } finally {
            setAutoMapping(false);
        }
    };

    const saveMapping = async () => {
        await fetch(admin.tenants.mapping.update(tenant.id).url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': (window as any).csrfToken },
            body: JSON.stringify({ sync_config: { tables: mapping } }),
        });
        router.reload();
    };

    const updateMappingTable = (table: string, realName: string) => {
        setMapping((prev) => ({
            ...prev,
            [table]: { ...prev[table], real_name: realName, columns: prev[table]?.columns || {} },
        }));
    };

    const updateMappingColumn = (table: string, canonical: string, clientCol: string) => {
        setMapping((prev) => ({
            ...prev,
            [table]: { ...prev[table], columns: { ...prev[table]?.columns, [canonical]: clientCol } },
        }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${tenant.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 p-4 max-w-3xl">
                <h2 className="text-xl font-semibold">Edit Tenant: {tenant.name}</h2>

                <form onSubmit={submit} className="space-y-6">
                    <div className="rounded-xl border border-sidebar-border/70 p-6 space-y-4">
                        <h3 className="font-medium">General</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Business Name</Label>
                                <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                <InputError message={errors.name} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input id="slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} required />
                                <InputError message={errors.slug} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-sidebar-border/70 p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-medium">MySQL Connection</h3>
                            <div className="flex gap-2">
                                <Button type="button" variant="outline" size="sm" onClick={testConnection} disabled={testing}>
                                    {testing ? 'Testing...' : 'Test Connection'}
                                </Button>
                            </div>
                        </div>
                        {testResult && (
                            <div className={`px-3 py-2 rounded text-sm ${testResult.startsWith('Connected') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                {testResult}
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="mysql_host">Host</Label>
                                <Input id="mysql_host" value={data.mysql_host} onChange={(e) => setData('mysql_host', e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="mysql_port">Port</Label>
                                <Input id="mysql_port" type="number" value={data.mysql_port} onChange={(e) => setData('mysql_port', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="mysql_database">Database</Label>
                                <Input id="mysql_database" value={data.mysql_database} onChange={(e) => setData('mysql_database', e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="mysql_username">Username</Label>
                                <Input id="mysql_username" value={data.mysql_username} onChange={(e) => setData('mysql_username', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mysql_password">Password (leave blank to keep current)</Label>
                            <Input id="mysql_password" type="password" value={data.mysql_password} onChange={(e) => setData('mysql_password', e.target.value)} />
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <Button type="submit" disabled={processing}>Save Changes</Button>
                        <Link href={admin.tenants.index()}>
                            <Button type="button" variant="outline">Cancel</Button>
                        </Link>
                    </div>
                </form>

                <div className="rounded-xl border border-sidebar-border/70 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-medium">Column Mapping</h3>
                        <Button type="button" variant="outline" size="sm" onClick={runAutoMap} disabled={autoMapping}>
                            {autoMapping ? 'AI Mapping...' : 'AI Auto-Map'}
                        </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Map your client database tables/columns to BizPulse canonical fields.
                        Use "AI Auto-Map" to suggest mappings automatically.
                    </p>

                    {Object.entries(canonicalSchema).map(([tableName, def]: [string, any]) => (
                        <div key={tableName} className="rounded-lg border p-4 space-y-3">
                            <h4 className="font-medium text-sm">
                                {def.label}
                                {def.required && <span className="text-red-500 ml-1">*</span>}
                            </h4>
                            <div className="grid gap-2">
                                <Label className="text-xs">Client table name</Label>
                                <Input
                                    value={mapping[tableName]?.real_name || ''}
                                    onChange={(e) => updateMappingTable(tableName, e.target.value)}
                                    placeholder={tableName}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Column mappings</Label>
                                {Object.entries(def.columns).map(([colName, colDef]: [string, any]) => (
                                    <div key={colName} className="flex items-center gap-2 text-sm">
                                        <span className="w-40 text-muted-foreground">{colDef.label}:</span>
                                        <Input
                                            value={mapping[tableName]?.columns?.[colName] || ''}
                                            onChange={(e) => updateMappingColumn(tableName, colName, e.target.value)}
                                            placeholder={colName}
                                            className="flex-1"
                                        />
                                        {colDef.required && <span className="text-red-400 text-xs">required</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <Button onClick={saveMapping} variant="default">Save Mapping</Button>
                </div>

                <div className="rounded-xl border border-red-200 p-6 space-y-4">
                    <h3 className="font-medium text-red-600">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground">Deleting a tenant removes all their data permanently.</p>
                    <form onSubmit={(e) => { e.preventDefault(); if (confirm('Delete this tenant permanently?')) router.delete(admin.tenants.destroy(tenant.id).url); }}>
                        <Button type="submit" variant="destructive">Delete Tenant</Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
