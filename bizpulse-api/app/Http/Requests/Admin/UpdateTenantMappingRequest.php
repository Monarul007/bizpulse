<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTenantMappingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'sync_config' => ['required', 'array'],
            'sync_config.tables' => ['required', 'array'],
            'sync_config.tables.*.real_name' => ['required', 'string', 'max:255'],
            'sync_config.tables.*.columns' => ['required', 'array'],
            'sync_config.tables.*.columns.*' => ['string', 'max:255'],
        ];
    }
}
