import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\SalesController::ticker
 * @see app/Http/Controllers/Api/SalesController.php:16
 * @route '/api/sales/ticker'
 */
export const ticker = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ticker.url(options),
    method: 'get',
})

ticker.definition = {
    methods: ["get","head"],
    url: '/api/sales/ticker',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SalesController::ticker
 * @see app/Http/Controllers/Api/SalesController.php:16
 * @route '/api/sales/ticker'
 */
ticker.url = (options?: RouteQueryOptions) => {
    return ticker.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SalesController::ticker
 * @see app/Http/Controllers/Api/SalesController.php:16
 * @route '/api/sales/ticker'
 */
ticker.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ticker.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SalesController::ticker
 * @see app/Http/Controllers/Api/SalesController.php:16
 * @route '/api/sales/ticker'
 */
ticker.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ticker.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SalesController::ticker
 * @see app/Http/Controllers/Api/SalesController.php:16
 * @route '/api/sales/ticker'
 */
    const tickerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ticker.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SalesController::ticker
 * @see app/Http/Controllers/Api/SalesController.php:16
 * @route '/api/sales/ticker'
 */
        tickerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ticker.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SalesController::ticker
 * @see app/Http/Controllers/Api/SalesController.php:16
 * @route '/api/sales/ticker'
 */
        tickerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ticker.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ticker.form = tickerForm
/**
* @see \App\Http\Controllers\Api\SalesController::comparisons
 * @see app/Http/Controllers/Api/SalesController.php:24
 * @route '/api/sales/comparisons'
 */
export const comparisons = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: comparisons.url(options),
    method: 'get',
})

comparisons.definition = {
    methods: ["get","head"],
    url: '/api/sales/comparisons',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SalesController::comparisons
 * @see app/Http/Controllers/Api/SalesController.php:24
 * @route '/api/sales/comparisons'
 */
comparisons.url = (options?: RouteQueryOptions) => {
    return comparisons.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SalesController::comparisons
 * @see app/Http/Controllers/Api/SalesController.php:24
 * @route '/api/sales/comparisons'
 */
comparisons.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: comparisons.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SalesController::comparisons
 * @see app/Http/Controllers/Api/SalesController.php:24
 * @route '/api/sales/comparisons'
 */
comparisons.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: comparisons.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SalesController::comparisons
 * @see app/Http/Controllers/Api/SalesController.php:24
 * @route '/api/sales/comparisons'
 */
    const comparisonsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: comparisons.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SalesController::comparisons
 * @see app/Http/Controllers/Api/SalesController.php:24
 * @route '/api/sales/comparisons'
 */
        comparisonsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: comparisons.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SalesController::comparisons
 * @see app/Http/Controllers/Api/SalesController.php:24
 * @route '/api/sales/comparisons'
 */
        comparisonsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: comparisons.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    comparisons.form = comparisonsForm
/**
* @see \App\Http\Controllers\Api\SalesController::heatmap
 * @see app/Http/Controllers/Api/SalesController.php:33
 * @route '/api/sales/heatmap'
 */
export const heatmap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: heatmap.url(options),
    method: 'get',
})

heatmap.definition = {
    methods: ["get","head"],
    url: '/api/sales/heatmap',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SalesController::heatmap
 * @see app/Http/Controllers/Api/SalesController.php:33
 * @route '/api/sales/heatmap'
 */
heatmap.url = (options?: RouteQueryOptions) => {
    return heatmap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SalesController::heatmap
 * @see app/Http/Controllers/Api/SalesController.php:33
 * @route '/api/sales/heatmap'
 */
heatmap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: heatmap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SalesController::heatmap
 * @see app/Http/Controllers/Api/SalesController.php:33
 * @route '/api/sales/heatmap'
 */
heatmap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: heatmap.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SalesController::heatmap
 * @see app/Http/Controllers/Api/SalesController.php:33
 * @route '/api/sales/heatmap'
 */
    const heatmapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: heatmap.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SalesController::heatmap
 * @see app/Http/Controllers/Api/SalesController.php:33
 * @route '/api/sales/heatmap'
 */
        heatmapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: heatmap.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SalesController::heatmap
 * @see app/Http/Controllers/Api/SalesController.php:33
 * @route '/api/sales/heatmap'
 */
        heatmapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: heatmap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    heatmap.form = heatmapForm
/**
* @see \App\Http\Controllers\Api\SalesController::forecast
 * @see app/Http/Controllers/Api/SalesController.php:42
 * @route '/api/sales/forecast'
 */
export const forecast = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forecast.url(options),
    method: 'get',
})

