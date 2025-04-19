<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('personal_info', function (Blueprint $table) {
            $table->increments('personal_id'); // Auto-increment primary key
            $table->string('personal_name', 100);
            $table->string('personal_address', 100);
            $table->string('personal_city', 100);
            $table->string('personal_state', 100);
            $table->string('personal_phone', 100); // Changed to string to handle different phone formats
            $table->unsignedInteger('personal_unique_id'); // Assuming unique_id is a number
            $table->string('id_front_side', 100);
            $table->string('id_back_side', 100);
            $table->enum('status', ['Active', 'Inactive', 'Pending'])->default('Pending'); // Enum for status
            $table->unsignedInteger('vendor_id'); // Foreign key reference to vendors
            $table->unsignedInteger('admin_id'); // Foreign key reference to admins
            $table->timestamps(); // Adding created_at and updated_at timestamps
            
            // Foreign key constraints
            $table->foreign('vendor_id')->references('vendor_id')->on('vendors')->onDelete('cascade');
            $table->foreign('admin_id')->references('admin_id')->on('admin')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('personal_info');
    }
};
