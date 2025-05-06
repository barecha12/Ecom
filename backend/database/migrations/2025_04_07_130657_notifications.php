<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->increments('notification_id'); // Auto-increment primary key
            $table->string('notification_text', 255); // Increased length for notification text
            $table->unsignedInteger('user_id')->nullable(); // Foreign key reference to users, nullable
            $table->unsignedInteger('vendor_id')->nullable(); // Foreign key reference to vendors, nullable
            $table->unsignedInteger('admin_id'); // Foreign key reference to admins
            $table->timestamps(); // Adding created_at and updated_at timestamps

            // Foreign key constraints
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
            $table->foreign('vendor_id')->references('vendor_id')->on('vendors')->onDelete('cascade');
            // Corrected table name to 'admins'
            $table->foreign('admin_id')->references('admin_id')->on('admins')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('notification');
    }
};