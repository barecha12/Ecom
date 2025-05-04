<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('sub_category', function (Blueprint $table) {
            $table->increments('sub_category_id'); // Auto-increment primary key
            $table->string('sub_category_name', 100);
            $table->unsignedInteger('category_id'); // Foreign key reference
            $table->unsignedInteger('admin_id'); // Foreign key reference
            $table->timestamps(); // Adding created_at and updated_at timestamps

            // Foreign key constraints
            $table->foreign('category_id')->references('category_id')->on('category')->onDelete('cascade');
            $table->foreign('admin_id')->references('admin_id')->on('admin')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sub_category');
    }
};
