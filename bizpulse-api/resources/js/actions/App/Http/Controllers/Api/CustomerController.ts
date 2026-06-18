import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Api\CustomerController::overview
 * @see app/Http/Controllers/Api/CustomerController.php:16
 * @route '/api/customer/overview'
 */
export const overview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})

overview.definition = {
    methods: ["get","head"],
    url: '/api/customer/overview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CustomerController::overview
 * @see app/Http/Controllers/Api/CustomerController.php:16
 * @route '/api/customer/overview'
 */
overview.url = (options?: RouteQueryOptions) => {
    return overview.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CustomerController::overview
 * @see app/Http/Controllers/Api/CustomerController.php:16
 * @route '/api/customer/overview'
 */
overview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: overview.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CustomerController::overview
 * @see app/Http/Controllers/Api/CustomerController.php:16
 * @route '/api/customer/overview'
 */
overview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: overview.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CustomerController::overview
 * @see app/Http/Controllers/Api/CustomerController.php:16
 * @route '/api/customer/overview'
 */
    const overviewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: overview.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CustomerController::overview
 * @see app/Http/Controllers/Api/CustomerController.php:16
 * @route '/api/customer/overview'
 */
        overviewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: overview.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CustomerController::overview
 * @see app/Http/Controllers/Api/CustomerController.php:16
 * @route '/api/customer/overview'
 */
        overviewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: overview.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    overview.form = overviewForm
/**
* @see \App\Http\Controllers\Api\CustomerController::rfm
 * @see app/Http/Controllers/Api/CustomerController.php:22
 * @route '/api/customer/rfm'
 */
export const rfm = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rfm.url(options),
    method: 'get',
})

rfm.definition = {
    methods: ["get","head"],
    url: '/api/customer/rfm',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CustomerController::rfm
 * @see app/Http/Controllers/Api/CustomerController.php:22
 * @route '/api/customer/rfm'
 */
rfm.url = (options?: RouteQueryOptions) => {
    return rfm.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CustomerController::rfm
 * @see app/Http/Controllers/Api/CustomerController.php:22
 * @route '/api/customer/rfm'
 */
rfm.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: rfm.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CustomerController::rfm
 * @see app/Http/Controllers/Api/CustomerController.php:22
 * @route '/api/customer/rfm'
 */
rfm.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: rfm.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CustomerController::rfm
 * @see app/Http/Controllers/Api/CustomerController.php:22
 * @route '/api/customer/rfm'
 */
    const rfmForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: rfm.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CustomerController::rfm
 * @see app/Http/Controllers/Api/CustomerController.php:22
 * @route '/api/customer/rfm'
 */
        rfmForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rfm.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CustomerController::rfm
 * @see app/Http/Controllers/Api/CustomerController.php:22
 * @route '/api/customer/rfm'
 */
        rfmForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: rfm.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    rfm.form = rfmForm
/**
* @see \App\Http\Controllers\Api\CustomerController::churn
 * @see app/Http/Controllers/Api/CustomerController.php:28
 * @route '/api/customer/churn'
 */
export const churn = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: churn.url(options),
    method: 'get',
})

churn.definition = {
    methods: ["get","head"],
    url: '/api/customer/churn',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CustomerController::churn
 * @see app/Http/Controllers/Api/CustomerController.php:28
 * @route '/api/customer/churn'
 */
churn.url = (options?: RouteQueryOptions) => {
    return churn.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CustomerController::churn
 * @see app/Http/Controllers/Api/CustomerController.php:28
 * @route '/api/customer/churn'
 */
churn.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: churn.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CustomerController::churn
 * @see app/Http/Controllers/Api/CustomerController.php:28
 * @route '/api/customer/churn'
 */
churn.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: churn.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CustomerController::churn
 * @see app/Http/Controllers/Api/CustomerController.php:28
 * @route '/api/customer/churn'
 */
    const churnForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: churn.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CustomerController::churn
 * @see app/Http/Controllers/Api/CustomerController.php:28
 * @route '/api/customer/churn'
 */
        churnForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: churn.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CustomerController::churn
 * @see app/Http/Controllers/Api/CustomerController.php:28
 * @route '/api/customer/churn'
 */
        churnForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: churn.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    churn.form = churnForm
/**
* @see \App\Http\Controllers\Api\CustomerController::clv
 * @see app/Http/Controllers/Api/CustomerController.php:34
 * @route '/api/customer/clv'
 */
export const clv = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clv.url(options),
    method: 'get',
})

clv.definition = {
    methods: ["get","head"],
    url: '/api/customer/clv',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Api\CustomerController::clv
 * @see app/Http/Controllers/Api/CustomerController.php:34
 * @route '/api/customer/clv'
 */
clv.url = (options?: RouteQueryOptions) => {
    return clv.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Api\CustomerController::clv
 * @see app/Http/Controllers/Api/CustomerController.php:34
 * @route '/api/customer/clv'
 */
clv.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: clv.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Api\CustomerController::clv
 * @see app/Http/Controllers/Api/CustomerController.php:34
 * @route '/api/customer/clv'
 */
clv.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: clv.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Api\CustomerController::clv
 * @see app/Http/Controllers/Api/CustomerController.php:34
 * @route '/api/customer/clv'
 */
    const clvForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: clv.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Api\CustomerController::clv
 * @see app/Http/Controllers/Api/CustomerController.php:34
 * @route '/api/customer/clv'
 */
        clvForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: clv.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Api\CustomerController::clv
 * @see app/Http/Controllers/Api/CustomerController.php:34
 * @route '/api/customer/clv'
 */
        clvForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: clv.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    clv.form = clvForm
const CustomerController = { overview, rfm, churn, clv }

export default CustomerController