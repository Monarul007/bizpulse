<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTenantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'string', 'max:255'],
            'slug' => ['sometimes', 'string', 'max:100', 'alpha_dash', Rule::unique('tenants', 'slug')->ignore($this->route('tenant'))],
            'mysql_host' => ['sometimes', 'string', 'max:255'],
            'mysql_port' => ['sometimes', 'integer', 'min:1', 'max:65535'],
            'mysql_database' => ['sometimes', 'string', 'max:255'],
            'mysql_username' => ['sometimes', 'string', 'max:255'],
            'mysql_password' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'rate_limit_per_minute' => ['integer', 'min:1', 'max:10000'],
        ];
    }
}
