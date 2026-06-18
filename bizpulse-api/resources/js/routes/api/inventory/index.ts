import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\InventoryController::deadStock
 * @see app/Http/Controllers/Api/InventoryController.php:16
 * @route '/api/inventory/dead-stock'
 */
export const deadStock = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: deadStock.url(options),
    method: 'get',
})

deadStock.definition = {
    methods: ["get","head"],
    url: '/api/inventory/dead-stock',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\InventoryController::deadStock
 * @see app/Http/Controllers/Api/InventoryController.php:16
 * @route '/api/inventory/dead-stock'
 */
deadStock.url = (options?: RouteQueryOptions) => {
    return deadStock.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\InventoryController::deadStock
 * @see app/Http/Controllers/Api/InventoryController.php:16
 * @route '/api/inventory/dead-stock'
 */
deadStock.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: deadStock.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\InventoryController::deadStock
 * @see app/Http/Controllers/Api/InventoryController.php:16
 * @route '/api/inventory/dead-stock'
 */
deadStock.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: deadStock.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\InventoryController::deadStock
 * @see app/Http/Controllers/Api/InventoryController.php:16
 * @route '/api/inventory/dead-stock'
 */
    const deadStockForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: deadStock.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\InventoryController::deadStock
 * @see app/Http/Controllers/Api/InventoryController.php:16
 * @route '/api/inventory/dead-stock'
 */
        deadStockForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: deadStock.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\InventoryController::deadStock
 * @see app/Http/Controllers/Api/InventoryController.php:16
 * @route '/api/inventory/dead-stock'
 */
        deadStockForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: deadStock.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    deadStock.form = deadStockForm
/**
* @see \App\Http\Controllers\Api\InventoryController::reorderSuggestions
 * @see app/Http/Controllers/Api/InventoryController.php:25
 * @route '/api/inventory/reorder-suggestions'
 */
export const reorderSuggestions = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reorderSuggestions.url(options),
    method: 'get',
})

reorderSuggestions.definition = {
    methods: ["get","head"],
    url: '/api/inventory/reorder-suggestions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\InventoryController::reorderSuggestions
 * @see app/Http/Controllers/Api/InventoryController.php:25
 * @route '/api/inventory/reorder-suggestions'
 */
reorderSuggestions.url = (options?: RouteQueryOptions) => {
    return reorderSuggestions.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\InventoryController::reorderSuggestions
 * @see app/Http/Controllers/Api/InventoryController.php:25
 * @route '/api/inventory/reorder-suggestions'
 */
reorderSuggestions.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: reorderSuggestions.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\InventoryController::reorderSuggestions
 * @see app/Http/Controllers/Api/InventoryController.php:25
 * @route '/api/inventory/reorder-suggestions'
 */
reorderSuggestions.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: reorderSuggestions.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\InventoryController::reorderSuggestions
 * @see app/Http/Controllers/Api/InventoryController.php:25
 * @route '/api/inventory/reorder-suggestions'
 */
    const reorderSuggestionsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: reorderSuggestions.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\InventoryController::reorderSuggestions
 * @see app/Http/Controllers/Api/InventoryController.php:25
 * @route '/api/inventory/reorder-suggestions'
 */
        reorderSuggestionsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reorderSuggestions.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\InventoryController::reorderSuggestions
 * @see app/Http/Controllers/Api/InventoryController.php:25
 * @route '/api/inventory/reorder-suggestions'
 */
        reorderSuggestionsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: reorderSuggestions.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    reorderSuggestions.form = reorderSuggestionsForm
/**
* @see \App\Http\Controllers\Api\InventoryController::marginAnalysis
 * @see app/Http/Controllers/Api/InventoryController.php:33
 * @route '/api/inventory/margin-analysis'
 */
export const marginAnalysis = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: marginAnalysis.url(options),
    method: 'get',
})

marginAnalysis.definition = {
    methods: ["get","head"],
    url: '/api/inventory/margin-analysis',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\InventoryController::marginAnalysis
 * @see app/Http/Controllers/Api/InventoryController.php:33
 * @route '/api/inventory/margin-analysis'
 */
marginAnalysis.url = (options?: RouteQueryOptions) => {
    return marginAnalysis.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\InventoryController::marginAnalysis
 * @see app/Http/Controllers/Api/InventoryController.php:33
 * @route '/api/inventory/margin-analysis'
 */
marginAnalysis.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: marginAnalysis.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\InventoryController::marginAnalysis
 * @see app/Http/Controllers/Api/InventoryController.php:33
 * @route '/api/inventory/margin-analysis'
 */
marginAnalysis.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: marginAnalysis.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\InventoryController::marginAnalysis
 * @see app/Http/Controllers/Api/InventoryController.php:33
 * @route '/api/inventory/margin-analysis'
 */
    const marginAnalysisForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: marginAnalysis.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\InventoryController::marginAnalysis
 * @see app/Http/Controllers/Api/InventoryController.php:33
 * @route '/api/inventory/margin-analysis'
 */
        marginAnalysisForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: marginAnalysis.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\InventoryController::marginAnalysis
 * @see app/Http/Controllers/Api/InventoryController.php:33
 * @route '/api/inventory/margin-analysis'
 */
        marginAnalysisForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: marginAnalysis.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    marginAnalysis.form = marginAnalysisForm
/**
* @see \App\Http\Controllers\Api\InventoryController::seasonalDemand
 * @see app/Http/Controllers/Api/InventoryController.php:41
 * @route '/api/inventory/seasonal-demand'
 */
export const seasonalDemand = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seasonalDemand.url(options),
    method: 'get',
})

seasonalDemand.definition = {
    methods: ["get","head"],
    url: '/api/inventory/seasonal-demand',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\InventoryController::seasonalDemand
 * @see app/Http/Controllers/Api/InventoryController.php:41
 * @route '/api/inventory/seasonal-demand'
 */
seasonalDemand.url = (options?: RouteQueryOptions) => {
    return seasonalDemand.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\InventoryController::seasonalDemand
 * @see app/Http/Controllers/Api/InventoryController.php:41
 * @route '/api/inventory/seasonal-demand'
 */
seasonalDemand.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seasonalDemand.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\InventoryController::seasonalDemand
 * @see app/Http/Controllers/Api/InventoryController.php:41
 * @route '/api/inventory/seasonal-demand'
 */
seasonalDemand.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: seasonalDemand.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\InventoryController::seasonalDemand
 * @see app/Http/Controllers/Api/InventoryController.php:41
 * @route '/api/inventory/seasonal-demand'
 */
    const seasonalDemandForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: seasonalDemand.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\InventoryController::seasonalDemand
 * @see app/Http/Controllers/Api/InventoryController.php:41
 * @route '/api/inventory/seasonal-demand'
 */
        seasonalDemandForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seasonalDemand.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\InventoryController::seasonalDemand
 * @see app/Http/Controllers/Api/InventoryController.php:41
 * @route '/api/inventory/seasonal-demand'
 */
        seasonalDemandForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seasonalDemand.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    seasonalDemand.form = seasonalDemandForm
const inventory = {
    deadStock: Object.assign(deadStock, deadStock),
reorderSuggestions: Object.assign(reorderSuggestions, reorderSuggestions),
marginAnalysis: Object.assign(marginAnalysis, marginAnalysis),
seasonalDemand: Object.assign(seasonalDemand, seasonalDemand),
}

export default inventory