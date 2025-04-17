<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;
use App\Models\Vendor;

class PersonalInfo extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'personal_info';

    protected $fillable = [
        'personal_id',
        'personal_name',
        'personal_address',
        'personal_city',
        'personal_region',
        'personal_phone',
        'personal_unique_id',
        'id_front_side',
        'id_back_side',
        'time_stamp',
        'status',
        'vendor_id'
    ];

    public $timestamps = false;

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function vendor()
{
    return $this->belongsTo(Vendor::class, 'vendor_id', 'vendor_id');
}

}
