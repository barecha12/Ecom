<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'notifications';

    // Primary key
    protected $primaryKey = 'notification_id';

    // Primary key is incrementing
    public $incrementing = true;

    // Key type
    protected $keyType = 'int';

    // Mass assignable fields
    protected $fillable = [
        'notification_text',
        'user_id',
        'vendor_id',
        'admin_id',
    ];

    // Relationships
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class, 'vendor_id', 'vendor_id');
    }

    public function admin()
    {
        return $this->belongsTo(Admin::class, 'admin_id', 'admin_id');
    }
}
