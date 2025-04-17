<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('otps', function (Blueprint $table) {
            $table->increments('id'); // Auto-increment primary key
            $table->unsignedInteger('user_id'); // Foreign key to users table
            $table->string('otp'); // The actual OTP code
            $table->timestamp('expires_at')->nullable(); // When the OTP expires
            $table->timestamp('time_stamp', 6)->useCurrent()->useCurrentOnUpdate();
            // Foreign key constraint
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('otps');
    }
};
