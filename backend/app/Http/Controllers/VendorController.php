<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Vendor;
use App\Models\PersonalInfo;
use App\Models\BusinessInfo;
use App\Models\BankInfo;

class VendorController extends Controller
{

    public function register(Request $req)
    {
        $validated = $req->validate([
            'email' => 'required|email|unique:vendors,email',
            'password' => [
                'required',
                'string',
                'min:8', // Minimum length of 8 characters
                'regex:/[A-Z]/', // At least one uppercase letter
                'regex:/[a-z]/', // At least one lowercase letter
                'regex:/[\W_]/', // At least one special character (non-word character)
                'confirmed', // Ensure password matches password_confirmation
                         ],
        ]);

        if ($validated) {
            $vendor = new Vendor;
            $vendor->email = $req->input('email');
             
            $vendor->password = Hash::make($req->input('password'));
            if ($vendor->save()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Account created successfully!',
                    'user' => $vendor
                ], 201); // HTTP 201 means "Created"
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create account. Please try again.'
                ], 500); // HTTP 500 for server error
            }
        }
    }
    
    function login(Request $req)
    {
    // Validate the inputs to ensure email and password are provided
    $req->validate([
        'email' => 'required|email',
        'password' => [
            'required',
            'string',
            'min:8', // Minimum length of 8 characters
            'regex:/[A-Z]/', // At least one uppercase letter
            'regex:/[a-z]/', // At least one lowercase letter
            'regex:/[\W_]/',  // Ensure password matches password_confirmation
                     ],
    ]);


    $user = Vendor::where('email', $req->email)->first();
    // Check if the user exists and if the password matches
    if (!$user || !Hash::check($req->password, $user->password)) {
        // Return a meaningful error message
        return response()->json([
            'success' => false,
            'message' => 'Invalid email or password',
        ], 500); // HTTP 500 for server error
    }else{
        return response()->json([
            'success' => true,
            'message' => 'Logged in successfully!',
            'storeData' => [
                'email' => $user->email,
                'password' => $user->password,
            ]
        ], 201); // HTTP 201 means "Created"
        }
    

    }




    public function personalinfo(Request $request)
    {
        // Validate incoming data using the inline validation method
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'region' => 'required|string|max:100',
            'mobile' => 'required|string|max:15',
            'idnumber' => 'required|string|max:20',
            'idPhotoFront' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'idPhotoBack' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            //'vendor_id' => 'required|exists:vendors,vendor_id',
        ]);
    
        // Handle file uploads
        $idPhotoFrontPath = null;
        $idPhotoBackPath = null;
    
        if ($request->hasFile('idPhotoFront')) {
            $idPhotoFrontPath = $request->file('idPhotoFront')->store('id_photos', 'public');
        }
    
        if ($request->hasFile('idPhotoBack')) {
            $idPhotoBackPath = $request->file('idPhotoBack')->store('id_photos', 'public');
        }
    
        // Save personal information to the database
        $personalInfo = new PersonalInfo([
            'personal_name' => $validated['name'],
            'personal_address' => $validated['address'],
            'personal_city' => $validated['city'],
            'personal_region' => $validated['region'],
            'personal_phone' => $validated['mobile'],
            'personal_unique_id' => $validated['idnumber'],
            'id_front_side' => $idPhotoFrontPath,
            'id_back_side' => $idPhotoBackPath,
            'status' => 'pending', 
            // 'vendor_id' => $validated['vendor_id'], 
            'vendor_id' => 2, 
        ]);
        
        // Save the personal info record
        $personalInfo->save();
    




// // Assuming you have a Vendor ID (e.g., 2)
// $vendor = Vendor::find(2); // Get the Vendor instance with ID 2

// // Check if the vendor exists
// if ($vendor) {
//     // Save PersonalInfo using the Vendor's relationship
//     $vendor->personalInfo()->create([
//         'personal_name'      => $validated['name'],
//         'personal_address'   => $validated['address'],
//         'personal_city'      => $validated['city'],
//         'personal_region'    => $validated['region'],
//         'personal_phone'     => $validated['mobile'],
//         'personal_unique_id' => $validated['idnumber'],
//         'id_front_side'      => $idPhotoFrontPath,
//         'id_back_side'       => $idPhotoBackPath,
//         'status'             => 'pending', 
//         // 'vendor_id' is automatically handled through the relationship
//     ]);
// } else {
//     // If the vendor doesn't exist, handle the error
//     return redirect()->back()->with('error', 'Vendor not found!');
// }













        // Return a success response with the saved data
        return response()->json([
            'success' => true,
            'message' => 'Personal Information saved successfully.',
            'storeData' => $personalInfo
        ]);
    }
    




    function businessinfo(){
        return "bussiness info";
    }
    function bankinfo(){
        return "bank info";
    }
}