<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('client_id', 50)->index();
            $table->string('name');
            $table->string('email', 100)->nullable();
            $table->string('phone', 50)->nullable();
            $table->decimal('total_revenue', 14, 2)->default(0);
            $table->integer('total_orders')->default(0);
            $table->timestamp('last_order_at')->nullable();
            $table->string('segment', 50)->nullable();
            $table->decimal('churn_score', 5, 2)->nullable();
            $table->timestamps();

            $table->unique(['tenant_id', 'client_id']);
            $table->index(['tenant_id', 'email']);
            $table->index(['tenant_id', 'segment']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
