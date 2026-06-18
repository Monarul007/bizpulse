<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SalesTickerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'revenue' => $this['revenue'],
            'orders_count' => $this['orders_count'],
            'vs_yesterday' => $this['vs_yesterday'],
            'vs_yesterday_label' => $this['vs_yesterday_label'],
            'currency' => $this['currency'],
        ];
    }
}
