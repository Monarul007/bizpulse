<?php

return [
    'tables' => [
        'orders' => [
            'label' => 'Orders',
            'description' => 'Sales orders / transactions',
            'required' => true,
            'columns' => [
                'id' => ['label' => 'Order ID', 'type' => 'integer', 'required' => true],
                'created_at' => ['label' => 'Order date', 'type' => 'datetime', 'required' => true],
                'total' => ['label' => 'Order total', 'type' => 'decimal', 'required' => true],
                'customer_id' => ['label' => 'Customer ID', 'type' => 'integer', 'required' => true],
                'status' => ['label' => 'Order status', 'type' => 'string', 'required' => false],
                'items_count' => ['label' => 'Items count', 'type' => 'integer', 'required' => false],
                'coupon_code' => ['label' => 'Coupon / promo code', 'type' => 'string', 'required' => false],
                'discount_amount' => ['label' => 'Discount amount', 'type' => 'decimal', 'required' => false],
                'channel' => ['label' => 'Sales channel', 'type' => 'string', 'required' => false],
            ],
        ],
        'order_items' => [
            'label' => 'Order Items',
            'description' => 'Individual line items within orders',
            'required' => false,
            'columns' => [
                'id' => ['label' => 'Item ID', 'type' => 'integer', 'required' => true],
                'order_id' => ['label' => 'Order ID', 'type' => 'integer', 'required' => true],
                'product_id' => ['label' => 'Product ID', 'type' => 'integer', 'required' => true],
                'quantity' => ['label' => 'Quantity', 'type' => 'integer', 'required' => true],
                'unit_price' => ['label' => 'Unit price', 'type' => 'decimal', 'required' => true],
            ],
        ],
        'products' => [
            'label' => 'Products',
            'description' => 'Product / SKU catalog',
            'required' => true,
            'columns' => [
                'id' => ['label' => 'Product ID', 'type' => 'integer', 'required' => true],
                'name' => ['label' => 'Product name', 'type' => 'string', 'required' => true],
                'sku' => ['label' => 'SKU code', 'type' => 'string', 'required' => false],
                'price' => ['label' => 'Selling price', 'type' => 'decimal', 'required' => true],
                'cost_price' => ['label' => 'Cost / purchase price', 'type' => 'decimal', 'required' => false],
                'stock_quantity' => ['label' => 'Current stock', 'type' => 'integer', 'required' => false],
                'category' => ['label' => 'Category / brand', 'type' => 'string', 'required' => false],
            ],
        ],
        'customers' => [
            'label' => 'Customers',
            'description' => 'Customer / buyer records',
            'required' => true,
            'columns' => [
                'id' => ['label' => 'Customer ID', 'type' => 'integer', 'required' => true],
                'name' => ['label' => 'Customer name', 'type' => 'string', 'required' => true],
                'email' => ['label' => 'Email address', 'type' => 'string', 'required' => false],
                'phone' => ['label' => 'Phone number', 'type' => 'string', 'required' => false],
                'created_at' => ['label' => 'Registration date', 'type' => 'datetime', 'required' => false],
            ],
        ],
        'users' => [
            'label' => 'Users / Staff',
            'description' => 'Employee / staff accounts',
            'required' => false,
            'columns' => [
                'id' => ['label' => 'User ID', 'type' => 'integer', 'required' => true],
                'name' => ['label' => 'Full name', 'type' => 'string', 'required' => true],
                'email' => ['label' => 'Email', 'type' => 'string', 'required' => false],
                'role' => ['label' => 'Role / department', 'type' => 'string', 'required' => false],
            ],
        ],
    ],

    'sync_intervals' => [
        'hourly_sales' => 5,
        'daily_sales' => 60,
        'products' => 15,
        'customers' => 15,
        'anomaly_detection' => 15,
        'rfm_scoring' => 1440,
    ],
];
