<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('admins')->updateOrInsert(
            ['admin_id' => 1],
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@gmail.com',
                'password' => Hash::make('Pass123@#$'),
                'phone' => 923746149,
                'admin_role_id' => 'SuperAdmin',
                'status' => 'Active',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );
    }
}