forecast.definition = {
    methods: ["get","head"],
    url: '/api/sales/forecast',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SalesController::forecast
 * @see app/Http/Controllers/Api/SalesController.php:42
 * @route '/api/sales/forecast'
 */
forecast.url = (options?: RouteQueryOptions) => {
    return forecast.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SalesController::forecast
 * @see app/Http/Controllers/Api/SalesController.php:42
 * @route '/api/sales/forecast'
 */
forecast.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: forecast.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SalesController::forecast
 * @see app/Http/Controllers/Api/SalesController.php:42
 * @route '/api/sales/forecast'
 */
forecast.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: forecast.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SalesController::forecast
 * @see app/Http/Controllers/Api/SalesController.php:42
 * @route '/api/sales/forecast'
 */
    const forecastForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: forecast.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SalesController::forecast
 * @see app/Http/Controllers/Api/SalesController.php:42
 * @route '/api/sales/forecast'
 */
        forecastForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forecast.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SalesController::forecast
 * @see app/Http/Controllers/Api/SalesController.php:42
 * @route '/api/sales/forecast'
 */
        forecastForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: forecast.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    forecast.form = forecastForm
/**
* @see \App\Http\Controllers\Api\SalesController::topProducts
 * @see app/Http/Controllers/Api/SalesController.php:50
 * @route '/api/sales/top-products'
 */
export const topProducts = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: topProducts.url(options),
    method: 'get',
})

topProducts.definition = {
    methods: ["get","head"],
    url: '/api/sales/top-products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SalesController::topProducts
 * @see app/Http/Controllers/Api/SalesController.php:50
 * @route '/api/sales/top-products'
 */
topProducts.url = (options?: RouteQueryOptions) => {
    return topProducts.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SalesController::topProducts
 * @see app/Http/Controllers/Api/SalesController.php:50
 * @route '/api/sales/top-products'
 */
topProducts.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: topProducts.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SalesController::topProducts
 * @see app/Http/Controllers/Api/SalesController.php:50
 * @route '/api/sales/top-products'
 */
topProducts.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: topProducts.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SalesController::topProducts
 * @see app/Http/Controllers/Api/SalesController.php:50
 * @route '/api/sales/top-products'
 */
    const topProductsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: topProducts.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SalesController::topProducts
 * @see app/Http/Controllers/Api/SalesController.php:50
 * @route '/api/sales/top-products'
 */
        topProductsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: topProducts.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SalesController::topProducts
 * @see app/Http/Controllers/Api/SalesController.php:50
 * @route '/api/sales/top-products'
 */
        topProductsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: topProducts.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    topProducts.form = topProductsForm
/**
* @see \App\Http\Controllers\Api\SalesController::promoRoi
 * @see app/Http/Controllers/Api/SalesController.php:59
 * @route '/api/sales/promo-roi'
 */
export const promoRoi = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: promoRoi.url(options),
    method: 'get',
})

