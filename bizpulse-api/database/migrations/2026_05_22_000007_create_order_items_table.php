<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('client_id', 50)->index();
            $table->string('product_client_id', 50)->index();
            $table->integer('quantity')->default(1);
            $table->decimal('unit_price', 12, 2)->default(0);
            $table->decimal('subtotal', 12, 2)->default(0);
            $table->timestamps();

            $table->unique(['tenant_id', 'client_id']);
            $table->index(['tenant_id', 'order_id']);
            $table->index(['tenant_id', 'product_client_id']);
            $table->index(['tenant_id', 'order_id', 'product_client_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
