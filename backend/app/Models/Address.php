<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $table = 'addresses'; // Set table name if pluralized

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

    // Define relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
