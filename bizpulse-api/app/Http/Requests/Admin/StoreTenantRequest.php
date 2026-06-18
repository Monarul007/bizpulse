<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StoreTenantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->isAdmin() ?? false;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:100', 'unique:tenants,slug', 'alpha_dash'],
            'mysql_host' => ['required', 'string', 'max:255'],
            'mysql_port' => ['required', 'integer', 'min:1', 'max:65535'],
            'mysql_database' => ['required', 'string', 'max:255'],
            'mysql_username' => ['required', 'string', 'max:255'],
            'mysql_password' => ['nullable', 'string', 'max:255'],
            'is_active' => ['boolean'],
            'rate_limit_per_minute' => ['integer', 'min:1', 'max:10000'],
        ];
    }
}
