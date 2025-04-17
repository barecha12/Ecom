<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('review', function (Blueprint $table) {
            $table->increments('review_id'); // Auto-increment primary key
            $table->text('review_txt'); // Changed to text for the review text, instead of using int
            $table->integer('rate')->nullable(); // Rating, keeping as integer, can set a range of 1-5 or 1-10 depending on the rating system
            $table->unsignedInteger('product_id'); // Foreign key reference to products
            $table->unsignedInteger('user_id'); // Foreign key reference to users
            $table->timestamps(); // Adding created_at and updated_at timestamps
            
            // Foreign key constraints
            $table->foreign('product_id')->references('product_id')->on('product')->onDelete('cascade');
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('review');
    }
};
