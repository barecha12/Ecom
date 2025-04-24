<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $table = 'address';  // Fixed table name to 'address'
    protected $primaryKey = 'address_id';

    protected $fillable = [
        'full_name',
        'phone',
        'country',
        'state',
        'city',
        'post',
        'user_id',
    ];

    public $timestamps = true;

    // Address belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // Address can be linked to many orders (if reused)
    public function orders()
    {
        return $this->hasMany(Orders::class, 'address_id', 'address_id');
    }
}
