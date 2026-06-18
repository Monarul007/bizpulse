<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('client_id', 50)->index();
            $table->string('customer_id', 50)->nullable();
            $table->timestamp('ordered_at');
            $table->decimal('total', 12, 2)->default(0);
            $table->string('status', 50)->nullable();
            $table->integer('items_count')->nullable();
            $table->string('coupon_code', 50)->nullable();
            $table->decimal('discount_amount', 12, 2)->nullable();
            $table->string('channel', 50)->nullable();
            $table->timestamps();

            $table->unique(['tenant_id', 'client_id']);
            $table->index(['tenant_id', 'ordered_at']);
            $table->index(['tenant_id', 'customer_id']);
            $table->index(['tenant_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
