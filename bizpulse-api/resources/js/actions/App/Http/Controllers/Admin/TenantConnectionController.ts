import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::test
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
export const test = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

test.definition = {
    methods: ["post"],
    url: '/admin/tenants/{tenant}/test-connection',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::test
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
test.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return test.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::test
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
test.post = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: test.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TenantConnectionController::test
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
    const testForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: test.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantConnectionController::test
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
        testForm.post = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: test.url(args, options),
            method: 'post',
        })
    
    test.form = testForm
/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::autoMap
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:23
 * @route '/admin/tenants/{tenant}/auto-map'
 */
export const autoMap = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: autoMap.url(args, options),
    method: 'post',
})

autoMap.definition = {
    methods: ["post"],
    url: '/admin/tenants/{tenant}/auto-map',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::autoMap
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:23
 * @route '/admin/tenants/{tenant}/auto-map'
 */
autoMap.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return autoMap.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::autoMap
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:23
 * @route '/admin/tenants/{tenant}/auto-map'
 */
autoMap.post = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: autoMap.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TenantConnectionController::autoMap
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:23
 * @route '/admin/tenants/{tenant}/auto-map'
 */
    const autoMapForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: autoMap.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantConnectionController::autoMap
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:23
 * @route '/admin/tenants/{tenant}/auto-map'
 */
        autoMapForm.post = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: autoMap.url(args, options),
            method: 'post',
        })
    
    autoMap.form = autoMapForm
const TenantConnectionController = { test, autoMap }

export default TenantConnectionController