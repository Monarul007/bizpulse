import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\AlertController::index
 * @see app/Http/Controllers/Api/AlertController.php:18
 * @route '/api/alerts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/api/alerts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\AlertController::index
 * @see app/Http/Controllers/Api/AlertController.php:18
 * @route '/api/alerts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AlertController::index
 * @see app/Http/Controllers/Api/AlertController.php:18
 * @route '/api/alerts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\AlertController::index
 * @see app/Http/Controllers/Api/AlertController.php:18
 * @route '/api/alerts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\AlertController::index
 * @see app/Http/Controllers/Api/AlertController.php:18
 * @route '/api/alerts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\AlertController::index
 * @see app/Http/Controllers/Api/AlertController.php:18
 * @route '/api/alerts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\AlertController::index
 * @see app/Http/Controllers/Api/AlertController.php:18
 * @route '/api/alerts'
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
* @see \App\Http\Controllers\Api\AlertController::dismiss
 * @see app/Http/Controllers/Api/AlertController.php:36
 * @route '/api/alerts/{id}/dismiss'
 */
export const dismiss = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dismiss.url(args, options),
    method: 'post',
})

dismiss.definition = {
    methods: ["post"],
    url: '/api/alerts/{id}/dismiss',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Api\AlertController::dismiss
 * @see app/Http/Controllers/Api/AlertController.php:36
 * @route '/api/alerts/{id}/dismiss'
 */
dismiss.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return dismiss.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\AlertController::dismiss
 * @see app/Http/Controllers/Api/AlertController.php:36
 * @route '/api/alerts/{id}/dismiss'
 */
dismiss.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: dismiss.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Api\AlertController::dismiss
 * @see app/Http/Controllers/Api/AlertController.php:36
 * @route '/api/alerts/{id}/dismiss'
 */
    const dismissForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: dismiss.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Api\AlertController::dismiss
 * @see app/Http/Controllers/Api/AlertController.php:36
 * @route '/api/alerts/{id}/dismiss'
 */
        dismissForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: dismiss.url(args, options),
            method: 'post',
        })
    
    dismiss.form = dismissForm
const alerts = {
    index: Object.assign(index, index),
dismiss: Object.assign(dismiss, dismiss),
}

export default alerts