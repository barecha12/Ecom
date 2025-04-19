<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('user_id');
            $table->string('name', 100);
            $table->string('email', 100);
            $table->string('password', 100);
            $table->string('user_role_id', 100)->default('User');
            $table->enum('status', ['Active','Suspended'])->default('Active');
            $table->timestamps(); // Adding created_at and updated_at timestamps
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
