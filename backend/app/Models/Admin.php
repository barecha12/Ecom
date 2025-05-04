<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Use this if Admin will log in
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'admins'; // Explicit table name

    protected $primaryKey = 'admin_id'; // Custom primary key

    public $timestamps = true; // Laravel handles created_at and updated_at

    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'profile_img',
        'admin_role_id',
        'status',
    ];

    protected $hidden = [
        'password',
    ];
}
