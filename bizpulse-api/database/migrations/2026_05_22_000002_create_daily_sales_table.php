<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('daily_sales', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->decimal('revenue', 14, 2)->default(0);
            $table->integer('orders_count')->default(0);
            $table->integer('items_count')->default(0);
            $table->decimal('avg_order_value', 10, 2)->default(0);
            $table->decimal('total_discount', 12, 2)->default(0);
            $table->timestamps();

            $table->unique(['tenant_id', 'date']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('daily_sales');
    }
};
