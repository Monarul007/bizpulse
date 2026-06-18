<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hourly_sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->tinyInteger('hour');
            $table->decimal('revenue', 14, 2)->default(0);
            $table->integer('orders_count')->default(0);
            $table->integer('items_count')->default(0);
            $table->timestamps();

            $table->unique(['tenant_id', 'date', 'hour']);
            $table->index(['tenant_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hourly_sales');
    }
};
