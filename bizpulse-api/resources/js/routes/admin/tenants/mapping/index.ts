import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TenantMappingController::update
 * @see app/Http/Controllers/Admin/TenantMappingController.php:17
 * @route '/admin/tenants/{tenant}/mapping'
 */
export const update = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/admin/tenants/{tenant}/mapping',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Admin\TenantMappingController::update
 * @see app/Http/Controllers/Admin/TenantMappingController.php:17
 * @route '/admin/tenants/{tenant}/mapping'
 */
update.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tenant: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tenant: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tenant: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tenant: typeof args.tenant === 'object'
                ? args.tenant.id
                : args.tenant,
                }

    return update.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantMappingController::update
 * @see app/Http/Controllers/Admin/TenantMappingController.php:17
 * @route '/admin/tenants/{tenant}/mapping'
 */
update.put = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Admin\TenantMappingController::update
 * @see app/Http/Controllers/Admin/TenantMappingController.php:17
 * @route '/admin/tenants/{tenant}/mapping'
 */
    const updateForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantMappingController::update
 * @see app/Http/Controllers/Admin/TenantMappingController.php:17
 * @route '/admin/tenants/{tenant}/mapping'
 */
        updateForm.put = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const mapping = {
    update: Object.assign(update, update),
}

export default mapping