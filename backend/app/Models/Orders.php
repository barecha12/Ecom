<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'orders';

    // Define the primary key column if it's not 'id'
    protected $primaryKey = 'order_id';

    // If the primary key is not auto-incrementing, you can set this to false
    public $incrementing = true;

    // Define which attributes are mass assignable
    protected $fillable = [
        'user_id',
        'product_id',
        'order_status',
        'payment_method',
        'total_paid',
        'orderd_quantity'
    ];

    // Define the data types for attributes
    protected $casts = [
        'total_paid' => 'float',
        'status' => 'string',
    ];

    // Relationship to the User model (One order belongs to one user)
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // Relationship to the Product model (One order belongs to one product)
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    // You can also add custom methods for order-specific logic here
}