promoRoi.definition = {
    methods: ["get","head"],
    url: '/api/sales/promo-roi',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SalesController::promoRoi
 * @see app/Http/Controllers/Api/SalesController.php:59
 * @route '/api/sales/promo-roi'
 */
promoRoi.url = (options?: RouteQueryOptions) => {
    return promoRoi.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SalesController::promoRoi
 * @see app/Http/Controllers/Api/SalesController.php:59
 * @route '/api/sales/promo-roi'
 */
promoRoi.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: promoRoi.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SalesController::promoRoi
 * @see app/Http/Controllers/Api/SalesController.php:59
 * @route '/api/sales/promo-roi'
 */
promoRoi.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: promoRoi.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SalesController::promoRoi
 * @see app/Http/Controllers/Api/SalesController.php:59
 * @route '/api/sales/promo-roi'
 */
    const promoRoiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: promoRoi.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SalesController::promoRoi
 * @see app/Http/Controllers/Api/SalesController.php:59
 * @route '/api/sales/promo-roi'
 */
        promoRoiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: promoRoi.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SalesController::promoRoi
 * @see app/Http/Controllers/Api/SalesController.php:59
 * @route '/api/sales/promo-roi'
 */
        promoRoiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: promoRoi.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    promoRoi.form = promoRoiForm
/**
* @see \App\Http\Controllers\Api\SalesController::channels
 * @see app/Http/Controllers/Api/SalesController.php:71
 * @route '/api/sales/channels'
 */
export const channels = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: channels.url(options),
    method: 'get',
})

channels.definition = {
    methods: ["get","head"],
    url: '/api/sales/channels',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SalesController::channels
 * @see app/Http/Controllers/Api/SalesController.php:71
 * @route '/api/sales/channels'
 */
channels.url = (options?: RouteQueryOptions) => {
    return channels.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SalesController::channels
 * @see app/Http/Controllers/Api/SalesController.php:71
 * @route '/api/sales/channels'
 */
channels.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: channels.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SalesController::channels
 * @see app/Http/Controllers/Api/SalesController.php:71
 * @route '/api/sales/channels'
 */
channels.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: channels.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SalesController::channels
 * @see app/Http/Controllers/Api/SalesController.php:71
 * @route '/api/sales/channels'
 */
    const channelsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: channels.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SalesController::channels
 * @see app/Http/Controllers/Api/SalesController.php:71
 * @route '/api/sales/channels'
 */
        channelsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: channels.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SalesController::channels
 * @see app/Http/Controllers/Api/SalesController.php:71
 * @route '/api/sales/channels'
 */
        channelsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: channels.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    channels.form = channelsForm
/**
* @see \App\Http\Controllers\Api\SalesController::refunds
 * @see app/Http/Controllers/Api/SalesController.php:81
 * @route '/api/sales/refunds'
 */
export const refunds = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: refunds.url(options),
    method: 'get',
})

refunds.definition = {
    methods: ["get","head"],
    url: '/api/sales/refunds',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\SalesController::refunds
 * @see app/Http/Controllers/Api/SalesController.php:81
 * @route '/api/sales/refunds'
 */
refunds.url = (options?: RouteQueryOptions) => {
    return refunds.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\SalesController::refunds
 * @see app/Http/Controllers/Api/SalesController.php:81
 * @route '/api/sales/refunds'
 */
refunds.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: refunds.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\SalesController::refunds
 * @see app/Http/Controllers/Api/SalesController.php:81
 * @route '/api/sales/refunds'
 */
refunds.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: refunds.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\SalesController::refunds
 * @see app/Http/Controllers/Api/SalesController.php:81
 * @route '/api/sales/refunds'
 */
    const refundsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: refunds.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\SalesController::refunds
 * @see app/Http/Controllers/Api/SalesController.php:81
 * @route '/api/sales/refunds'
 */
        refundsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: refunds.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\SalesController::refunds
 * @see app/Http/Controllers/Api/SalesController.php:81
 * @route '/api/sales/refunds'
 */
        refundsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: refunds.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    refunds.form = refundsForm
const SalesController = { ticker, comparisons, heatmap, forecast, topProducts, promoRoi, channels, refunds }

export default SalesController