<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlertResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'type' => $this->type,
            'severity' => $this->severity,
            'message' => $this->message,
            'meta' => $this->meta,
            'created_at' => $this->created_at,
            'is_dismissed' => $this->dismissed_at !== null,
        ];
    }
}
