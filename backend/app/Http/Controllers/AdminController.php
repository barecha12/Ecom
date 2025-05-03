<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Support\Facades\Validator;
class AdminController extends Controller
{
    //
    public function loginadmin(Request $request)
    {
        // Validate request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);
    
        // Find admin by email
        $admin = Admin::where('email', $request->email)->first();
    
        if ($admin && Hash::check($request->password, $admin->password)) {
            // Auth success
            return response()->json([
                'success' => true,
                'message' => 'Login successful.',
                'admin' => [
                'admin_id' => $admin->admin_id,
                'email' => $admin->email,
                'password' => $admin->password, // Be careful exposing this!
                'admin_role_id' => $admin->admin_role_id,
                 ], // Optional: You can return admin info
                // 'token' => $token // Optional: If using Laravel Sanctum or Passport
             ]);
        } else {
            // Auth failed
            return response()->json([
                'success' => false,
                'message' => 'Invalid email or password.',
            ], 401);
        }
    }



   // Fetch users
    public function listusers()
    {
        $users = User::all(); // Fetch all users
        return response()->json(['users' => $users]);
    }

    // Change user status
    public function changeuserstatus(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,user_id',
            'status' => 'required|in:Active,Suspended',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }
        // Find the user and update the status
        $user = User::find($request->user_id);
        $user->status = $request->status; // Update status
        $user->save();

        return response()->json(['success' => true, 'user' => $user]);
    }


    // Fetch vendor
    public function listvendors()
    {
        $users = Vendor::all(); // Fetch all users
        return response()->json(['users' => $users]);
    }

    // Change user status
    public function changevendorstatus(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'vendor_id' => 'required|exists:users,user_id',
            'status' => 'required|in:Pending,Verified,Rejected,Suspended',
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }
        // Find the user and update the status
        $user = Vendor::find($request->vendor_id);
        $user->status = $request->status; // Update status
        $user->save();

        return response()->json(['success' => true, 'user' => $user]);
    }

    // update admin password

    public function updatepassword(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'admin_id' => 'required|exists:admins,admin_id',
            'current_password' => 'required|string|min:6',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        if($request->password_confirmation !== $request->new_password){ 
            return response()->json([
                 'success' => false,
                 'message' => 'Password confirmation does not match.',
             ], 400); // HTTP 400 for bad request
         }
 


        // Find the admin and check the old password
        $admin = Admin::find($request->admin_id);
        if (Hash::check($request->current_password, $admin->password)) {
            // Update password
            $admin->password = Hash::make($request->new_password);
            $admin->save();

            return response()->json(['success' => true, 'message' => 'Password updated successfully.']);
        } else {
            return response()->json(['success' => false, 'message' => 'Old password is incorrect.'], 401);
        }
    }






}
