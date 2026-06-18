import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
import mapping from './mapping'
/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:20
 * @route '/admin/tenants'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/tenants',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:20
 * @route '/admin/tenants'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:20
 * @route '/admin/tenants'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:20
 * @route '/admin/tenants'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:20
 * @route '/admin/tenants'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:20
 * @route '/admin/tenants'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TenantController::index
 * @see app/Http/Controllers/Admin/TenantController.php:20
 * @route '/admin/tenants'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Admin\TenantController::create
 * @see app/Http/Controllers/Admin/TenantController.php:29
 * @route '/admin/tenants/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/tenants/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::create
 * @see app/Http/Controllers/Admin/TenantController.php:29
 * @route '/admin/tenants/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::create
 * @see app/Http/Controllers/Admin/TenantController.php:29
 * @route '/admin/tenants/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TenantController::create
 * @see app/Http/Controllers/Admin/TenantController.php:29
 * @route '/admin/tenants/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::create
 * @see app/Http/Controllers/Admin/TenantController.php:29
 * @route '/admin/tenants/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::create
 * @see app/Http/Controllers/Admin/TenantController.php:29
 * @route '/admin/tenants/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TenantController::create
 * @see app/Http/Controllers/Admin/TenantController.php:29
 * @route '/admin/tenants/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:34
 * @route '/admin/tenants'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/tenants',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:34
 * @route '/admin/tenants'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:34
 * @route '/admin/tenants'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:34
 * @route '/admin/tenants'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::store
 * @see app/Http/Controllers/Admin/TenantController.php:34
 * @route '/admin/tenants'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\TenantController::edit
 * @see app/Http/Controllers/Admin/TenantController.php:42
 * @route '/admin/tenants/{tenant}/edit'
 */
export const edit = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/tenants/{tenant}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::edit
 * @see app/Http/Controllers/Admin/TenantController.php:42
 * @route '/admin/tenants/{tenant}/edit'
 */
edit.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::edit
 * @see app/Http/Controllers/Admin/TenantController.php:42
 * @route '/admin/tenants/{tenant}/edit'
 */
edit.get = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\TenantController::edit
 * @see app/Http/Controllers/Admin/TenantController.php:42
 * @route '/admin/tenants/{tenant}/edit'
 */
edit.head = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::edit
 * @see app/Http/Controllers/Admin/TenantController.php:42
 * @route '/admin/tenants/{tenant}/edit'
 */
    const editForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::edit
 * @see app/Http/Controllers/Admin/TenantController.php:42
 * @route '/admin/tenants/{tenant}/edit'
 */
        editForm.get = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\TenantController::edit
 * @see app/Http/Controllers/Admin/TenantController.php:42
 * @route '/admin/tenants/{tenant}/edit'
 */
        editForm.head = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:50
 * @route '/admin/tenants/{tenant}'
 */
export const update = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/tenants/{tenant}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:50
 * @route '/admin/tenants/{tenant}'
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
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:50
 * @route '/admin/tenants/{tenant}'
 */
update.put = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:50
 * @route '/admin/tenants/{tenant}'
 */
update.patch = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:50
 * @route '/admin/tenants/{tenant}'
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
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:50
 * @route '/admin/tenants/{tenant}'
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
            /**
* @see \App\Http\Controllers\Admin\TenantController::update
 * @see app/Http/Controllers/Admin/TenantController.php:50
 * @route '/admin/tenants/{tenant}'
 */
        updateForm.patch = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:58
 * @route '/admin/tenants/{tenant}'
 */
export const destroy = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/tenants/{tenant}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:58
 * @route '/admin/tenants/{tenant}'
 */
destroy.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:58
 * @route '/admin/tenants/{tenant}'
 */
destroy.delete = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:58
 * @route '/admin/tenants/{tenant}'
 */
    const destroyForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantController::destroy
 * @see app/Http/Controllers/Admin/TenantController.php:58
 * @route '/admin/tenants/{tenant}'
 */
        destroyForm.delete = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::testConnection
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
export const testConnection = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testConnection.url(args, options),
    method: 'post',
})

testConnection.definition = {
    methods: ["post"],
    url: '/admin/tenants/{tenant}/test-connection',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::testConnection
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
testConnection.url = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return testConnection.definition.url
            .replace('{tenant}', parsedArgs.tenant.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\TenantConnectionController::testConnection
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
testConnection.post = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: testConnection.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\TenantConnectionController::testConnection
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
    const testConnectionForm = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: testConnection.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\TenantConnectionController::testConnection
 * @see app/Http/Controllers/Admin/TenantConnectionController.php:16
 * @route '/admin/tenants/{tenant}/test-connection'
 */
        testConnectionForm.post = (args: { tenant: number | { id: number } } | [tenant: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: testConnection.url(args, options),
            method: 'post',
        })
    
    testConnection.form = testConnectionForm
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
const tenants = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
testConnection: Object.assign(testConnection, testConnection),
autoMap: Object.assign(autoMap, autoMap),
mapping: Object.assign(mapping, mapping),
}

export default tenants