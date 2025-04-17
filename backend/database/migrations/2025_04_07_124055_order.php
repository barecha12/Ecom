<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->increments('order_id'); // Auto-increment primary key
            $table->unsignedInteger('user_id'); // Foreign key reference to users
            $table->unsignedInteger('product_id'); // Foreign key reference to products
            $table->enum('order_status', ['pending', 'completed', 'cancelled', 'shipped','refunded'])->default('pending'); // Enum for order status
            $table->string('payment_method', 10); // Payment method used
            $table->float('total_paid'); // Total amount paid
            $table->integer('orderd_quantity'); // Quantity of the product ordered
            $table->timestamps(); // Adding created_at and updated_at timestamps

            // Foreign key constraints
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('product_id')->on('product')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
