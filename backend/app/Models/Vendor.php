<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\PersonalInfo;

class Vendor extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'vendors';

    protected $fillable = [
        'vendor_id',
        'email',
        'password',
        'status',
        'time_stamp',
        'vendor_role_id'
    ];

    public $timestamps = false;

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function personalInfo()
{
    return $this->hasOne(personalInfo::class, 'vendor_id', 'vendor_id');
}

}
