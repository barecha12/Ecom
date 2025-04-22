<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
use App\Http\Controllers\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});




Route::post('register',[UserController::class,'register']);
Route::post('login',[UserController::class,'login']);
Route::post('vendor/register',[VendorController::class,'register']);
Route::post('/vendor/login',[VendorController::class,'login']);
Route::post('/vendor/addproduct',[VendorController::class,'addproduct']);
Route::post('/vendor/productlist/', [VendorController::class, 'productlist']);
Route::post('/vendor/orderlist/', [VendorController::class, 'orderlist']);
Route::post('/vendor/updatepassword/', [VendorController::class, 'updatepassword']);

Route::post('vendor/personalinfo',[VendorController::class,'personalinfo']);
Route::post('vendor/businessinfo',[VendorController::class,'businessinfo']);
Route::post('vendor/bankinfo',[VendorController::class,'bankinfo']);


Route::post('/search', [ProductController::class, 'search']);//done
Route::post('/categorylist', [ProductController::class, 'categorylist']);//done
Route::post('/shippeditems', [ProductController::class, 'shippeditems']);//done
Route::post('/orderditems', [ProductController::class, 'orderditems']);//done
Route::post('/refunditems', [ProductController::class, 'refunditems']);//done 
Route::post('/completeditems', [ProductController::class, 'completeditems']);//done
Route::post('/productdetails/{product_id}', [ProductController::class, 'productdetails']);//done
Route::post('/addtocart', [ProductController::class, 'addtocart']);//done
Route::post('/removecartitems', [ProductController::class, 'removecartitems']);//done
Route::post('/listcartitems', [ProductController::class, 'listcartitems']);//done

