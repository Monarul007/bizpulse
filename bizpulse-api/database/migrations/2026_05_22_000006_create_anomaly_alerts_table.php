<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('anomaly_alerts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('type', 50);
            $table->string('severity', 20);
            $table->text('message');
            $table->json('meta')->nullable();
            $table->timestamp('dismissed_at')->nullable();
            $table->timestamps();

            $table->index(['tenant_id', 'created_at']);
            $table->index(['tenant_id', 'type']);
            $table->index(['tenant_id', 'severity']);
            $table->index(['tenant_id', 'dismissed_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('anomaly_alerts');
    }
};
