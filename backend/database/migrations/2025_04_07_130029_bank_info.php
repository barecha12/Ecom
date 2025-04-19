<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bank_info', function (Blueprint $table) {
            $table->increments('bank_id'); // Auto-increment primary key
            $table->string('bank_name', 100);
            $table->string('account_name', 100);
            $table->string('account_number', 100); // Changed to string for handling account numbers that may include dashes
            $table->enum('status', ['Active', 'Inactive', 'Pending'])->default('Pending'); // Enum for status
            $table->unsignedInteger('admin_id'); // Foreign key reference to admins
            $table->unsignedInteger('vendor_id'); // Foreign key reference to vendors
            $table->timestamps(); // Adding created_at and updated_at timestamps
            
            // Foreign key constraints
            $table->foreign('admin_id')->references('admin_id')->on('admin')->onDelete('cascade');
            $table->foreign('vendor_id')->references('vendor_id')->on('vendors')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bank_info');
    }
};
