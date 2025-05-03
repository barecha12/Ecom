<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\User;
use App\Models\Vendor;
use App\Models\PersonalInfo;
use App\Models\businessInfo;
use App\Models\bankInfo;
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








    public function newvendorrequest(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'vendor_id' => 'required|integer|exists:vendors,vendor_id',
        ]);
    
        // Retrieve the vendor_id from the request
        $vendorId = $request->input('vendor_id');
    
        // Fetch personal info
        $personalInfo = PersonalInfo::where('vendor_id', $vendorId)->first();
    
        // Fetch business info
        $businessInfo = businessInfo::where('vendor_id', $vendorId)->first();
    
        // Fetch bank info
        $bankInfo = bankInfo::where('vendor_id', $vendorId)->first();
    
        // Prepare the response data
        $responseData = [
            'Personal Info' => [
                'personal_name' => $personalInfo->personal_name ?? null,
                'personal_address' => $personalInfo->personal_address ?? null,
                'personal_city' => $personalInfo->personal_city ?? null,
                'personal_state' => $personalInfo->personal_state ?? null,
                'personal_phone' => $personalInfo->personal_phone ?? null,
                'personal_unique_id' => $personalInfo->personal_unique_id ?? null,
                'id_front_side' => $personalInfo->id_front_side ?? null,
                'id_back_side' => $personalInfo->id_back_side ?? null,
            ],
            'Business Information' => [
                'business_name' => $businessInfo->business_name ?? null,
                'business_address' => $businessInfo->business_address ?? null,
                'business_city' => $businessInfo->business_city ?? null,
                'business_state' => $businessInfo->business_state ?? null,
                'business_phone' => $businessInfo->business_phone ?? null,
                'blicense_number' => $businessInfo->blicense_number ?? null,
                'address_proof_img' => $businessInfo->address_proof_img ?? null,
                'other_proof_images' => [
                    $businessInfo->other_img_one ?? null,
                    $businessInfo->other_img_two ?? null,
                    $businessInfo->other_img_three ?? null,
                    $businessInfo->other_img_four ?? null,
                    $businessInfo->other_img_five ?? null,
                ],
            ],
            'Bank Info' => [
                'bank_name' => $bankInfo->bank_name ?? null,
                'account_name' => $bankInfo->account_name ?? null,
                'account_number' => $bankInfo->account_number ?? null,
            ],
        ];
    
        // Return the response as JSON
        return response()->json($responseData);
    }






    public function listnewvendors(Request $request)
    {
        // Fetch all vendors with their personal info
           $vendors = Vendor::with('personalInfo')
           ->where('status', 'Pending') // Filter by status
           ->get();
    
        // Prepare response data
        $responseData = [];
        foreach ($vendors as $vendor) {
            $responseData[] = [
                'email' => $vendor->email,
                'personal_name' => $vendor->personalInfo->personal_name ?? "N/A",
                'vendor_id' => $vendor->vendor_id,
            ];
        }
    
        // Return the response as JSON
        return response()->json(['success' => true, 'data' => $responseData]);
    }















}
