<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

use App\Models\Vendor;
use App\Models\PersonalInfo;
use App\Models\BusinessInfo;
use App\Models\BankInfo;
use App\Models\Product;
use App\Models\Cart;
use App\Models\Orders;

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
                'vendor_role_id' => $user->vendor_role_id,
                "status" => $user->status,          ]
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






 public function addproduct(Request $request)
{
    // ✅ Step 1: Validate request data
    $validated = $request->validate([
        'product_name'      => 'required|string|max:100',
        'total_product'     => 'required|integer',
        'product_price'     => 'required|numeric',
        'product_desc'      => 'required|string|max:100',
        'vendor_id'         => 'required|exists:vendors,vendor_id',
        'category_id'       => 'required|exists:category,category_id',
        'sub_category_id'   => 'required|exists:sub_category,sub_category_id',
        'status'            => 'in:Active,Inactive',
        'product_img1'      => 'required|image|mimes:jpeg,png,jpg,gif',
       // 'product_img1'      => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'product_img2'      => 'nullable|image|mimes:jpeg,png,jpg,gif',
        'product_img3'      => 'nullable|image|mimes:jpeg,png,jpg,gif',
        'product_img4'      => 'nullable|image|mimes:jpeg,png,jpg,gif',
        'product_img5'      => 'nullable|image|mimes:jpeg,png,jpg,gif',
    ]);

    // ✅ Step 2: Handle image uploads
    $imageFields = ['product_img1', 'product_img2', 'product_img3', 'product_img4', 'product_img5'];

    foreach ($imageFields as $field) {
        if ($request->hasFile($field)) {
            $imageName = Str::uuid() . '.' . $request->file($field)->getClientOriginalExtension();
            $path = 'products/' . $imageName;
            $request->file($field)->storeAs('public/products', $imageName);
            $validated[$field] = $path;
        } else {
            $validated[$field] = null;
        }
    }
    // ✅ Step 3: Create product
    $product = Product::create([
        'product_name'      => $validated['product_name'],
        'total_product'     => $validated['total_product'],
        'product_price'     => $validated['product_price'],
        'product_desc'      => $validated['product_desc'],
        'vendor_id'         => $validated['vendor_id'],
        'category_id'       => $validated['category_id'],
        'sub_category_id'   => $validated['sub_category_id'],
        'product_status'            => $validated['product_status'] ?? 'Active',
        'product_img1'      => $validated['product_img1'],
        'product_img2'      => $validated['product_img2'],
        'product_img3'      => $validated['product_img3'],
        'product_img4'      => $validated['product_img4'],
        'product_img5'      => $validated['product_img5'],
    ]);

    return response()->json([
        'status' => 'success',
        'message' => 'Product added successfully!',
        'data' => $product
    ], 201);
}





public function productlist(Request $request)
{
    // Get the vendor_id from the authenticated user
 //   $vendor_id = auth()->user()->vendor_id;
    $vendor_id = $request->input('vendor_id');
    // Fetch products for the authenticated vendor
    $products = Product::where('vendor_id', $vendor_id)
        ->select(
            'product_id',
            'product_name',
            'total_product',
            'product_price',
            'product_img1',
            'product_img2',
            'product_img3',
            'product_img4',
            'product_img5',
            'product_desc',
            'product_status',
            'category_id',
            'sub_category_id',
            'vendor_id'
        )
        ->get();

    return response()->json($products);
}




public function orderlist(Request $request)
{
    // Get the vendor_id from the authenticated user
    $order_id = $request->input('order_id');
    $order_status = $request->input('order_status');

    
    $orders = Orders::where('order_id', $order_id)
        ->select(
            'order_id',
        )
        ->get();

    return response()->json($orders);
}







}