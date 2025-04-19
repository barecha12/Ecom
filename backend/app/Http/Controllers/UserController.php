<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    public function register(Request $req)
    {
        // Validate the incoming request to ensure the passwords match
        $validated = $req->validate([
            'name' =>     [
                'required',
                'string',
                'min:2', // Minimum length of 2 characters
                'max:255', // Maximum length of 255 characters
                'regex:/^[A-Za-z\s\-]+$/', // Allows only alphabetic characters (A-Z, a-z)
                          ],
            'email' => 'required|email|unique:users,email',
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
        // If validation fails, Laravel will automatically return a 422 response with validation errors
        if ($validated) {
            $user = new User;
            
            $user->name = $req->input('name');
            $user->email = $req->input('email');
            $user->password = Hash::make($req->input('password'));
            
            // Save the user to the database
            if ($user->save()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Account created successfully!',
                    'user' => $user
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
        'password' => 'required'
    ]);

    // Retrieve the user by email
    $user = User::where('email', $req->email)->first();
    // Check if the user exists and if the password matches
    if (!$user || !Hash::check($req->password, $user->password)) {
        // Return a meaningful error message
        return response()->json([
            'success' => false,
            'message' => 'Invalid email or password',
        ], 500); // HTTP 500 for server error
    }
    return response()->json([
        'success' => true,
        'message' => 'Logged in successfully!',
        'storeData' => [
            "user_id" => $user->user_id,
            "name" => $user->name,
            'email' => $user->email,
            'password' => $user->password,
            "user_role_id" => $user->user_role_id,
        ]
    ], 201); // HTTP 201 means "Created"
}



}
