<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->increments('admin_id'); // Auto-increment primary key
            $table->string('name', 100);
            $table->string('email', 100);
            $table->string('password', 100);
            $table->bigInteger('phone'); // Using bigInteger for phone number
            $table->string('profile_img', 100)->nullable();
            $table->string('admin_role_id', 10)->default('Admin');
            $table->enum('status', ['Active','Suspended'])->default('Active');
            $table->timestamps(); // Adding created_at and updated_at timestamps
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin');
    }
};

