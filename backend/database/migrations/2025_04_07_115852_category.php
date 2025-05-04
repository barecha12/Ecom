<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('category', function (Blueprint $table) {
            $table->increments('category_id'); // Auto-increment primary key
            $table->string('category_name', 100);
            $table->unsignedInteger('admin_id'); // Foreign key reference (unsigned)
            $table->timestamps(); // Adding created_at and updated_at timestamps

            // Foreign key constraint - Corrected table name to 'admins'
            $table->foreign('admin_id')->references('admin_id')->on('admins')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('category');
    }
};